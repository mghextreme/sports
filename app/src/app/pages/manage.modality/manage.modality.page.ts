import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IModality, ISport, IStage, ITeam } from 'src/app/models';
import { AuthService, ModalitiesService } from 'src/app/services';

@Component({
  templateUrl: './manage.modality.page.html',
  styleUrls: ['./manage.modality.page.scss']
})
export class ManageModalityPageComponent {

  modality: IModality;
  stages: IStage[];
  teams: ITeam[];
  sports: ISport[];

  constructor(
    readonly authService: AuthService,
    private readonly modalitiesService: ModalitiesService,
    private readonly activeRoute: ActivatedRoute,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.modality = this.modalitiesService.getDefault();
    this.stages = [];
    this.teams = [];
    this.sports = [];

    const modalityId = this.activeRoute.snapshot.params['id'];
    this.modalitiesService.get(modalityId).subscribe(modality => {
      this.modality = modality;
    });
    this.modalitiesService.getStages(modalityId).subscribe(stages => {
      this.stages = stages;
    });
    this.modalitiesService.getTeams(modalityId).subscribe(teams => {
      this.teams = teams;
    });
    this.modalitiesService.getSports().subscribe(sports => {
      this.sports = sports;
    });
  }

}
