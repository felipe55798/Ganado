import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreedingComponent } from './breeding.component';
import { DevelopmentComponent } from './development/development.component';
import { DietComponent } from './diet/diet.component';


const routes: Routes = [
  {
    path:"",
    children: [
      {
        path: '',
        component: BreedingComponent
      },
      {
        path: 'development',
        loadChildren: () => import('./development/development.module').then( m => m.DevelopmentModule),
        canActivate: []
      },
      {
        path: 'diet',
        loadChildren: () => import('./diet/diet.module').then( m => m.DietModule),
        canActivate: []
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BreedingRoutingModule {}
