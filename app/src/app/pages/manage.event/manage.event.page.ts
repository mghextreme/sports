import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent, IGroup, IModality } from 'src/app/models';
import { AuthService, EventsService, GroupsService, ModalitiesService } from 'src/app/services';

@Component({
  templateUrl: './manage.event.page.html',
  styleUrls: ['./manage.event.page.scss']
})
export class ManageEventPageComponent {

  event: IEvent;
  modalities: IModality[];
  groups: IGroup[];

  constructor(
    readonly authService: AuthService,
    private readonly eventsService: EventsService,
    private readonly activeRoute: ActivatedRoute,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.event = this.eventsService.getDefault();
    this.modalities = [];
    this.groups = [];

    const eventId = this.activeRoute.snapshot.params['id'];
    this.eventsService.get(eventId).subscribe(event => {
      this.event = event;
    });
    this.eventsService.getModalities(eventId).subscribe(modalities => {
      this.modalities = modalities;
    });
    this.eventsService.getGroups(eventId).subscribe(groups => {
      this.groups = groups;
    });
  }

}
