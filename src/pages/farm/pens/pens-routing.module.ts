import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PensComponent } from './pens.component';


const routes: Routes = [
  {
    path:"",
    children: [
    {
      path: '',
      component: PensComponent
    }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PensRoutingModule{}