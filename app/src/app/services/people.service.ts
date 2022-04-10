import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPerson } from '../models';
import { ModalitiesService } from './modalities.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private readonly modalitiesService: ModalitiesService,
    private readonly http: HttpClient
  ) { }

  getDefault(): IPerson {
    return {
      id: 0,
      name: ''
    };
  }

  getAll(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(`/api/persons`);
  }

  get(id: number): Observable<IPerson> {
    return this.http.get<IPerson>(`/api/persons/${id}`);
  }

}