import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IDetailedMatch } from 'src/app/models';
import { MatchesService } from 'src/app/services';

@Component({
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss']
})
export class MatchPageComponent {

  match: IDetailedMatch;

  constructor(
    readonly translate: TranslateService,
    private readonly matchesService: MatchesService,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.match = matchesService.getDefaultDetailed();

    const matchId = this.activeRoute.snapshot.params['id'];
    this.matchesService.get(matchId).subscribe(match => {
      this.match = match;
    });
  }

  public subscore(score?: number): number {
    if (!score) return 0;

    return Math.floor(score / 1000);
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
