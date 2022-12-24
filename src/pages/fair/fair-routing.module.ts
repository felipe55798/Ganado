import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FairComponent } from './fair.component';
import { AuctionComponent } from './auction/auction.component';
import { EventComponent } from './event/event.component';
import { StandComponent } from './stand/stand.component';


const routes: Routes = [
  {
    path: '',
    component: FairComponent
  },
  {
    path: 'auction',
    component: AuctionComponent
  },
  {
    path: 'event',
    component: EventComponent
  },
  {
    path: 'stand',
    component: StandComponent
  },
  {
    path: 'clasification',
    loadChildren: () => import('./clasifications/clasifications.module').then( m => m.ClasificationsModule),
    canActivate: []
  },
  {
    path: 'breed',
    loadChildren: () => import('./breed/breed.module').then( m => m.BreedModule),
    canActivate: []
  },
  {
    path: 'sponsor',
    loadChildren: () => import('./sponsor/sponsor.module').then( m => m.SponsorModule),
    canActivate: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FairRoutingModule {}
