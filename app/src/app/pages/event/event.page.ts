import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent, IMatch } from 'src/app/models';
import { EventsService, MatchesService } from 'src/app/services';

@Component({
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss']
})
export class EventPageComponent {

  event: IEvent;
  liveMatches: IMatch[];

  constructor(
    private readonly eventsService: EventsService,
    private readonly matchesService: MatchesService,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.event = this.eventsService.getDefault();
    this.liveMatches = [];

    const eventId = this.activeRoute.snapshot.params['id'];
    this.eventsService.get(eventId).subscribe(event => {
      this.event = event;
    });
    this.matchesService.getLiveFromEvent(eventId).subscribe(matches => {
      this.liveMatches = matches;
    });
  }

}
