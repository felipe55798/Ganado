import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { ICattleType } from '../../../services/contracts/cattleType.interface';
import { CattleTypeService } from '../../../services/cattlesType/cattle-type.service';

import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { AdminComponent } from './admin.component';
import { MatTabsModule} from '@angular/material/tabs';
import { SharedModule } from '../../../../app/shared/shared.module';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import {CalendarModule} from 'primeng/calendar';
import { ILote } from 'src/pages/services/contracts/lote.interface';
import { LoteService } from 'src/pages/services/lotes/lote.service';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    InputTextModule,
    MatTabsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule, 
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    CalendarModule
  ],
  declarations: [
    AdminComponent,
    FormComponent
  ],
  providers:[
    { provide: ICattleType, useClass: CattleTypeService },
    { provide: ILote, useClass: LoteService },
    MatDatepickerModule,
  ],

  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }