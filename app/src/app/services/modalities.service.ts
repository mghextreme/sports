import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMatch, IModality, ISport, IStage, ITeam } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ModalitiesService {

  constructor(private http: HttpClient) { }

  getDefault(): IModality {
    return {
      id: 0,
      name: '',
      sport: {
        id: 0,
        code: ''
      },
      finished: false,
      maxTeamsPerGroup: 1
    };
  }

  get(id: number): Observable<IModality> {
    return this.http.get<IModality>(`/api/modalities/${id}`);
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
