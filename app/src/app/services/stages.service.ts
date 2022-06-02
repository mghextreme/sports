import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IMatch, IRoundRobinRow, ISingleBracketMatch, IStage, IStageStart, StageMode } from '../models';
import { MatchesUtils } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class StagesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getDefault(): IStage {
    return {
      id: 0,
      modalityId: 0,
      started: false,
      finished: false,
      mode: StageMode.SingleBracket,
      maxTeams: 4
    };
  }

  getMatches(id: number): Observable<IMatch[]> {
    return this.http.get<IMatch[]>(`/api/stages/${id}/matches`);
  }

  getSingleBracketMatches(id: number): Observable<ISingleBracketMatch[]> {
    return this.getMatches(id).pipe(
      map((matches: IMatch[]) => MatchesUtils.toSingleBracketMatches(matches)));
  }

  getRoundRobinStandings(id: number):  Observable<IRoundRobinRow[]> {
    return this.http.get<IRoundRobinRow[]>(`/api/stages/${id}/roundRobinRows`);
  }

  get(id: number): Observable<IStage> {
    return this.http.get<IStage>(`/api/stages/${id}`);
  }

  add(stage: IStage): Observable<IStage> {
    return this.http.post<IStage>(`/api/stages`, stage);
  }

  update(id: number, stage: IStage): Observable<IStage> {
    return this.http.put<IStage>(`/api/stages/${id}`, stage);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`/api/stages/${id}`);
  }

  start(id: number, config: IStageStart): Observable<void> {
    return this.http.post<void>(`/api/stages/${id}/start`, config);
  }

}
