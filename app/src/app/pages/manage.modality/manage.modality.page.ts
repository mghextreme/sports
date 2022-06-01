import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IModality, ISport, IStage, ITeam } from 'src/app/models';
import { AuthService, ModalitiesService, StagesService, TeamsService } from 'src/app/services';

@Component({
  templateUrl: './manage.modality.page.html',
  styleUrls: ['./manage.modality.page.scss'],
  providers: [MessageService]
})
export class ManageModalityPageComponent {

  isNew = false;

  isLoadingStages = true;
  isLoadingTeams = true;

  modality: IModality;
  stages: IStage[];
  teams: ITeam[];
  sports: ISport[];

  selectedSport: number = 0;

  @ViewChild('stagesTable') stagesTable?: Table;
  @ViewChild('teamsTable') teamsTable?: Table;

  @ViewChild('modalityForm', { static: false }) form?: NgForm;
  validated = false;

  constructor(
    readonly authService: AuthService,
    private readonly modalitiesService: ModalitiesService,
    private readonly stagesService: StagesService,
    private readonly teamsService: TeamsService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly translate: TranslateService,
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

    this.modalitiesService.getSports().subscribe(sports => {
      this.sports = sports;
    });

    const newModality = this.activeRoute.snapshot.data['new'];
    if (newModality === true) {
      this.isNew = true;

      const eventId = this.activeRoute.snapshot.params['id'];
      this.modality.eventId = eventId;
    } else {
      const modalityId = this.activeRoute.snapshot.params['id'];
      this.modalitiesService.get(modalityId).subscribe(modality => {
        this.modality = modality;
        this.selectedSport = this.modality.sport?.id ?? 0;
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

  handleSubmit() {
    if (this.form?.valid) {
      this.modality.sportId = this.selectedSport;

      if (this.isNew) {
        this.modalitiesService.add(this.modality).subscribe(modality => {
          this.router.navigate(['/modality', modality.id, 'manage'], { replaceUrl: true });
        });
      } else if (this.form?.dirty) {
        this.modalitiesService.update(this.modality.id, this.modality).subscribe(modality => {
          this.modality = modality;
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

  filterStagesTable(event: Event) {
    const htmlTarget = event.target as HTMLTextAreaElement;
    this.stagesTable?.filterGlobal(htmlTarget.value, 'contains');
  }

  startStage(stage: IStage) {
    this.router.navigate(['/stage', stage.id, 'start']);
  }

  openStage(stage: IStage) {
    this.router.navigate(['/stage', stage.id, 'manage']);
  }

  removeStage(stage: IStage) {
    this.confirmationService.confirm({
      message: this.translate.instant('manage.messages.are-you-sure-remove-x', { x: stage.name }),
      header: this.translate.instant('manage.messages.remove-x', { x: stage.name }),
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.stagesService.deleteById(stage.id).subscribe(() => {
          this.stages = this.stages.filter(s => s.id !== stage.id);
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('manage.messages.success'),
            detail: this.translate.instant('manage.messages.item-removed')
          });
        });
      }
    });
  }

  filterTeamsTable(event: Event) {
    const htmlTarget = event.target as HTMLTextAreaElement;
    this.teamsTable?.filterGlobal(htmlTarget.value, 'contains');
  }

  openTeam(team: ITeam) {
    this.router.navigate(['/team', team.id, 'manage']);
  }

  removeTeam(team: ITeam) {
    this.confirmationService.confirm({
      message: this.translate.instant('manage.messages.are-you-sure-remove-x', { x: team.name }),
      header: this.translate.instant('manage.messages.remove-x', { x: team.name }),
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.teamsService.deleteById(team.id).subscribe(() => {
          this.stages = this.stages.filter(s => s.id !== team.id);
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('manage.messages.success'),
            detail: this.translate.instant('manage.messages.item-removed')
          });
        });
      }
    });
  }

}
