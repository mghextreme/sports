import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender, IPerson } from 'src/app/models';
import { AuthService, PeopleService } from 'src/app/services';

@Component({
  templateUrl: './manage.person.page.html',
  styleUrls: ['./manage.person.page.scss']
})
export class ManagePersonPageComponent {

  person: IPerson;
  genders: string[];

  constructor(
    readonly authService: AuthService,
    private readonly peopleService: PeopleService,
    private readonly activeRoute: ActivatedRoute,
    private router: Router
  ) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.person = this.peopleService.getDefault();
    this.genders = Object.values(Gender);

    const personId = this.activeRoute.snapshot.params['id'];
    this.peopleService.get(personId).subscribe(person => {
      this.person = person;
    });
  }

}
