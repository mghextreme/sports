import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IMatch, IRoundRobinRow, ISingleBracketMatch, IStage, StageMode } from '../models';
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

}
