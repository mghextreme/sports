import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ISingleBracketMatch, ISingleBracketRound } from 'src/app/models';
import * as _ from 'lodash';

@Component({
  selector: 'single-bracket',
  templateUrl: './single-bracket.component.html',
  styleUrls: ['./single-bracket.component.scss']
})
export class SingleBracketComponent {

  rounds: ISingleBracketRound[] = [];

  private _matches: ISingleBracketMatch[] = [];
  @Input('matches') public set matches(matches: ISingleBracketMatch[]) {
    this._matches = matches;
    this.setupMatches();
  }

  constructor(
    readonly translate: TranslateService
  ) {

  }

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

