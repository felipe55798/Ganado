import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VaccinationComponent } from './vaccination.component';


const routes: Routes = [
  {
    path:"",
    children: [
    {
      path: '',
      component: VaccinationComponent
    }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccinationRoutingModule{}