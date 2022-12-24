import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Parameter } from '../../models/catalog';
import { ICatalogs } from '../../segmentation-catalogs/services/contracts/catalogs.interface';

@Component({
  selector: 'app-list-check-parameters',
  templateUrl: './list-check-parameters.component.html',
  styleUrls: ['./list-check-parameters.component.scss'],
})
export class ListCheckParametersComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  formInsertMode: boolean = false;
  formEditMode: boolean = false;
  formViewMode: boolean = false;

  //Todos los parametros que se pintaran com check
  allParameters: Parameter[] = [];

  //parámetros iniciales que arrancan seleccionados desde la combinación
  @Input() selectedParameters: Parameter[] = [];
    // { id: 2, column: '0221', name: 'Canal2', description: 'Nivel del Poc' },
    // { id: 3, column: '0221', name: 'Canal3', description: 'Nivel del Poc' },

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ListCheckParametersComponent>,
    private cdRef: ChangeDetectorRef,
    private catalogService: ICatalogs,
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.getAllParameters();
    //por si no se manda en template sino como modal
    if (this.data?.parameters) this.selectedParameters = this.data.parameters;
    this.buildForm();


  }
  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
  buildForm() {
    this.form = this.formBuilder.group({
      // parameters: this.formBuilder.array(this.allParameters.map(x => false))
      parameters: this.formBuilder.array([]),
    });
  }

  /**
   * Obtiene los parámetros seleccionados a partir de la lista check catalogs.
   */
  getSelectedParameters() {
    this.selectedParameters = [];
    const lengthParameters = this.form.value.parameters.length;
    if (lengthParameters > 0) {
      for (let index = 0; index < lengthParameters; index++) {
        const element = this.form.controls['parameters'].value[index];
        if (element) {
          this.selectedParameters.push(this.allParameters[index]);
        }
      }
    }
  }

  get parameters() {
    return this.form.controls['parameters'] as FormArray;
  }

  /**
   * Filtra y marca (selected:true) los parametros seleccionados entre la lista de todos los
   *  parámetros
   */
  markSelectedParameters() {
    this.allParameters.forEach((el) => {
      if (this.selectedParameters.find((selected) => el.id === selected.id)) {
        el.selected = true;
      }
    });
  }
  /**
   * Recorre lista de todos los parametros, y crea los formControl si llaga alguno como seleccionado desde antes.
   * @param array lista de parametros que se van a pintar como checkBox
   */
  setValuesFromArray(array: any[]) {
    this.parameters.clear();
    array.forEach((val) => {
      let value = false;
      if (val.selected) {
        value = true;
      }
      this.parameters.push(new FormControl(value));
    });
  }

  /**
   * Obtiene los parametros seleccionados finalmente y lños envia al componente padre de este modal
   */
  save() {
    this.getSelectedParameters();
    const { value, valid } = this.form;
    if (valid) {
      if (this.selectedParameters) {
        value.parameters = [...this.selectedParameters];
        this.dialogRef.close(value);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  getAllParameters(){
    this.catalogService.getCatalogs().subscribe(
      res=>{
        if(res){
          this.allParameters=res.data;
          this.setInitialBehavior();
        }
      }
    );
  }
  setInitialBehavior(){
    if (this.selectedParameters.length > 0) {
      this.markSelectedParameters();
    }
    this.setValuesFromArray(this.allParameters);
  }
}
