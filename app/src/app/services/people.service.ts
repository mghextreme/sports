import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPerson } from '../models';

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
    return this.http.get<IPerson[]>(`/api/people`)
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
    return this.http.get<IPerson>(`/api/people/${id}`)
      .pipe(map(person => {
        person.dateOfBirth = person.dateOfBirth
          ? new Date(person.dateOfBirth.toString())
          : undefined;
        return person;
      }));
  }

  add(person: IPerson): Observable<IPerson> {
    return this.http.post<IPerson>(`/api/people`, person);
  }

  update(id: number, person: IPerson): Observable<IPerson> {
    return this.http.put<IPerson>(`/api/people/${id}`, person);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`/api/people/${id}`);
  }

}
