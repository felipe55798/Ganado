import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FarmComponent } from './farm.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component:FarmComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'cattle',
        loadChildren: () => import('./cattle/cattle.module').then( m => m.CattleModule),
        canActivate: []
      },
      {
        path: 'inventories',
        loadChildren: () => import('./inventories/inventories.module').then( m => m.InventoriesModule),
        canActivate: []
      },
      {
        path: 'marketPlace',
        loadChildren: () => import('./marketPlace/marketPlace.module').then( m => m.MarketPlaceModule),
        canActivate: []
      },
      {
        path: 'pens',
        loadChildren: () => import('./pens/pens.module').then( m => m.PensModule),
        canActivate: []
      },
      {
        path: 'registration',
        loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationModule),
        canActivate: []
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmRoutingModule {}
