import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { sterilizationRoutingModule } from './sterilization-routing.module';

@NgModule({
  imports: [
    sterilizationRoutingModule
  ],
  declarations: [
    ],
  providers:[
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SterilizationModule { }