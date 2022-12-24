import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { HistoryRoutingModule } from './history-routing.module';

@NgModule({
  imports: [
    HistoryRoutingModule
  ],
  declarations: [
    ],
  providers:[
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HistoryModule { }