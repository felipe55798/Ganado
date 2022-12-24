import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FairComponent } from './fair.component';
import { FairRoutingModule } from './fair-routing.module';
import { AuctionComponent } from './auction/auction.component';
import { EventComponent } from './event/event.component';
import { StandComponent } from './stand/stand.component';

@NgModule({
  imports: [
    FairRoutingModule,
    InputTextModule,
    DropdownModule
  ],
  declarations: [FairComponent,
    AuctionComponent,
    EventComponent,
    StandComponent
],
  providers:[
  ]
})
export class FairModule { }