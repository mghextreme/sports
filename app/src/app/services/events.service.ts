import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IEvent, IGroup, IModality } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getDefault(): IEvent {
    return {
      id: 0,
      name: '',
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      public: false
    };
  }

  getAll(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>('/api/events')
      .pipe(map(events => {
        events.forEach(event => {
          event.startDate = new Date(event.startDate.toString());
          event.endDate = new Date(event.endDate.toString());
        });
        return events;
      }));
  }

  get(id: number): Observable<IEvent> {
    return this.http.get<IEvent>(`/api/events/${id}`)
      .pipe(map(event => {
        event.startDate = new Date(event.startDate.toString());
        event.endDate = new Date(event.endDate.toString());
        return event;
      }));
  }

  getModalities(id: number): Observable<IModality[]> {
    return this.http.get<IModality[]>(`/api/events/${id}/modalities`);
  }

  getGroups(id: number): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(`/api/events/${id}/groups`);
  }

}
