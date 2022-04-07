import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  templateUrl: './manage.group.page.html',
  styleUrls: ['./manage.group.page.scss']
})
export class ManageGroupPageComponent {

  constructor(
    readonly authService: AuthService,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

}
