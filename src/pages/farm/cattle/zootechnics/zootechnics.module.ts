import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';
import { ZootechnicsRoutingModule } from './zootechnics-routing.module';
import { AppointmentComponent } from './appointment/appointment.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  imports: [
    ZootechnicsRoutingModule,
    InputTextModule,
    TabViewModule
  ],
  declarations: [
    HistoryComponent,
    ],
  providers:[
  ]
})
export class ZootechnicsModule { }