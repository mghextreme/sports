import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPerson } from '../models';
import { ModalitiesService } from './modalities.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getDefault(): IPerson {
    return {
      id: 0,
      name: ''
    };
  }

  getAll(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(`/api/persons`)
      .pipe(map(people => {
        people.forEach(person => {
          person.dateOfBirth = person.dateOfBirth
            ? new Date(person.dateOfBirth.toString())
            : undefined;
        });
        return people;
      }));
  }

  get(id: number): Observable<IPerson> {
    return this.http.get<IPerson>(`/api/persons/${id}`)
      .pipe(map(person => {
        person.dateOfBirth = person.dateOfBirth
          ? new Date(person.dateOfBirth.toString())
          : undefined;
        return person;
      }));
  }

}
