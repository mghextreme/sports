import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { IMatch, IMatchTeam, IStage, ITeam, StageMode } from 'src/app/models';
import { AuthService, StagesService } from 'src/app/services';

@Component({
  templateUrl: './manage.stage.page.html',
  styleUrls: ['./manage.stage.page.scss'],
  providers: [MessageService]
})
export class ManageStagePageComponent {

  isNew = false;

  isLoadingMatches = true;

  stage: IStage;
  modes: string[];

  matches: IMatch[];

  @ViewChild('stageForm', { static: false }) form?: NgForm;
  validated = false;

  constructor(
    readonly authService: AuthService,
    private readonly stagesService: StagesService,
    private readonly messageService: MessageService,
    private readonly translate: TranslateService,
    private readonly activeRoute: ActivatedRoute,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.stage = this.stagesService.getDefault();
    this.modes = Object.values(StageMode);
    this.matches = [];

    const newStage = this.activeRoute.snapshot.data['new'];
    if (newStage === true) {
      this.isNew = true;

      const modalityId = this.activeRoute.snapshot.params['id'];
      this.stage.modalityId = modalityId;
    } else {
      const stageId = this.activeRoute.snapshot.params['id'];
      this.stagesService.get(stageId).subscribe(stage => {
        this.stage = stage;
      });
      this.stagesService.getMatches(stageId).subscribe(matches => {
        this.matches = matches;
        this.isLoadingMatches = false;
      });
    }
  }

  openMatch(match: IMatch) {
    this.router.navigate(['/match', match.id, 'manage']);
  }

  handleSubmit() {
    if (this.form?.valid) {
      if (this.isNew) {
        this.stagesService.add(this.stage).subscribe(stage => {
          this.router.navigate(['/stage', stage.id, 'manage'], { replaceUrl: true });
        });
      } else if (this.form?.dirty) {
        this.stagesService.update(this.stage.id, this.stage).subscribe(stage => {
          this.stage = stage;
          this.form?.form.markAsPristine();
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('manage.messages.success'),
            detail: this.translate.instant('manage.messages.item-updated')
          });
        });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: this.translate.instant('manage.messages.attention-required'),
          detail: this.translate.instant('manage.messages.no-updates')
        });
      }
    }

    this.validated = true;
  }

}
