import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from '../../../app/shared/shared.module';
import { MaterialModule } from '../../../app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListModule } from '../list/list.module';
import { CustomersComponent } from './customers/customers.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';

import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';

import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    CustomersComponent,
    FormComponent,
    TableComponent,
  ],
  imports: [
    CustomersRoutingModule,
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ListModule,
    GoogleMapsModule,
    MatExpansionModule,
    TableModule,
    CalendarModule,
    MultiSelectModule,
    InputTextModule,
    ProgressBarModule,
    DropdownModule,
    ToastModule,
    SliderModule,
    DialogModule,
    ButtonModule,
    ContextMenuModule,

  ],
  providers: [
    //{provide: ICatalogs, useClass: CatalogsService }
  ]
})
export class CustomersModule { }
