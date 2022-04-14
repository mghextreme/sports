import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMatch, IModality, IStage, ITeam } from 'src/app/models';
import { AuthService, ModalitiesService } from 'src/app/services';

@Component({
  templateUrl: './modality.page.html',
  styleUrls: ['./modality.page.scss']
})
export class ModalityPageComponent {

  modality: IModality;
  finishedMatches: IMatch[];
  remainingMatches: IMatch[];
  stages: IStage[];
  teams: ITeam[];

  constructor(
    readonly authService: AuthService,
    private readonly modalitiesService: ModalitiesService,
    private readonly activeRoute: ActivatedRoute
  ) {
    this.modality = this.modalitiesService.getDefault();
    this.finishedMatches = [];
    this.remainingMatches = [];
    this.stages = [];
    this.teams = [];

    const modalityId = this.activeRoute.snapshot.params['id'];
    this.modalitiesService.get(modalityId).subscribe(modality => {
      this.modality = modality;
    });
    this.modalitiesService.getMatches(modalityId).subscribe(matches => {
      this.finishedMatches = matches.filter(m => m.finished).reverse();
      this.remainingMatches = matches.filter(m => !m.finished);
    });
    this.modalitiesService.getStages(modalityId).subscribe(stages => {
      this.stages = stages;
    });
    this.modalitiesService.getTeams(modalityId).subscribe(teams => {
      this.teams = teams;
    });
  }

}
