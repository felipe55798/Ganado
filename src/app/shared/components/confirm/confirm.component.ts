import {
  Component,
  EventEmitter,
  Inject,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  @Output() accion = new EventEmitter<boolean>(); //
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
      actions?: {
        primary?: string | undefined;
        secondary?: string | undefined;
      };
    }
  ) {}

  aceptar() {
    this.accion.emit(true);
  }

  cancelar() {
    this.accion.emit(false);
  }
}
