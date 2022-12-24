import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasificationsComponent } from './clasifications.component';

const routes: Routes = [
  {
    path: '',
    component: ClasificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasificationsRoutingModule { }
