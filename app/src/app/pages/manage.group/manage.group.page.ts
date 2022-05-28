import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IGroup, IPerson } from 'src/app/models';
import { AuthService, GroupsService, PeopleService } from 'src/app/services';

@Component({
  templateUrl: './manage.group.page.html',
  styleUrls: ['./manage.group.page.scss'],
  providers: [MessageService]
})
export class ManageGroupPageComponent {

  isNew = false;

  isLoadingMembers = true;
  isLoadingPeople = false;
  showAddMemberDialog = false;

  group: IGroup;
  members: IPerson[];

  peopleSearch: IPerson[];
  peopleSearchTerm = '';

  @ViewChild('membersTable') membersTable?: Table;

  @ViewChild('groupForm', { static: false }) form?: NgForm;
  validated = false;

  constructor(
    readonly authService: AuthService,
    private readonly groupsService: GroupsService,
    private readonly peopleService: PeopleService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly translate: TranslateService,
    private readonly activeRoute: ActivatedRoute,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.group = this.groupsService.getDefault();
    this.members = [];
    this.peopleSearch = [];

    const newGroup = this.activeRoute.snapshot.data['new'];
    if (newGroup === true) {
      this.isNew = true;

      const eventId = this.activeRoute.snapshot.params['id'];
      this.group.eventId = eventId;
    } else {
      const groupId = this.activeRoute.snapshot.params['id'];
      this.groupsService.get(groupId).subscribe(group => {
        this.group = group;
      });
      this.groupsService.getMembers(groupId).subscribe(members => {
        this.members = members;
        this.isLoadingMembers = false;
      });
    }
  }

  handleSubmit() {
    if (this.form?.valid) {
      if (this.isNew) {
        this.groupsService.add(this.group).subscribe(group => {
          this.router.navigate(['/group', group.id, 'manage'], { replaceUrl: true });
        });
      } else if (this.form?.dirty) {
        this.groupsService.update(this.group.id, this.group).subscribe(group => {
          this.group = group;
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

  filterMembersTable(event: Event) {
    const htmlTarget = event.target as HTMLTextAreaElement;
    this.membersTable?.filterGlobal(htmlTarget.value, 'contains');
  }

  addMember(person: IPerson) {
    this.peopleSearch = this.peopleSearch.filter(p => p.id !== person.id);
    this.groupsService.addMember(this.group.id, person.id).subscribe({
      next: () => {
        this.members.push(person);
      }
    });
  }

  searchPeople() {
    this.peopleService.search(this.peopleSearchTerm).subscribe({
      next: (result) => {
        this.peopleSearch = result;
      }
    });
  }

  openMember(person: IPerson) {
    this.router.navigate(['/person', person.id, 'manage']);
  }

  removeMember(person: IPerson) {
    this.confirmationService.confirm({
      message: this.translate.instant('manage.messages.are-you-sure-remove-x', { x: person.name }),
      header: this.translate.instant('manage.messages.remove-x', { x: person.name }),
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.groupsService.deleteMemberById(this.group.id, person.id).subscribe(() => {
          this.members = this.members.filter(m => m.id !== person.id);
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
