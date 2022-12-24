import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DairyComponent } from './dairy/dairy.component';
import { ProductionComponent } from './production.component';
import { ExhibitionComponent } from './exhibition/exhibition.component';
import { MeatComponent } from './meat/meat.component';
import { ReproductionComponent } from './reproduction/reproduction.component';


const routes: Routes = [
  {
    path:"",
    children: [
    {
      path: '',
      component: ProductionComponent
    },
    {
      path: 'dairy',
      loadChildren: () => import('./dairy/dairy.module').then( m => m.DairyModule),
      canActivate: []
    },
    {
      path: 'exhibition',
      loadChildren: () => import('./exhibition/exhibition.module').then( m => m.ExhibitionModule),
      canActivate: []
    },
    {
      path: 'meat',
      loadChildren: () => import('./meat/meat.module').then( m => m.MeatModule),
      canActivate: []
    },
    {
      path: 'reproduction',
      loadChildren: () => import('./reproduction/reproduction.module').then( m => m.ReproductionModule),
      canActivate: []
    },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionRouting {}
