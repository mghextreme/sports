import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventGroupsPageComponent, EventModalitiesPageComponent, EventPageComponent, GroupPageComponent, HomePageComponent, LoginPageComponent, ManageEventPageComponent, ManageGroupPageComponent, ManageModalityPageComponent, ManagePageComponent, ManagePersonPageComponent, ManageStagePageComponent, ManageTeamPageComponent, MatchPageComponent, ModalityPageComponent } from './pages';

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
    path: 'event',
    children: [
      {
        path: 'new',
        data: { new: true },
        component: ManageEventPageComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
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
          },
          {
            path: 'new-modality',
            data: { new: true },
            component: ManageModalityPageComponent
          },
          {
            path: 'new-group',
            data: { new: true },
            component: ManageGroupPageComponent
          }
        ]
      }
    ]
  },
  {
    path: 'group/:id',
    children: [
      {
        path: '',
        component: GroupPageComponent,
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
      },
      {
        path: 'new-stage',
        data: { new: true },
        component: ManageStagePageComponent
      },
      {
        path: 'new-team',
        data: { new: true },
        component: ManageTeamPageComponent
      }
    ]
  },
  {
    path: 'stage/:id',
    children: [
      {
        path: 'manage',
        component: ManageStagePageComponent
      }
    ]
  },
  {
    path: 'team/:id',
    children: [
      {
        path: 'manage',
        component: ManageTeamPageComponent
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
    path: 'person',
    children: [
      {
        path: 'new',
        data: { new: true },
        component: ManagePersonPageComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        children: [
          {
            path: 'manage',
            component: ManagePersonPageComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
