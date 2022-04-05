import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMatch } from 'src/app/models';
import { MatchesService } from 'src/app/services';


@Component({
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss']
})
export class MatchPageComponent {

  match: IMatch;

  constructor(
    private readonly matchesService: MatchesService,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.match = matchesService.getDefault();

    const matchId = this.activeRoute.snapshot.params['id'];
    this.matchesService.get(matchId).subscribe(match => {
      this.match = match;
    });
  }

}
