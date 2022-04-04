import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IMatch, ITeam } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(
    private readonly http: HttpClient,
    private readonly translate: TranslateService
  ) { }

  getDefault(): ITeam {
    const tbd = this.translate.instant('teams.tbd');
    return {
      id: 0,
      name: tbd
    };
  }

  get(id: number): Observable<IMatch> {
    return this.http.get<IMatch>(`/api/teams/${id}`);
  }

}
