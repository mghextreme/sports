import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private _loggedIn: boolean = true;

  get isLoggedIn(): boolean {
    return this._loggedIn;
  }

  public login(username: string, password: string) {
    this._loggedIn = true;
  }

  public logout() {
    this._loggedIn = false;
  }

  public checkConnection(): Observable<void> {
    return this.http.options<void>('/api/events');
  }

}
