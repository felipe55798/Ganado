import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevelopmentComponent } from './development.component';


const routes: Routes = [
  {
    path:"",
    children: [
    {
      path: '',
      component: DevelopmentComponent
    }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevelopmentRoutingModule{}