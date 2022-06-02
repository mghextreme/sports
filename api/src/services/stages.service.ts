import { BadRequestException, Injectable } from '@nestjs/common';
import { QueryResultDto, RoundRobinStartDto, StageCreateDto, StageStartDto, StageUpdateDto } from 'src/models';
import { Match, MatchTeam, Stage, StageMode, Team } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class StagesService {

  constructor(
    @InjectRepository(Stage) private readonly repository: Repository<Stage>,
    @InjectRepository(Match) private readonly matchesRepository: Repository<Match>,
    @InjectRepository(Team) private readonly teamsRepository: Repository<Team>,
    @InjectRepository(MatchTeam) private readonly matchTeamsRepository: Repository<MatchTeam>) { }

  async findOne(id: number): Promise<Stage> {
    return this.repository.findOne(id, {
      relations: ['modality']
    });
  }

  async create(createDto: StageCreateDto): Promise<Stage> {
    const creation = this.repository.create(createDto);
    return this.repository.save(creation);
  }

  async update(id: number, updateDto: StageUpdateDto): Promise<Stage> {
    const record = await this.repository.findOne(id);
    this.repository.merge(record, updateDto);
    return this.repository.save(record);
  }

  async remove(id: number): Promise<QueryResultDto> {
    return this.repository.delete(id).then(r => ({ success: r.affected > 0 } as QueryResultDto));
  }

  async start(id: number, startDto: StageStartDto): Promise<QueryResultDto> {
    const record = await this.repository.findOne(id);

    if (record.started) {
      throw new BadRequestException(`Stage has already been started.`);
    }

    await this.addTeams(record, startDto.teamIds);

    switch (record.mode) {
      case StageMode.RoundRobin:
        return this.startRoundRobin(record, startDto.teamIds, startDto.roundRobin);
      default:
        throw new BadRequestException(`Unsupported stage mode '${record.mode}'.`);
    }
  }

  private async addTeams(record: Stage, teamIds: number[]): Promise<Team[]> {
    if (teamIds.length <= 0) {
      throw new BadRequestException(`No teams selected.`);
    }

    if (teamIds.length > record.maxTeams) {
      throw new BadRequestException(`Number of teams is greater than maximum '${record.maxTeams}' allowed.`);
    }

    const teams = await this.teamsRepository.find({
      where: {
        id: In(teamIds),
        modalityId: record.modalityId
      }
    });

    if (teams.length < teamIds.length) {
      throw new BadRequestException(`Not all team IDs were found in this modality.`);
    }

    record.teams = teams;
    this.repository.save(record);

    return teams;
  }

  private async startRoundRobin(record: Stage, teamIds: number[], startDto: RoundRobinStartDto): Promise<QueryResultDto> {
    let matches: Match[] = [];
    if (startDto.homeAndAwayGames) {
      matches.push(...await this.generateRoundRobinMatches(record, teamIds, true))
    }
    matches.push(...await this.generateRoundRobinMatches(record, teamIds));

    record.started = true;
    record.matches = matches;
    return this.repository.save(record).then(r => ({ success: r.started } as QueryResultDto));
  }

  private async generateRoundRobinMatches(record: Stage, teamIds: number[], awayGame: boolean = false): Promise<Match[]> {
    if (teamIds.length % 2 !== 0) {
      // Ensures even number of teams
      teamIds.splice(1, 0, -1);
    }

    let matches: Match[] = [];
    let round = 0;
    do {
      for (let i = 0; i < teamIds.length / 2; i++) {
        let team1 = teamIds[i];
        let team2 = teamIds[teamIds.length - i - 1];
        if (team1 !== -1 && team2 !== -1) {
          matches.push(await this.createMatch(record.id, [ team1, team2 ], awayGame));
        }
      }

      teamIds = this.rotateTeams(teamIds);
      round++;
    }
    while (round < teamIds.length - 1)

    return matches;
  }

  private rotateTeams(teamIds: number[]): number[] {
    let tempTeams = teamIds.splice(teamIds.length - 1, 1);
    teamIds.splice(1, 0, ...tempTeams);
    return teamIds;
  }

  private async createMatch(stageId: number, teamIds: number[], awayGame: boolean = false): Promise<Match> {
    let match = this.matchesRepository.create({ stageId: stageId, teams: [] });
    match = await this.matchesRepository.save(match);

    match.teams = []; 

    if (awayGame) {
      teamIds = teamIds.reverse();
    }

    for (let teamId of teamIds) {
      let matchTeam = this.matchTeamsRepository.create({
        matchId: match.id,
        teamId: teamId
      });
      match.teams.push(await this.matchTeamsRepository.save(matchTeam));
    }

    return this.matchesRepository.save(match);
  }

}
