import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from 'src/app/models';
import { AuthService, EventsService, MatchesService } from 'src/app/services';

@Component({
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss']
})
export class EventPageComponent {

  event: IEvent;

  constructor(
    readonly authService: AuthService,
    private readonly eventsService: EventsService,
    private readonly matchesService: MatchesService,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.event = this.eventsService.getDefault();

    const eventId = this.activeRoute.snapshot.params['id'];
    this.eventsService.get(eventId).subscribe(event => {
      this.event = event;
    });
  }

}
