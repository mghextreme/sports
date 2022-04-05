import { Component, Input } from '@angular/core';
import { IMatch, ITeam } from 'src/app/models';
import { MatchesService, TeamsService } from 'src/app/services';

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent {

  @Input('match') match: IMatch;

  constructor(
    readonly matchesService: MatchesService,
    readonly teamsService: TeamsService
  ) {
    this.match = matchesService.getDefault();
  }

  get teams(): ITeam[] {
    return this.match.teams && this.match.teams.length > 0
      ? this.match.teams
      : [ this.teamsService.getDefault(), this.teamsService.getDefault() ];
  }

  get name(): string {
    return this.match.name
      ? this.match.name
      : '#' + this.match.id;
  }

  get isLive(): boolean {
    return this.match.started && !this.match.finished;
  }

}
