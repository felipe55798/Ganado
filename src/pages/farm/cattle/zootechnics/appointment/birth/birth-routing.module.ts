import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BirthComponent } from './birth.component';


const routes: Routes = [
  {
    path:"",
    children: [
    {
      path: '',
      component: BirthComponent
    }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BirthRoutingModule{}