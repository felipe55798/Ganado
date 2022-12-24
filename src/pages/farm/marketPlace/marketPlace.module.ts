import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MarketPlaceRouting } from './marketPlace-routing.module';

@NgModule({
  imports: [
    MarketPlaceRouting,
    InputTextModule,
    DropdownModule
  ],
  declarations: [
],
  providers:[
  ]
})
export class MarketPlaceModule { }