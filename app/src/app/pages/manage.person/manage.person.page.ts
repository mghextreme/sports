import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  templateUrl: './manage.person.page.html',
  styleUrls: ['./manage.person.page.scss']
})
export class ManagePersonPageComponent {

  constructor(
    readonly authService: AuthService,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

}
