import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderListComponent } from './providerList.component';


const routes: Routes = [
  {
    path:"",
    children: [
    {
      path: '',
      component: ProviderListComponent
    }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderListRoutingModule{}