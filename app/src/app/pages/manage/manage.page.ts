import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IEvent, IPerson } from 'src/app/models';
import { AuthService, EventsService, PeopleService } from 'src/app/services';

@Component({
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
  providers: [MessageService]
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
    private readonly messageService: MessageService,
    private readonly translate: TranslateService,
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
        message: this.translate.instant('manage.messages.are-you-sure-remove-x', { x: event.name }),
        header: this.translate.instant('manage.messages.remove-x', { x: event.name }),
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-secondary',
        accept: () => {
          this.eventsService.deleteById(event.id).subscribe(() => {
            this.events = this.events.filter(e => e.id !== event.id);
            this.messageService.add({
              severity: 'success',
              summary: this.translate.instant('manage.messages.success'),
              detail: this.translate.instant('manage.messages.item-removed')
            });
          });
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
      message: this.translate.instant('manage.messages.are-you-sure-remove-x', { x: person.name }),
      header: this.translate.instant('manage.messages.remove-x', { x: person.name }),
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-secondary',
        accept: () => {
          this.eventsService.deleteById(person.id).subscribe(() => {
            this.events = this.events.filter(p => p.id !== person.id);
            this.messageService.add({
              severity: 'success',
              summary: this.translate.instant('manage.messages.success'),
              detail: this.translate.instant('manage.messages.item-removed')
            });
          });
        }
    });
  }

}
