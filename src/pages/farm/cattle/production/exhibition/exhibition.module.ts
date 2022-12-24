import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ExhibitionRoutingModule } from './exhibition-routing.module';

@NgModule({
  imports: [
    ExhibitionRoutingModule
  ],
  declarations: [
    ],
  providers:[
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ExhibitionModule { }