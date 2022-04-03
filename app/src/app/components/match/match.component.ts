import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IMatch } from 'src/app/models';
import { MatchesService } from 'src/app/services';

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent {

  @Input('match') match: IMatch;

  constructor(
    readonly translate: TranslateService,
    private readonly matchesService: MatchesService
  ) {
    this.match = matchesService.getDefault();
  }

  get isLive(): boolean {
    return this.match.started && !this.match.finished;
  }

}

