import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroup, IPerson } from 'src/app/models';
import { AuthService, GroupsService } from 'src/app/services';

@Component({
  templateUrl: './manage.group.page.html',
  styleUrls: ['./manage.group.page.scss']
})
export class ManageGroupPageComponent {

  group: IGroup;
  members: IPerson[];

  constructor(
    readonly authService: AuthService,
    readonly groupsService: GroupsService,
    private readonly activeRoute: ActivatedRoute,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.group = this.groupsService.getDefault();
    this.members = [];

    const groupId = this.activeRoute.snapshot.params['id'];
    this.groupsService.get(groupId).subscribe(group => {
      this.group = group;
    });
    this.groupsService.getMembers(groupId).subscribe(members => {
      this.members = members;
    });
  }

}
