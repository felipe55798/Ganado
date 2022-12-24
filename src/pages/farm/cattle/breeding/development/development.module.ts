import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DevelopmentRoutingModule } from './development-routing.module';

@NgModule({
  imports: [
    DevelopmentRoutingModule
  ],
  declarations: [
    ],
  providers:[
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DevelopmentModule { }