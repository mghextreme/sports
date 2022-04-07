import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IDetailedMatch, IMatchFeedItem, ITeam, ITeamParticipant } from 'src/app/models';
import { MatchesService, TeamsService } from 'src/app/services';

@Component({
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss']
})
export class MatchPageComponent {

  match: IDetailedMatch;
  feed: IMatchFeedItem[];
  teamsById: { [id: number]: ITeam };
  participantsByTeam: { [id: number]: ITeamParticipant[] };
  participantsById: { [id: number]: ITeamParticipant };

  constructor(
    readonly translate: TranslateService,
    private readonly matchesService: MatchesService,
    private readonly teamsService: TeamsService,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.match = matchesService.getDefaultDetailed();
    this.feed = [];
    this.teamsById = {};
    this.participantsByTeam = {};
    this.participantsById = {};

    const matchId = this.activeRoute.snapshot.params['id'];
    this.matchesService.get(matchId).subscribe(match => {
      this.match = match;
      this.setTeams(match.teams);
    });
    this.matchesService.getFeed(matchId).subscribe(feed => {
      this.feed = feed;
    });
  }

  public subscore(score?: number): number {
    if (!score) return 0;

    return Math.floor(score / 1000);
  }

  public formatFeedTime(matchTime: number): string {
    return Math.floor(matchTime / 60) + "'<small>" + (matchTime % 60).toFixed(0).padStart(2, '0') + "\"</small>";
  }

  public getTeamById(teamId: number): ITeam {
    return this.teamsById[teamId] ?? this.teamsService.getDefault();
  }

  public getTeamParticipantById(participantId: number): ITeamParticipant {
    return this.participantsById[participantId] ?? this.teamsService.getDefaultParticipant();
  }

  private setTeams(teams: ITeam[]) {
    this.teamsById = {};
    teams.forEach(team => {
      this.teamsById[team.id] = team;
      this.loadTeamParticipants(team.id);
    });
  }

  private loadTeamParticipants(teamId: number) {
    this.teamsService.getParticipants(teamId).subscribe(participants => {
      this.participantsByTeam[teamId] = participants;
      participants.forEach(p => this.participantsById[p.id] = p)
    });
  }

  get matchName(): string {
    return this.match?.name ?? (this.match?.stage?.name ?? '#' + this.match.id);
  }

  get isLive(): boolean {
    return this.match.started && !this.match.finished;
  }

  get showSubscore(): boolean {
    switch (this.match?.modality?.sport?.code) {
      case 'volleyball':
        return true;
      default:
        return false;
    }
  }

}
