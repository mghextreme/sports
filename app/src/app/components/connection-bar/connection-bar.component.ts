import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'connection-bar',
  templateUrl: './connection-bar.component.html',
  styleUrls: ['./connection-bar.component.scss'],
  animations: [
    trigger('showHide', [
      state('show', style({
        height: '*'
      })),
      state('void', style({
        height: '0'
      })),
      transition(':enter', [ animate('200ms ease-out') ]),
      transition(':leave', [ animate('200ms ease-out') ])
    ])
  ]
})
export class ConnectionBarComponent {

  private interval = 2000;
  show = false;

  constructor(
    private readonly auth: AuthService
  ) {
    setInterval(() => this.checkConnection(), this.interval);
  }

  checkConnection(): void {
    this.auth.checkConnection().subscribe({
      next: () => { this.show = false },
      error: () => { this.show = true }
    });
  }

}
