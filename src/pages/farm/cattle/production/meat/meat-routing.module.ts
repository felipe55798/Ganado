import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeatComponent } from './meat.component';


const routes: Routes = [
  {
    path:"",
    children: [
    {
      path: '',
      component: MeatComponent
    }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeatRoutingModule{}