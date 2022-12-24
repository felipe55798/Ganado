import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MonitoringRoutingModule } from './monitoring-routing-module';

@NgModule({
  imports: [
    MonitoringRoutingModule
  ],
  declarations: [
    ],
  providers:[
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MonitoringModule { }
