import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDetailedMatch, IMatch, IMatchFeedItem, StageMode } from '../models';
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

  getDefaultDetailed(): IDetailedMatch {
    return {
      id: 0,
      started: false,
      finished: false,
      teams: [
        this.teams.getDefault(),
        this.teams.getDefault()
      ],
      modality: {
        id: 0,
        finished: false,
        maxTeamsPerGroup: 1,
        name: '',
        sport: {
          id: 0,
          code: ''
        }
      },
      stage: {
        id: 0,
        started: false,
        finished: false,
        mode: StageMode.RoundRobin
      }
    };
  }

  getLiveFromEvent(eventId: number): Observable<IMatch[]> {
    return this.http.get<IMatch[]>(`/api/events/${eventId}/liveMatches`);
  }

  getFeed(id: number): Observable<IMatchFeedItem[]> {
    return this.http.get<IMatchFeedItem[]>(`/api/matches/${id}/feed`);
  }

  get(id: number): Observable<IDetailedMatch> {
    return this.http.get<IDetailedMatch>(`/api/matches/${id}/details`);
  }

}
