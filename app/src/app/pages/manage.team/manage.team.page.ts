import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { IGroup, ITeam } from 'src/app/models';
import { AuthService, GroupsService, TeamsService } from 'src/app/services';

@Component({
  templateUrl: './manage.team.page.html',
  styleUrls: ['./manage.team.page.scss'],
  providers: [MessageService]
})
export class ManageTeamPageComponent {

  isNew = false;

  team: ITeam;
  groups: IGroup[];

  @ViewChild('teamForm', { static: false }) form?: NgForm;
  validated = false;

  constructor(
    readonly authService: AuthService,
    private readonly teamsService: TeamsService,
    private readonly groupsService: GroupsService,
    private readonly messageService: MessageService,
    private readonly translate: TranslateService,
    private readonly activeRoute: ActivatedRoute,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.team = this.teamsService.getDefault();
    this.groups = [];

    this.groupsService.getAll().subscribe(groups => {
      this.groups = groups;
    });

    const newTeam = this.activeRoute.snapshot.data['new'];
    if (newTeam === true) {
      this.isNew = true;

      const modalityId = this.activeRoute.snapshot.params['id'];
      this.team.modalityId = modalityId;
    } else {
      const teamId = this.activeRoute.snapshot.params['id'];
      this.teamsService.get(teamId).subscribe(team => {
        this.team = team;
      });
    }
  }

  handleSubmit() {
    if (this.form?.valid) {
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

}
