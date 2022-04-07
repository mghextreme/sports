import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventGroupsPageComponent, EventModalitiesPageComponent, EventPageComponent, HomePageComponent, LoginPageComponent, ManageEventPageComponent, ManageGroupPageComponent, ManageModalityPageComponent, ManagePageComponent, ManagePersonPageComponent, MatchPageComponent, ModalityPageComponent } from './pages';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: '/'
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'manage',
    component: ManagePageComponent
  },
  {
    path: 'event/:id',
    children: [
      {
        path: '',
        component: EventPageComponent,
        pathMatch: 'full'
      },
      {
        path: 'groups',
        component: EventGroupsPageComponent
      },
      {
        path: 'modalities',
        component: EventModalitiesPageComponent
      },
      {
        path: 'manage',
        component: ManageEventPageComponent
      }
    ]
  },
  {
    path: 'group/:id',
    children: [
      {
        path: '',
        component: ManageGroupPageComponent,
        pathMatch: 'full'
      },
      {
        path: 'manage',
        component: ManageGroupPageComponent
      }
    ]
  },
  {
    path: 'modality/:id',
    children: [
      {
        path: '',
        component: ModalityPageComponent,
        pathMatch: 'full'
      },
      {
        path: 'manage',
        component: ManageModalityPageComponent
      }
    ]
  },
  {
    path: 'match/:id',
    children: [
      {
        path: '',
        component: MatchPageComponent,
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'person/:id',
    children: [
      {
        path: 'manage',
        component: ManagePersonPageComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
