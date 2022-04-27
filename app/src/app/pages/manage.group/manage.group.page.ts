import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IGroup, IPerson } from 'src/app/models';
import { AuthService, GroupsService } from 'src/app/services';

@Component({
  templateUrl: './manage.group.page.html',
  styleUrls: ['./manage.group.page.scss'],
  providers: [MessageService]
})
export class ManageGroupPageComponent {

  isNew = false;

  isLoadingMembers = true;

  group: IGroup;
  members: IPerson[];

  @ViewChild('membersTable') membersTable?: Table;

  @ViewChild('groupForm', { static: false }) form?: NgForm;
  validated = false;

  constructor(
    readonly authService: AuthService,
    readonly groupsService: GroupsService,
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

    const newGroup = this.activeRoute.snapshot.data['new'];
    if (newGroup === true) {
      this.isNew = true;
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

  openMember(person: IPerson) {
    this.router.navigate(['/person', person.id, 'manage']);
  }

  removeMember(person: IPerson) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to remove this member?',
        header: 'Remove Name of Member',
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-secondary',
        accept: () => {
          // TODO
          console.error('removed');
        }
    });
  }

}
