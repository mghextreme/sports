import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IRoundRobinStageStart, IStage, IStageStart, ITeam, StageMode } from 'src/app/models';
import { AuthService, ModalitiesService, StagesService } from 'src/app/services';

@Component({
  templateUrl: './manage.stage.start.page.html',
  styleUrls: ['./manage.stage.start.page.scss'],
  providers: [MessageService]
})
export class ManageStageStartPageComponent {

  stage: IStage;
  teams: ITeam[];
  selectedTeams: ITeam[];
  config: IStageStart;
  roundRobinConfig: IRoundRobinStageStart;

  constructor(
    readonly authService: AuthService,
    private readonly stagesService: StagesService,
    private readonly modalitiesService: ModalitiesService,
    private readonly messageService: MessageService,
    private readonly activeRoute: ActivatedRoute,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.stage = this.stagesService.getDefault();
    this.teams = [];
    this.selectedTeams = [];
    this.config = {
      id: 0,
      teamIds: []
    };
    this.roundRobinConfig = {
      homeAndAwayGames: false
    };

    const stageId = this.activeRoute.snapshot.params['id'];
    this.stagesService.get(stageId).subscribe(stage => {
      this.stage = stage;
      this.config.id = stage.id;
      if (stage?.modality?.id) {
        this.modalitiesService.getTeams(stage.modality.id).subscribe(teams => {
          this.teams = teams.sort((a, b) => a.name.localeCompare(b.name));
        });
      }
    });
  }

  handleSubmit() {
    switch (this.stage.mode) {
      case StageMode.RoundRobin:
        this.config.roundRobin = this.roundRobinConfig;
        break;
    }

    this.config.teamIds = this.selectedTeams.map(team => team.id);
    this.stagesService.start(this.stage.id, this.config).subscribe({
      next: () => {
        this.router.navigate(['/modality', this.stage.modality?.id ?? 0, 'manage'])
      },
      error: () => {
        this.messageService.add({
          severity: 'error'
        });
      }
    });
  }

}
