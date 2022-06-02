import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDetailedMatch, IMatch, IMatchFeedItem, StageMode } from '../models';
import { ModalitiesService } from './modalities.service';
import { StagesService } from './stages.service';
import { TeamsService } from './teams.service';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(
    private readonly http: HttpClient,
    private readonly teams: TeamsService,
    private readonly stages: StagesService,
    private readonly modalities: ModalitiesService
  ) { }

  getDefault(): IMatch {
    return {
      id: 0,
      started: false,
      finished: false,
      teams: [
        { id: 0, score: 0, team: this.teams.getDefault() },
        { id: 0, score: 0, team: this.teams.getDefault() }
      ]
    };
  }

  getDefaultDetailed(): IDetailedMatch {
    return {
      id: 0,
      started: false,
      finished: false,
      teams: [
        { id: 0, score: 0, team: this.teams.getDefault() },
        { id: 0, score: 0, team: this.teams.getDefault() }
      ],
      modality: this.modalities.getDefault(),
      stage: this.stages.getDefault()
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
