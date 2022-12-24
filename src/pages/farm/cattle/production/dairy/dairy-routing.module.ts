import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DairyComponent } from './dairy.component';


const routes: Routes = [
  {
    path:"",
    children: [
    {
      path: '',
      component: DairyComponent
    }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DairyRoutingModule{}