import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { IGroup, IModality, ITeam } from 'src/app/models';
import { AuthService, EventsService, ModalitiesService, TeamsService } from 'src/app/services';
import * as _ from 'lodash';

@Component({
  templateUrl: './manage.team.page.html',
  styleUrls: ['./manage.team.page.scss'],
  providers: [MessageService]
})
export class ManageTeamPageComponent {

  isNew = false;

  team: ITeam;
  modality: IModality;
  groups: IGroup[];
  selectedGroup?: IGroup;

  @ViewChild('teamForm', { static: false }) form?: NgForm;
  validated = false;

  constructor(
    readonly authService: AuthService,
    private readonly teamsService: TeamsService,
    private readonly eventsService: EventsService,
    private readonly modalitiesService: ModalitiesService,
    private readonly messageService: MessageService,
    private readonly translate: TranslateService,
    private readonly activeRoute: ActivatedRoute,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.team = this.teamsService.getDefault();
    this.modality = this.modalitiesService.getDefault();
    this.groups = [];

    const newTeam = this.activeRoute.snapshot.data['new'];
    if (newTeam === true) {
      this.isNew = true;

      const modalityId = this.activeRoute.snapshot.params['id'];
      this.team.modalityId = modalityId;
      this.loadModality();
    } else {
      const teamId = this.activeRoute.snapshot.params['id'];
      this.teamsService.get(teamId).subscribe(team => {
        this.team = team;
        if (this.team.modality) {
          this.setModality(this.team.modality);
        } else {
          this.loadModality();
        }
        this.updateSelection();
      });
    }
  }

  handleSubmit() {
    if (this.form?.valid) {
      this.team.group = this.selectedGroup;
      this.team.groupId = this.selectedGroup?.id ?? this.team.groupId;

      if (this.isNew) {
        this.teamsService.add(this.team).subscribe(team => {
          this.router.navigate(['/team', team.id, 'manage'], { replaceUrl: true });
        });
      } else if (this.form?.dirty) {
        this.teamsService.update(this.team.id, this.team).subscribe(team => {
          this.team = team;
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

  handleGroupChange() {
    if (this.modality.maxTeamsPerGroup === 1) {
      const selGroup = this.groups.find(g => g.id === this.selectedGroup?.id);
      if (selGroup) {
        const tempTeam = _.cloneDeep(this.team);
        tempTeam.name = selGroup.name;
        this.team = tempTeam;
      }
    }
  }

  get autoGenerateName(): boolean {
    return this.modality.maxTeamSize === 1 ||
      this.modality.maxTeamsPerGroup === 1;
  }

  private loadModality(): void {
    if (this.team?.modality?.id) {
      this.modalitiesService.get(this.team.modality.id).subscribe(this.setModality);
    }
  }

  private setModality(modality: IModality) {
    this.modality = modality;
    this.loadGroups();
  }

  private loadGroups(): void {
    if (this.modality?.event?.id) {
      this.eventsService.getGroups(this.modality.event.id).subscribe(groups => {
        this.groups = groups;
        this.updateSelection();
      });
    }
  }

  private updateSelection() {
    if (this.groups.length > 0 && this.team.groupId) {
      const selGroup = this.groups.find(g => g.id === this.team.groupId);
      if (selGroup) {
        this.selectedGroup = selGroup;
      }
    }
  }

}
