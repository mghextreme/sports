import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventModalitiesPageComponent, EventPageComponent, HomePageComponent, ModalityPageComponent } from './pages';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
