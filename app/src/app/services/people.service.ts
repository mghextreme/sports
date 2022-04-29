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

  search(term: string): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(`/api/persons/search/${term}`)
      .pipe(map(persons => {
        persons.forEach(person => {
          person.dateOfBirth = person.dateOfBirth
            ? new Date(person.dateOfBirth.toString())
            : undefined;
          return person;
        });
        return persons;
      }));
  }

  add(person: IPerson): Observable<IPerson> {
    return this.http.post<IPerson>(`/api/persons`, person);
  }

  update(id: number, person: IPerson): Observable<IPerson> {
    return this.http.put<IPerson>(`/api/persons/${id}`, person);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`/api/persons/${id}`);
  }

}
