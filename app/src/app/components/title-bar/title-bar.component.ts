import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent {

  @Input('title') title: string = '';
  @Input('subtitle') subtitle?: string;
  @Input('subtitleLink') subtitleLink?: any[];
  @Input('background') background?: string;
  @Input('backButton') backButton: boolean = false;
  @Input('management') management: boolean = false;

  constructor(
    private readonly location: Location
  ) {
  }

  back(): void {
    this.location.back();
  }

}
