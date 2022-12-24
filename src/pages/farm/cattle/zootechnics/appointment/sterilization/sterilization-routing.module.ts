import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SterilizationComponent } from './sterilization.component';


const routes: Routes = [
  {
    path:"",
    children: [
    {
      path: '',
      component: SterilizationComponent
    }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class sterilizationRoutingModule{}