import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
      location: ''
    };
  }

  getDefaultModality(): IModality {
    return {
      id: 0,
      name: '',
      sport: {
        id: 0,
        code: ''
      },
      finished: false
    };
  }

  getAll(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>('/api/events');
  }

  get(id: number): Observable<IEvent> {
    return this.http.get<IEvent>(`/api/events/${id}`);
  }

  getModalities(id: number): Observable<IModality[]> {
    return this.http.get<IModality[]>(`/api/events/${id}/modalities`);
  }

  getModality(modalityId: number): Observable<IModality> {
    return this.http.get<IModality>(`/api/modalities/${modalityId}`);
  }

  getGroups(id: number): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(`/api/events/${id}/groups`);
  }

}
