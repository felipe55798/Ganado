import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PensRoutingModule } from './pens-routing.module';
import { MaterialModule } from '../../../app/material/material.module';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { PensComponent } from './pens.component';
import { IPen } from 'src/pages/services/contracts/pens.interface';
import PenService from 'src/pages/services/pens/pen.service';
import {MatIconModule} from '@angular/material/icon';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { PaginatorModule } from 'primeng/paginator';
@NgModule({
  imports: [
    CommonModule,
    PensRoutingModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    PaginatorModule
  ],
  declarations: [
    PensComponent,
    FormComponent
  ],
  providers: [
    { provide: IPen, useClass: PenService },
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PensModule { }