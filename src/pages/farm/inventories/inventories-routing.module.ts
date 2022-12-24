import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoriesComponent } from './inventories.component';
import { KardexComponent } from './kardex/kardex.component';
import { ProviderListComponent } from './providerList/providerList.component';
import { StoreComponent } from './store/store.component';


const routes: Routes = [
  {
    path: '',
    component: InventoriesComponent
  },
  {
    path: 'kardex',
    loadChildren: () => import('./kardex/kardex.module').then( m => m.KardexModule),
    canActivate: []
  },
  {
    path: 'providerList',
    loadChildren: () => import('./providerList/providerList.module').then( m => m.ProviderListModule),
    canActivate: []
  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then( m => m.StoreModule),
    canActivate: []
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoriesRouting {}