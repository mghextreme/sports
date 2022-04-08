import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGroup, IModality } from 'src/app/models';
import { AuthService, TeamsService } from 'src/app/services';

@Component({
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss']
})
export class GroupPageComponent {

  group: IGroup;
  modalities: IModality[];

  constructor(
    readonly authService: AuthService,
    private readonly teamsService: TeamsService,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.group = this.teamsService.getDefaultGroup();
    this.modalities = [];

    const groupId = this.activeRoute.snapshot.params['id'];
    this.teamsService.getGroup(groupId).subscribe(group => {
      this.group = group;
    });
    this.teamsService.getGroupModalities(groupId).subscribe(modalities => {
      this.modalities = modalities;
    });
  }

}
