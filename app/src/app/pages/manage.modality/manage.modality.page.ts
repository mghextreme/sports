import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IModality, ISport, IStage, ITeam } from 'src/app/models';
import { AuthService, ModalitiesService } from 'src/app/services';

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

  @ViewChild('stagesTable') stagesTable?: Table;
  @ViewChild('teamsTable') teamsTable?: Table;

  @ViewChild('modalityForm', { static: false }) form?: NgForm;
  validated = false;

  constructor(
    readonly authService: AuthService,
    private readonly modalitiesService: ModalitiesService,
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

  openStage(stage: IStage) {
    this.router.navigate(['/stage', stage.id, 'manage']);
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
