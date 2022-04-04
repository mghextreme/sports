import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IModality } from 'src/app/models';
import { EventsService } from 'src/app/services';

@Component({
  templateUrl: './modality.page.html',
  styleUrls: ['./modality.page.scss']
})
export class ModalityPageComponent {

  modality: IModality;

  constructor(
    private readonly eventsService: EventsService,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.modality = this.eventsService.getDefaultModality();

    const modalityId = this.activeRoute.snapshot.params['id'];
    this.eventsService.getModality(modalityId).subscribe(modality => {
      this.modality = modality;
    });
  }

}
