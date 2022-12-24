import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReproductionComponent } from './reproduction.component';


const routes: Routes = [
  {
    path:"",
    children: [
    {
      path: '',
      component: ReproductionComponent
    }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReproductionRoutingModule{}