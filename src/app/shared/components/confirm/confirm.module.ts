import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [ConfirmComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  exports: [ConfirmComponent],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ConfirmModule {}
