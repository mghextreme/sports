import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  templateUrl: './manage.modality.page.html',
  styleUrls: ['./manage.modality.page.scss']
})
export class ManageModalityPageComponent {

  constructor(
    readonly authService: AuthService,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

}
