import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMatch, IModality, ISport, IStage, ITeam } from '../models';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class ModalitiesService {

  constructor(
    private http: HttpClient,
    private readonly events: EventsService
  ) { }

  getDefault(): IModality {
    return {
      id: 0,
      name: '',
      sportId: 0,
      finished: false,
      maxTeamsPerGroup: 1,
      eventId: 0,
      sport: {
        id: 0,
        code: ''
      },
      event: this.events.getDefault()
    };
  }

  get(id: number): Observable<IModality> {
    return this.http.get<IModality>(`/api/modalities/${id}`);
  }

  add(modality: IModality): Observable<IModality> {
    if (modality.eventId === 0 && modality.event?.id !== 0) {
      modality.eventId = modality.event?.id ?? modality.eventId;
    }
    delete modality['event'];

    if (modality.sportId === 0 && modality.sport?.id !== 0) {
      modality.sportId = modality.sport?.id ?? modality.sportId;
    }
    delete modality['sport'];

    return this.http.post<IModality>(`/api/modalities`, modality);
  }

  update(id: number, modality: IModality): Observable<IModality> {
    return this.http.put<IModality>(`/api/modalities/${id}`, modality);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`/api/modalities/${id}`);
  }

  getMatches(id: number): Observable<IMatch[]> {
    return this.http.get<IMatch[]>(`/api/modalities/${id}/matches`);
  }

  getStages(id: number): Observable<IStage[]> {
    return this.http.get<IStage[]>(`/api/modalities/${id}/stages`);
  }

  getTeams(id: number): Observable<ITeam[]> {
    return this.http.get<ITeam[]>(`/api/modalities/${id}/teams`);
  }

  getSports(): Observable<ISport[]> {
    return this.http.get<ISport[]>(`/api/sports`);
  }

}
