import { Injectable } from '@nestjs/common';
import { ModalityCreateDto, ModalityUpdateDto, QueryResultDto } from 'src/models';
import { Match, Modality, Stage, Team } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ModalitiesService {

  constructor(
    @InjectRepository(Modality) private readonly repository: Repository<Modality>,
    @InjectRepository(Stage) private readonly stagesRepository: Repository<Stage>,
    @InjectRepository(Team) private readonly teamsRepository: Repository<Team>,
    @InjectRepository(Match) private readonly matchesRepository: Repository<Match>) { }

  async findOne(id: number): Promise<Modality> {
    return this.repository.findOne(id, {
      relations: ['sport', 'event']
    });
  }

  async create(createDto: ModalityCreateDto): Promise<Modality> {
    const creation = this.repository.create(createDto);
    return this.repository.save(creation);
  }

  async update(id: number, updateDto: ModalityUpdateDto): Promise<Modality> {
    const record = await this.repository.findOne(id);
    this.repository.merge(record, updateDto);
    return this.repository.save(record);
  }

  async remove(id: number): Promise<QueryResultDto> {
    return this.repository.delete(id).then(r => ({ success: r.affected > 0 } as QueryResultDto));
  }

  async findOneTeams(id: number): Promise<Team[]> {
    return this.teamsRepository.find({
      where: { modalityId: id }
    });
  }

  async findOneStages(id: number): Promise<Stage[]> {
    return this.stagesRepository.find({
      where: { modalityId: id }
    });
  }

  async findOneMatches(id: number): Promise<Match[]> {
    return this.matchesRepository.find({
      where: {
        stage: {
          modality: {
            id: id
          }
        }
      },
      relations: ['stage', 'teams', 'teams.team']
    });
  }

}
