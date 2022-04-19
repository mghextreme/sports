import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStage, StageMode } from 'src/app/models';
import { AuthService, StagesService } from 'src/app/services';

@Component({
  templateUrl: './manage.stage.page.html',
  styleUrls: ['./manage.stage.page.scss']
})
export class ManageStagePageComponent {

  isNew = false;

  stage: IStage;
  modes: string[];

  constructor(
    readonly authService: AuthService,
    private readonly stagesService: StagesService,
    private readonly activeRoute: ActivatedRoute,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.stage = this.stagesService.getDefault();
    this.modes = Object.values(StageMode);

    const newStage = this.activeRoute.snapshot.data['new'];
    if (newStage === true) {
      this.isNew = true;
    } else {
      const stageId = this.activeRoute.snapshot.params['id'];
      this.stagesService.get(stageId).subscribe(stage => {
        this.stage = stage;
      });
    }
  }

}
