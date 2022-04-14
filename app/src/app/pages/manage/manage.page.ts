import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IEvent, IPerson } from 'src/app/models';
import { AuthService, EventsService, PeopleService } from 'src/app/services';

@Component({
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss']
})
export class ManagePageComponent {

  isLoadingEvents = true;
  isLoadingPeople = true;

  events: IEvent[];
  people: IPerson[];

  @ViewChild('eventsTable') eventsTable?: Table;
  @ViewChild('peopleTable') peopleTable?: Table;

  constructor(
    readonly authService: AuthService,
    private readonly eventsService: EventsService,
    private readonly peopleService: PeopleService,
    private readonly confirmationService: ConfirmationService,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.events = [];
    this.people = [];

    this.eventsService.getAll().subscribe(events => {
      this.events = events;
      this.isLoadingEvents = false;
    });
    this.peopleService.getAll().subscribe(people => {
      this.people = people;
      this.isLoadingPeople = false;
    });
  }

  filterEventsTable(event: Event) {
    const htmlTarget = event.target as HTMLTextAreaElement;
    this.eventsTable?.filterGlobal(htmlTarget.value, 'contains');
  }

  openEvent(event: IEvent) {
    this.router.navigate(['/event', event.id, 'manage']);
  }

  removeEvent(event: IEvent) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to remove this event?',
        header: 'Remove Name of Event',
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-secondary',
        accept: () => {
          // TODO
          console.error('removed');
        }
    });
  }

  filterPeopleTable(event: Event) {
    const htmlTarget = event.target as HTMLTextAreaElement;
    this.peopleTable?.filterGlobal(htmlTarget.value, 'contains');
  }

  openPerson(person: IPerson) {
    this.router.navigate(['/person', person.id, 'manage']);
  }

  removePerson(person: IPerson) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to remove this person?',
        header: 'Remove Name of Person',
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-secondary',
        accept: () => {
          // TODO
          console.error('removed');
        }
    });
  }

}
