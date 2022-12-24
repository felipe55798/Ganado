import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZootechnicsComponent } from './zootechnics.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [
  {
    path:"",
    children: [
      {
        path: '',
        component: ZootechnicsComponent
      },
      {
        path: 'appointment',
        loadChildren: () => import('./appointment/appointment.module').then( m => m.AppointmentModule),
        canActivate: []
      },
      {
        path: 'history',
        loadChildren: () => import('./history/history.module').then( m => m.HistoryModule),
        canActivate: []
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZootechnicsRoutingModule {}
