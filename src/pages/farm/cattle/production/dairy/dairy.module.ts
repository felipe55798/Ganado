import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DairyRoutingModule } from './dairy-routing.module';

@NgModule({
  imports: [
    DairyRoutingModule
  ],
  declarations: [
    ],
  providers:[
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DairyModule { }