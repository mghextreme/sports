import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMatch, IModality } from 'src/app/models';
import { EventsService, MatchesService } from 'src/app/services';

@Component({
  templateUrl: './modality.page.html',
  styleUrls: ['./modality.page.scss']
})
export class ModalityPageComponent {

  modality: IModality;
  liveMatches: IMatch[];

  constructor(
    private readonly eventsService: EventsService,
    private readonly matchesService: MatchesService,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.modality = this.eventsService.getDefaultModality();
    this.liveMatches = [];

    const modalityId = this.activeRoute.snapshot.params['id'];
    this.eventsService.getModality(modalityId).subscribe(modality => {
      this.modality = modality;
    });
    this.matchesService.getLiveFromModality(modalityId).subscribe(matches => {
      this.liveMatches = matches;
    });
  }

}
