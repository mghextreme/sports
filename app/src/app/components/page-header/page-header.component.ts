import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {

  constructor(
    readonly authService: AuthService,
    readonly translate: TranslateService,
    private router: Router
  ) { }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
