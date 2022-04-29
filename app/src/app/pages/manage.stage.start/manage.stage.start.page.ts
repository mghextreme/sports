import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStage } from 'src/app/models';
import { AuthService, StagesService } from 'src/app/services';

@Component({
  templateUrl: './manage.stage.start.page.html',
  styleUrls: ['./manage.stage.start.page.scss']
})
export class ManageStageStartPageComponent {

  stage: IStage;

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

    const stageId = this.activeRoute.snapshot.params['id'];
    this.stagesService.get(stageId).subscribe(stage => {
      this.stage = stage;
    });
  }

}
