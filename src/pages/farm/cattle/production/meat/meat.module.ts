import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MeatRoutingModule } from './meat-routing.module';

@NgModule({
  imports: [
    MeatRoutingModule
  ],
  declarations: [
    ],
  providers:[
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MeatModule { }