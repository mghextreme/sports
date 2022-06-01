import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITeam, ITeamParticipant } from '../models';

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
      name: '',
      groupId: 0,
      modalityId: 0
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

  get(id: number): Observable<ITeam> {
    return this.http.get<ITeam>(`/api/teams/${id}`);
  }

  add(team: ITeam): Observable<ITeam> {
    if (team.modalityId === 0 && team.modality?.id !== 0) {
      team.modalityId = team.modality?.id ?? team.modalityId;
    }

    if (team.groupId === 0 && team.group?.id !== 0) {
      team.groupId = team.group?.id ?? team.groupId;
    }

    return this.http.post<ITeam>(`/api/teams`, team);
  }

  update(id: number, team: ITeam): Observable<ITeam> {
    if (team.groupId === 0 && team.group?.id !== 0) {
      team.groupId = team.group?.id ?? team.groupId;
    }

    return this.http.put<ITeam>(`/api/teams/${id}`, team);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`/api/teams/${id}`);
  }

  getParticipants(id: number): Observable<ITeamParticipant[]> {
    return this.http.get<ITeamParticipant[]>(`/api/teams/${id}/participants`);
  }

}
