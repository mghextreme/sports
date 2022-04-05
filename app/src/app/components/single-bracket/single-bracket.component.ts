import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ISingleBracketMatch, ISingleBracketRound } from 'src/app/models';
import * as _ from 'lodash';
import { MatchesService } from 'src/app/services';
import { MatchesUtils } from 'src/app/utils';

@Component({
  selector: 'single-bracket',
  templateUrl: './single-bracket.component.html',
  styleUrls: ['./single-bracket.component.scss']
})
export class SingleBracketComponent {

  rounds: ISingleBracketRound[] = [];

  private _matches: ISingleBracketMatch[] = [];
  public set matches(matches: ISingleBracketMatch[]) {
    this._matches = matches;
    this.setupMatches();
  }

  @Input('stageId') public set stageId(stageId: number) {
    this.matchesService.getFromStage(stageId).subscribe(matches => {
      this.matches = MatchesUtils.toSingleBracketMatches(matches);
    });
  }

  constructor(
    readonly translate: TranslateService,
    private readonly matchesService: MatchesService
  ) { }

  private setupMatches(): void {
    this.rounds = [];
    this._matches.forEach(m => {
      this.addMatchToRound(m, m.round);
    });
  }

  private addMatchToRound(match: ISingleBracketMatch, round: number) {
    while (this.rounds.length < round) {
      this.rounds.push({
        matches: [],
        round: this.rounds.length + 1
      });
    }

    this.rounds[round - 1].matches.push(match);
  }

}

