import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
/**
 * Servicio para mostrar ventanas de confirmación
 *
 * @export
 * @class Confirm
 */
@Injectable({
  providedIn: 'root',
})
export class Confirm {
  /**
   * @ignore
   */
  constructor(private dialog: MatDialog) {}
  /**
   * Método para mostrar un diálogo de confirmación
   * @param {Object} data - Data a mostrar en la ventana de confirmación: title, content y actions: {primary, secondary}
   * @returns 
   */
  public show(data: {
    title: string;
    content: string;
    actions?: {
      primary?: string;
      secondary?: string;
    };
  }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const dialogRef = this.dialog.open(ConfirmComponent, {
        disableClose: true,
        panelClass: 'modalax12789',
        maxHeight: '90vh',
        maxWidth: '600px',
        minWidth: '300px',
        width: '95%',
        data,
      });
      dialogRef.componentInstance.accion.subscribe(
        (accion: boolean) => {
          resolve(accion);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
