import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IGroup, IPerson } from 'src/app/models';
import { AuthService, GroupsService } from 'src/app/services';

@Component({
  templateUrl: './manage.group.page.html',
  styleUrls: ['./manage.group.page.scss']
})
export class ManageGroupPageComponent {

  isNew = false;

  isLoadingMembers = true;

  group: IGroup;
  members: IPerson[];

  @ViewChild('membersTable') membersTable?: Table;

  constructor(
    readonly authService: AuthService,
    readonly groupsService: GroupsService,
    private readonly confirmationService: ConfirmationService,
    private readonly activeRoute: ActivatedRoute,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.group = this.groupsService.getDefault();
    this.members = [];

    const newEvent = this.activeRoute.snapshot.data['new'];
    if (newEvent === true) {
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
