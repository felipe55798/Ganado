import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasificationsRoutingModule } from './clasifications-routing.module';
import { ClasificationsComponent } from './clasifications.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormComponent } from './form/form.component';
import { IClasificacion } from 'src/pages/services/contracts/clasification.interface';
import { ClasificationService } from 'src/pages/services/clasifications/clasification.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ClasificationsComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ClasificationsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, 
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  providers: [
    { provide: IClasificacion, useClass: ClasificationService },
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ClasificationsModule { }
