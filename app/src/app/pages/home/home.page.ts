import { Component } from '@angular/core';
import { IEvent } from 'src/app/models';
import { AuthService, EventsService } from 'src/app/services';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePageComponent {

  events: IEvent[];

  constructor(
    readonly authService: AuthService,
    private readonly eventsService: EventsService
  ) {
    this.events = [];

    this.eventsService.getAll().subscribe(events => {
      this.events = events;
    });
  }

}
