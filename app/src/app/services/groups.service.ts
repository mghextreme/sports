import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IGroup, IModality, IPerson, ITeam } from '../models';
import { ModalitiesService } from './modalities.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(
    private readonly modalitiesService: ModalitiesService,
    private readonly http: HttpClient
  ) { }

  getDefault(): IGroup {
    return {
      id: 0,
      name: '',
      color1: '#000000',
      color2: '#ffffff'
    };
  }

  getAll(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(`/api/groups`);
  }

  get(id: number): Observable<IGroup> {
    return this.http.get<IGroup>(`/api/groups/${id}`);
  }

  getMembers(id: number): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(`/api/groups/${id}/members`);
  }

  getModalities(id: number): Observable<IModality[]> {
    return this.http.get<ITeam[]>(`/api/groups/${id}/modalities`).pipe(map(teams => teams.map(t => t.modality ?? this.modalitiesService.getDefault())));
  }

}
