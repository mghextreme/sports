import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMatch } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private http: HttpClient) { }

  getDefault(): IMatch {
    return {
      id: 0,
      started: false,
      finished: false
    };
  }

  getLiveFromEvent(eventId: number): Observable<IMatch[]> {
    return this.http.get<IMatch[]>(`/api/events/${eventId}/liveMatches`);
  }

  getLiveFromModality(modalityId: number): Observable<IMatch[]> {
    return this.http.get<IMatch[]>(`/api/modalities/${modalityId}/liveMatches`);
  }

  get(id: number): Observable<IMatch> {
    return this.http.get<IMatch>(`/api/matches/${id}`);
  }

}
