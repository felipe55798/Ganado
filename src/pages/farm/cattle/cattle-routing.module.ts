import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../cattle/admin/admin.component';
import { BreedingComponent } from './breeding/breeding.component';
import { CattleComponent } from './cattle.component';


const routes: Routes = [
  {
    path:"",
    children: [
      {
        path: '',
        component: CattleComponent
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule),
      },
      {
        path: 'breeding',
        loadChildren: () => import('./breeding/breeding.module').then( m => m.BreedingModule),
        canActivate: []
      },
      {
        path: 'production',
        loadChildren: () => import('./production/production.module').then( m => m.ProductionModule),
        canActivate: []
      },
      {
        path: 'zootechnics',
        loadChildren: () => import('./zootechnics/zootechnics.module').then( m => m.ZootechnicsModule),
        canActivate: []
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CattleRoutingModule {}
