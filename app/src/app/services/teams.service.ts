import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMatch, ITeam, ITeamParticipant } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getDefault(): ITeam {
    return {
      id: 0,
      name: ''
    };
  }

  getDefaultParticipant(): ITeamParticipant {
    return {
      id: 0,
      name: '',
      number: 0,
      teamId: 0
    }
  }

  get(id: number): Observable<IMatch> {
    return this.http.get<IMatch>(`/api/teams/${id}`);
  }

  getParticipants(id: number): Observable<ITeamParticipant[]> {
    return this.http.get<ITeamParticipant[]>(`/api/teams/${id}/participants`);
  }

}
