import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent, IGroup } from 'src/app/models';
import { EventsService } from 'src/app/services';

@Component({
  templateUrl: './event.groups.page.html',
  styleUrls: ['./event.groups.page.scss']
})
export class EventGroupsPageComponent {

  event: IEvent;
  groups: IGroup[];

  constructor(
    private readonly eventsService: EventsService,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.event = this.eventsService.getDefault();
    this.groups = [];

    const eventId = this.activeRoute.snapshot.params['id'];
    this.eventsService.get(eventId).subscribe(event => {
      this.event = event;
    });
    this.eventsService.getGroups(eventId).subscribe(groups => {
      this.groups = groups;
    });
  }

}
