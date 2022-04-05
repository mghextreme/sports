import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventGroupsPageComponent, EventModalitiesPageComponent, EventPageComponent, HomePageComponent, MatchPageComponent, ModalityPageComponent } from './pages';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
