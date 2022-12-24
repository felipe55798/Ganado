import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'farm',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'farm',
        loadChildren: () => import('./farm/farm.module').then( m => m.FarmModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'fair',
        loadChildren: () => import('./fair/fair.module').then( m => m.FairModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'supplier',
        loadChildren: () => import('./supplier/supplier.component').then( m => m.SupplierComponent),
        canActivate: [AuthGuard]
      }
    ],
  },  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
