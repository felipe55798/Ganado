import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { VaccinationRoutingModule } from './vaccination-routing.module';

@NgModule({
  imports: [
    VaccinationRoutingModule
  ],
  declarations: [
    ],
  providers:[
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class VaccinationModule { }
