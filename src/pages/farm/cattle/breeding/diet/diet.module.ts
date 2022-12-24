import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import modules
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DietComponent } from './diet.component';
import { CommonModule } from '@angular/common';

FullCalendarModule.registerPlugins([
    interactionPlugin, dayGridPlugin]);
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FullCalendarModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [DietComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DietModule {}