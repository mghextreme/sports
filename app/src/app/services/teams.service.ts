import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IGroup, IMatch, IModality, ITeam, ITeamParticipant } from '../models';
import { ModalitiesService } from './modalities.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(
    private readonly modalitiesService: ModalitiesService,
    private readonly http: HttpClient
  ) { }

  getDefault(): ITeam {
    return {
      id: 0,
      name: ''
    };
  }

  getDefaultGroup(): IGroup {
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

  getGroup(groupId: number): Observable<IGroup> {
    return this.http.get<IGroup>(`/api/groups/${groupId}`);
  }

  getParticipants(id: number): Observable<ITeamParticipant[]> {
    return this.http.get<ITeamParticipant[]>(`/api/teams/${id}/participants`);
  }

  getGroupModalities(groupId: number): Observable<IModality[]> {
    return this.http.get<ITeam[]>(`/api/groups/${groupId}/modalities`).pipe(map(teams => teams.map(t => t.modality ?? this.modalitiesService.getDefault())));
  }

}
