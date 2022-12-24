import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InseminationComponent } from './insemination.component';


const routes: Routes = [
  {
    path:"",
    children: [
    {
      path: '',
      component: InseminationComponent
    }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InseminationRoutingModule{}