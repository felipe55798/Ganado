import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  SimpleChanges,
  OnChanges
} from '@angular/core';

@Component({
  selector: 'app-file-chooser',
  templateUrl: './file-chooser.component.html',
  styleUrls: ['./file-chooser.component.scss'],
})
export class FileChooserComponent implements OnInit, OnChanges {
  @ViewChild('ref') ref!: ElementRef;
  /**
   * Emite el archivo seleccionado
   */
  @Output() files = new EventEmitter<any>();

  @Input() limpiar!: boolean;
  /**
   * Indica el id del adjunto, en caso de tener se mostrará la opción de descargarlo de back
   */
  @Input() idAdjunto!: string;
  /**
   * Indica los tipos de archivos aceptados por el componente, exactamente igual a como se le pasan a un input de tipo file
   */
  @Input() accept!: string;

  /**
   * Indica la url de donde se descargará el archivo, debe ser una url que reciba el id adjunto al final: http:localhost:8080/api/download/{idAdjunto}
   */
  @Input()
  urlDownload!: string; //example: ${environment.urlHVBack}/adjunto/download/id/
  archivos: File[] | null = null;
  @Input() title!: string;

  constructor() {}

   ngOnInit(): void {
    if (!this.accept) {
      this.accept = '.csv,.xlsx';
    }
  }

  emitirArchivo($event: any) {
    this.archivos = $event?.target?.files;
    const estado = this.validarExtensiones();
    if (estado) {
      if (this.archivos) {
        if (this.archivos?.length > 1) {
          this.files.emit(this.archivos);
        } else {
          if (this.archivos.length === 1) {
            this.files.emit(this.archivos[0]);
          } else {
            this.files.emit(null);
          }
        }
      } else {
        this.files.emit(null);
      }
    } else {
      let extensiones = '';
      this.accept.split(',').forEach((extension) => {
        extensiones = extensiones + extension.split('/')[1] + ', ';
      });
      extensiones = extensiones.slice(0, extensiones.length - 2);
      alert(`El tipo de archivo seleccionado no cumple con los requeridos seleccione:${extensiones}`);
      this.archivos = null;
      this.files.emit(this.archivos);
    }
  }

  validarExtensiones() {
    let condition = true;
    if (this.archivos) {
      Array.prototype.every.call(this.archivos.length, (file) => {
        if (
          !(file.type && file.type !== '' && this.accept.includes(file.type))
        ) {
          condition = false;
        }
        return condition;
      });
      return condition;
    } else {
      return condition;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['limpiar']) {
      this.archivos = null;
      this.files.emit(this.archivos);
      if (this.ref) {
        this.ref.nativeElement.value = '';
      }
    }
  }
}
