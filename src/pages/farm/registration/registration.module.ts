import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import {MatRadioModule} from '@angular/material/radio';
import { TabViewModule } from 'primeng/tabview';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarComponent } from './calendar/calendar.component';
// import { IFair } from 'src/pages/services/contracts/fair.interface';
// import { FairService } from 'src/pages/services/fairs/fair.service';
import { ILote } from 'src/pages/services/contracts/lote.interface';
import { LoteService } from 'src/pages/services/lotes/lote.service';
import { IGlobalization } from 'src/pages/services/contracts/globalization.interface';
import { GlobalizationService } from 'src/pages/services/globalization/globalization.service';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
   dayGridPlugin,
]);

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    TabViewModule,
    FullCalendarModule
  ],
  declarations: [
    RegistrationComponent,
    CalendarComponent
  ],
  providers:[
    // { provide: IGlobalization, useClass: GlobalizationService },
    // { provide: IFair, useClass: FairService }
    // { provide: ILote, useClass: LoteService },
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistrationModule { }