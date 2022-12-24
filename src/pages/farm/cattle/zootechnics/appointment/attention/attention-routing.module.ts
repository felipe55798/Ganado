import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttentionComponent } from './attention.component';


const routes: Routes = [
  {
    path:"",
    children: [
    {
      path: '',
      component: AttentionComponent
    }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttentionRoutingModule{}