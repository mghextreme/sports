import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent, IModality } from 'src/app/models';
import { EventsService } from 'src/app/services';

@Component({
  templateUrl: './event.modalities.page.html',
  styleUrls: ['./event.modalities.page.scss']
})
export class EventModalitiesPageComponent {

  event: IEvent;
  modalities: IModality[];

  constructor(
    private readonly eventsService: EventsService,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.event = this.eventsService.getDefault();
    this.modalities = [];

    const eventId = this.activeRoute.snapshot.params['id'];
    this.eventsService.get(eventId).subscribe(event => {
      this.event = event;
    });
    this.eventsService.getModalities(eventId).subscribe(modalities => {
      this.modalities = modalities;
    });
  }

}
