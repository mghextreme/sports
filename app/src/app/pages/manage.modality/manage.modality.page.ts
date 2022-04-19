import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IModality, ISport, IStage, ITeam } from 'src/app/models';
import { AuthService, ModalitiesService } from 'src/app/services';

@Component({
  templateUrl: './manage.modality.page.html',
  styleUrls: ['./manage.modality.page.scss']
})
export class ManageModalityPageComponent {

  isNew = false;

  isLoadingStages = true;
  isLoadingTeams = true;

  modality: IModality;
  stages: IStage[];
  teams: ITeam[];
  sports: ISport[];

  @ViewChild('stagesTable') stagesTable?: Table;
  @ViewChild('teamsTable') teamsTable?: Table;

  constructor(
    readonly authService: AuthService,
    private readonly modalitiesService: ModalitiesService,
    private readonly activeRoute: ActivatedRoute,
    private readonly confirmationService: ConfirmationService,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.modality = this.modalitiesService.getDefault();
    this.stages = [];
    this.teams = [];
    this.sports = [];

    this.modalitiesService.getSports().subscribe(sports => {
      this.sports = sports;
    });

    const newEvent = this.activeRoute.snapshot.data['new'];
    if (newEvent === true) {
      this.isNew = true;
    } else {
      const modalityId = this.activeRoute.snapshot.params['id'];
      this.modalitiesService.get(modalityId).subscribe(modality => {
        this.modality = modality;
      });
      this.modalitiesService.getStages(modalityId).subscribe(stages => {
        this.stages = stages;
        this.isLoadingStages = false;
      });
      this.modalitiesService.getTeams(modalityId).subscribe(teams => {
        this.teams = teams;
        this.isLoadingTeams = false;
      });
    }
  }

  filterStagesTable(event: Event) {
    const htmlTarget = event.target as HTMLTextAreaElement;
    this.stagesTable?.filterGlobal(htmlTarget.value, 'contains');
  }

  openStage(stage: IStage) {
    // Modal
  }

  removeStage(stage: IStage) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to remove this stage?',
        header: 'Remove Name of Stage',
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-secondary',
        accept: () => {
          // TODO
          console.error('removed');
        }
    });
  }

  filterTeamsTable(event: Event) {
    const htmlTarget = event.target as HTMLTextAreaElement;
    this.teamsTable?.filterGlobal(htmlTarget.value, 'contains');
  }

  openTeam(team: ITeam) {
    // Modal
  }

  removeTeam(team: ITeam) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to remove this team?',
        header: 'Remove Name of Team',
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-secondary',
        accept: () => {
          // TODO
          console.error('removed');
        }
    });
  }

}
