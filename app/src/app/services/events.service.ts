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
        events.forEach(this.convertDates);
        return events;
      }));
  }

  get(id: number): Observable<IEvent> {
    return this.http.get<IEvent>(`/api/events/${id}`)
      .pipe(map(this.convertDates));
  }

  add(event: IEvent): Observable<IEvent> {
    return this.http.post<IEvent>(`/api/events`, event)
      .pipe(map(this.convertDates));
  }

  update(id: number, event: IEvent): Observable<IEvent> {
    return this.http.put<IEvent>(`/api/events/${id}`, event)
      .pipe(map(this.convertDates));
  }

  getModalities(id: number): Observable<IModality[]> {
    return this.http.get<IModality[]>(`/api/events/${id}/modalities`);
  }

  getGroups(id: number): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(`/api/events/${id}/groups`);
  }

  private convertDates(event: IEvent): IEvent {
    event.startDate = new Date(event.startDate.toString());
    event.endDate = new Date(event.endDate.toString());
    return event;
  }

}
