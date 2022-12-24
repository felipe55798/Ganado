import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { SponsorRoutingModule } from './sponsor-routing.module';
import { SponsorComponent } from './sponsor.component';
import { FormComponent } from './form/form.component';
import { ISponsor } from 'src/pages/services/contracts/sponsor.interface';
import { SponsorService } from 'src/pages/services/sponsors/sponsor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    SponsorComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    SponsorRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, 
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [
    { provide: ISponsor, useClass: SponsorService },
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SponsorModule { }
