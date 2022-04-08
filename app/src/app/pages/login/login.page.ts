import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPageComponent {

  username: string = '';
  password: string = '';

  @ViewChild('loginForm', { static: false }) form?: NgForm;

  constructor(
    readonly authService: AuthService,
    private router: Router
  ) {
    if (authService.isLoggedIn) {
      this.router.navigate(['/manage']);
    }
  }

  public attemptLogin() {
    this.authService.login(this.username, this.password);
    this.router.navigate(['/manage']);
  }

}
