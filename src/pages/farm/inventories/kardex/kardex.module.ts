import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { KardexRoutingModule } from './kardex-routing.module';

@NgModule({
  imports: [
    KardexRoutingModule
  ],
  declarations: [
    ],
  providers:[
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class KardexModule { }