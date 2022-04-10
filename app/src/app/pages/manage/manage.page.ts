import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent, IPerson } from 'src/app/models';
import { AuthService, EventsService, PeopleService } from 'src/app/services';

@Component({
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss']
})
export class ManagePageComponent {

  events: IEvent[];
  people: IPerson[];

  constructor(
    readonly authService: AuthService,
    private readonly eventsService: EventsService,
    private readonly peopleService: PeopleService,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.events = [];
    this.people = [];

    this.eventsService.getAll().subscribe(events => {
      this.events = events;
    });
    this.peopleService.getAll().subscribe(people => {
      this.people = people;
    });
  }

}
