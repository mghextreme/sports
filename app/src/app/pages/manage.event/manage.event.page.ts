import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  templateUrl: './manage.event.page.html',
  styleUrls: ['./manage.event.page.scss']
})
export class ManageEventPageComponent {

  constructor(
    readonly authService: AuthService,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

}
