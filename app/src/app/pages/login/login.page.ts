import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPageComponent {

  constructor(
    readonly authService: AuthService,
    private router: Router
  ) {
    if (authService.isLoggedIn) {
      this.router.navigate(['/manage']);
    }
  }

  public attemptLogin() {
    this.authService.login('admin', 'p4ssw0rd');
    this.router.navigate(['/manage']);
  }

}
