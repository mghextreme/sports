import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMatch } from '../models';
import { TeamsService } from './teams.service';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(
    private readonly http: HttpClient,
    private readonly teams: TeamsService
  ) { }

  getDefault(): IMatch {
    return {
      id: 0,
      started: false,
      finished: false,
      teams: [
        this.teams.getDefault(),
        this.teams.getDefault()
      ]
    };
  }

  getLiveFromEvent(eventId: number): Observable<IMatch[]> {
    return this.http.get<IMatch[]>(`/api/events/${eventId}/liveMatches`);
  }

  getFromStage(stageId: number): Observable<IMatch[]> {
    return this.http.get<IMatch[]>(`/api/stage/${stageId}/matches`);
  }

  get(id: number): Observable<IMatch> {
    return this.http.get<IMatch>(`/api/matches/${id}`);
  }

}
