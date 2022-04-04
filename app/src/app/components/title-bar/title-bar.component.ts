import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent {

  @Input('title') title: string = '';
  @Input('subtitle') subtitle?: string;
  @Input('background') background?: string;
  @Input('back') back?: any[];

  constructor(
    readonly translate: TranslateService
  ) {
  }

}

