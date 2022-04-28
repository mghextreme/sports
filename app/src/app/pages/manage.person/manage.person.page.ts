import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Gender, IPerson } from 'src/app/models';
import { AuthService, PeopleService } from 'src/app/services';

@Component({
  templateUrl: './manage.person.page.html',
  styleUrls: ['./manage.person.page.scss'],
  providers: [MessageService]
})
export class ManagePersonPageComponent {

  isNew = false;

  person: IPerson;
  genders: string[];

  @ViewChild('personForm', { static: false }) form?: NgForm;
  validated = false;

  constructor(
    readonly authService: AuthService,
    private readonly peopleService: PeopleService,
    private readonly messageService: MessageService,
    private readonly translate: TranslateService,
    private readonly activeRoute: ActivatedRoute,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.person = this.peopleService.getDefault();
    this.genders = Object.values(Gender);

    const newGroup = this.activeRoute.snapshot.data['new'];
    if (newGroup === true) {
      this.isNew = true;
    } else {
      const personId = this.activeRoute.snapshot.params['id'];
      this.peopleService.get(personId).subscribe(person => {
        this.person = person;
      });
    }
  }

  handleSubmit() {
    if (this.form?.valid) {
      if (this.isNew) {
        this.peopleService.add(this.person).subscribe(person => {
          this.router.navigate(['/person', person.id, 'manage'], { replaceUrl: true });
        });
      } else if (this.form?.dirty) {
        this.peopleService.update(this.person.id, this.person).subscribe(person => {
          this.person = person;
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
