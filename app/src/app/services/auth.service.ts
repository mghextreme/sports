import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private _loggedIn: boolean = false;

  get isLoggedIn(): boolean {
    return this._loggedIn;
  }

  public login(username: string, password: string) {
    this._loggedIn = true;
  }

  public logout() {
    this._loggedIn = false;
  }

}
