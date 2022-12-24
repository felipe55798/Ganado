import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { AttentionComponent } from './attention/attention.component';
import { BirthComponent } from './birth/birth.component';
import { InseminationComponent } from './insemination/insemination.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { SterilizationComponent } from './sterilization/sterilization.component';
import { VaccinationComponent } from './vaccination/vaccination.component';

@NgModule({
  imports: [
    AppointmentRoutingModule
  ],
  declarations: [
    AttentionComponent,
    BirthComponent,
    InseminationComponent,
    MonitoringComponent,
    SterilizationComponent,
    VaccinationComponent
    ],
  providers:[
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppointmentModule { }