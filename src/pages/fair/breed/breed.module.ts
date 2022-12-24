import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreedRoutingModule } from './breed-routing.module';
import { BreedComponent } from './breed.component';
import { FormComponent } from './form/form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IBreed } from 'src/pages/services/contracts/breed.interface';
import { BreedService } from 'src/pages/services/breeds/breed.service';


@NgModule({
  declarations: [
    BreedComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    BreedRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, 
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  providers: [
    { provide: IBreed, useClass: BreedService },
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class BreedModule { }
