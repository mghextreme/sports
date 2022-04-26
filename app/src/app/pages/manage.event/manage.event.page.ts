import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IEvent, IGroup, IModality } from 'src/app/models';
import { AuthService, EventsService } from 'src/app/services';

@Component({
  templateUrl: './manage.event.page.html',
  styleUrls: ['./manage.event.page.scss'],
  providers: [MessageService]
})
export class ManageEventPageComponent {

  isNew = false;

  isLoadingModalities = true;
  isLoadingGroups = true;

  event: IEvent;
  modalities: IModality[];
  groups: IGroup[];

  @ViewChild('modalitiesTable') modalitiesTable?: Table;
  @ViewChild('groupsTable') groupsTable?: Table;

  @ViewChild('eventForm', { static: false }) form?: NgForm;
  validated = false;

  constructor(
    readonly authService: AuthService,
    private readonly eventsService: EventsService,
    private readonly translate: TranslateService,
    private readonly activeRoute: ActivatedRoute,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.event = this.eventsService.getDefault();
    this.modalities = [];
    this.groups = [];

    const newEvent = this.activeRoute.snapshot.data['new'];
    if (newEvent === true) {
      this.isNew = true;
    } else {
      const eventId = this.activeRoute.snapshot.params['id'];
      this.eventsService.get(eventId).subscribe(event => {
        this.event = event;
      });
      this.eventsService.getModalities(eventId).subscribe(modalities => {
        this.modalities = modalities;
        this.isLoadingModalities = false;
      });
      this.eventsService.getGroups(eventId).subscribe(groups => {
        this.groups = groups;
        this.isLoadingGroups = false;
      });
    }
  }

  handleSubmit() {
    if (this.form?.valid) {
      if (this.isNew) {
        this.eventsService.add(this.event).subscribe(event => {
          this.router.navigate(['/event', event.id, 'manage']);
        });
      } else if (this.form?.dirty) {
        this.eventsService.update(this.event.id, this.event).subscribe(event => {
          this.event = event;
          this.form?.form.markAsPristine();
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('manage.messages.success'),
            detail: this.translate.instant('manage.messages.item-updated')
          });
        });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: this.translate.instant('manage.messages.attention-required'),
          detail: this.translate.instant('manage.messages.no-updates')
        });
      }
    }

    this.validated = true;
  }

  filterModalitiesTable(event: Event) {
    const htmlTarget = event.target as HTMLTextAreaElement;
    this.modalitiesTable?.filterGlobal(htmlTarget.value, 'contains');
  }

  openModality(modality: IModality) {
    this.router.navigate(['/modality', modality.id, 'manage']);
  }

  removeModality(modality: IModality) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to remove this modality?',
        header: 'Remove Name of Modality',
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-secondary',
        accept: () => {
          // TODO
          console.error('removed');
        }
    });
  }

  filterGroupsTable(event: Event) {
    const htmlTarget = event.target as HTMLTextAreaElement;
    this.groupsTable?.filterGlobal(htmlTarget.value, 'contains');
  }

  openGroup(group: IGroup) {
    this.router.navigate(['/group', group.id, 'manage']);
  }

  removeGroup(group: IGroup) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to remove this group?',
        header: 'Remove Name of Group',
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-secondary',
        accept: () => {
          // TODO
          console.error('removed');
        }
    });
  }

}
