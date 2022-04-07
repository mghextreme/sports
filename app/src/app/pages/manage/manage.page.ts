import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss']
})
export class ManagePageComponent {

  constructor(
    readonly authService: AuthService,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

}
