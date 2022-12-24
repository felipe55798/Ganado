import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargesComponent } from './charges/charges.component';
import { DetailChargeComponent } from './detail-charge/detail-charge.component';

const routes: Routes = [
  { path:"", component: ChargesComponent },
  { path:"detail", component: DetailChargeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargesRoutingModule { }
