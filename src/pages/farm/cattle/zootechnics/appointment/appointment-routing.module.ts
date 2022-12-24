import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointment.component';


const routes: Routes = [
  {
    path:"",
    children: [
    {
      path: '',
      component: AppointmentComponent
    },
    {
      path: 'attention',
      loadChildren: () => import('./attention/attention.module').then( m => m.AttentionModule),
      canActivate: []
    },
    {
      path: 'birth',
      loadChildren: () => import('./birth/birth.module').then( m => m.BirthModule),
      canActivate: []
    },
    {
      path: 'insemination',
      loadChildren: () => import('./insemination/insemination.module').then( m => m.InseminationModule),
      canActivate: []
    },
    {
      path: 'monitoring',
      loadChildren: () => import('./monitoring/monitoring.module').then( m => m.MonitoringModule),
      canActivate: []
    },
    {
      path: 'sterilization',
      loadChildren: () => import('./sterilization/sterilization.module').then( m => m.SterilizationModule),
      canActivate: []
    },
    {
      path: 'vaccination',
      loadChildren: () => import('./vaccination/vaccination.module').then( m => m.VaccinationModule),
      canActivate: []
    }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentRoutingModule{}