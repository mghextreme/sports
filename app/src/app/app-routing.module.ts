import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventGroupsPageComponent, EventModalitiesPageComponent, EventPageComponent, GroupPageComponent, HomePageComponent, LoginPageComponent, ManageEventPageComponent, ManageGroupPageComponent, ManageModalityPageComponent, ManagePageComponent, ManagePersonPageComponent, ManageStagePageComponent, MatchPageComponent, ModalityPageComponent } from './pages';

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
