import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGroup, IModality } from 'src/app/models';
import { AuthService, GroupsService } from 'src/app/services';

@Component({
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss']
})
export class GroupPageComponent {

  group: IGroup;
  modalities: IModality[];

  constructor(
    readonly authService: AuthService,
    private readonly groupsService: GroupsService,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.group = this.groupsService.getDefault();
    this.modalities = [];

    const groupId = this.activeRoute.snapshot.params['id'];
    this.groupsService.get(groupId).subscribe(group => {
      this.group = group;
    });
    this.groupsService.getModalities(groupId).subscribe(modalities => {
      this.modalities = modalities;
    });
  }

}
