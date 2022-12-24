import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Toast } from 'src/app/shared/models/toast';
import { ParamsService } from 'src/providers';
import { Charge } from '../../models/charges/charge';
import { ICharge } from '../services/contracts/charge.interface';
import { ListCheckParametersComponent } from '../list-check-parameters/list-check-parameters.component';
import { Parameter } from '../../models/catalog';
import { map, Observable, of } from 'rxjs';
import { Combination } from '../../models/combination/combination';
import { ICatalogs } from '../../segmentation-catalogs/services/contracts/catalogs.interface';
import { ICombination } from '../services/contracts/combination.interface';

@Component({
  selector: 'app-combination',
  templateUrl: './combination.component.html',
  styleUrls: ['./combination.component.scss'],
})
export class CombinationComponent implements OnInit {
  @Input() formInsertMode: boolean = false;
  @Input() formEditMode: boolean = false;
  @Input() formViewMode: boolean = true;

  form!: FormGroup;
  charge!: Charge;
  toast!: Toast;

  frequencies: Observable<any[]> = of([]);
  // parametersArray: Parameter[] = [];
  @Input() combination!: Combination;
  @Input() idChargeDad!: number;
  @Input() indexCombination: number = 0;
  @Output() outCombinationDeleted = new EventEmitter<number>();
  constructor(
    private formBuilder: FormBuilder,
    private paramService: ParamsService,
    private chargeService: ICharge,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private catalogService: ICatalogs,
    private combinationService: ICombination
  ) {}
  ngOnInit(): void {
    this.getFrecuencies();
    this.setDefaultToast();
    this.buildForm();
    this.form.patchValue(this.combination);
    this.form.controls['FrecuencyId'].setValue(
      this.combination?.frequencyid?.id ?? ''
    );
    if (!this.combination.agrupado) {
      //Armar el array de parametros con sus respectivos valores
      this.setArrayValuesByParam();
      //recorre el array de Parametros, crea los formArray y  agrega sus valores
      this.setDefaultParameters();
    } else {
      this.combination.parmascombination = this.combination.Parameters;
      this.setDefaultParametersAgrupado();
    }
  }

  /**
   * Reduce los parametros repetidos y agrupa sus respectivos valores como arrays
   */
  setArrayValuesByParam() {
    //parametros combinados
    const combinedParameters = this.combination.parmascombination;
    if (combinedParameters) {
      //SACO PARAMETROS SIN REPETIR
      const uniqueParameters = combinedParameters.reduce((accum, current) => {
        if (
          !accum.find((el: any) => el.parameterid.id === current.parameterid.id)
        ) {
          current.id = current.parameterid.id;
          current.name = current.parameterid?.name;
          current.description = current.parameterid?.description;
          accum.push(current);
        }
        return accum;
      }, []);

      //Por cada parámetro le agrego todos los valores que coincidan de la lista Combinada.
      uniqueParameters.forEach((element: any) => {
        element.values = combinedParameters
          ?.filter((param) => param.parameterid.id === element.parameterid.id)
          ?.map((p) => p.valueid);
      });
      //Le agrego los parametros ya agrupados y con sus valores a la Combination
      this.combination.parmascombination = uniqueParameters;
    }
  }

  /**
   * Recorre los valores ya agrupados y crear form array agregando sus valores
   */
  setDefaultParameters() {
    if (this.combination.parmascombination) {
      this.combination.parmascombination.forEach(
        (param: any, index: number) => {
          //Llamado para obtener lista de valores que se va a listar en select por cada value del parametro
          this.catalogService
            .getCatalogByID(param.parameterid?.id)
            .subscribe((res) => {
              if (res) {
                // console.log('completo llega:', res);
                const newParam = this.newParameter(param);
                if (newParam) {
                  this.parameters().push(newParam);
                  this.enabledValuesByParam().push(
                    this.newArrayValuesByParam(param.id, res.data.values)
                  );
                }
              }
            });
        }
      );
    }
  }
  setDefaultParametersAgrupado() {
    if (this.combination.parmascombination) {
      this.combination.parmascombination.forEach(
        (param: any, index: number) => {
          //Llamado para obtener lista de valores que se va a listar en select por cada value del parametro
          this.catalogService
            .getCatalogByID(param?.id)
            .subscribe((res) => {
              if (res) {
                // console.log('completo llega:', res);
                const newParam = this.newParameter(param);
                if (newParam) {
                  this.parameters().push(newParam);
                  this.enabledValuesByParam().push(
                    this.newArrayValuesByParam(param.id, res.data.values)
                  );
                }
              }
            });
        }
      );
    }
  }

  setDefaultToast() {
    this.toast = {
      show: false,
      text: '',
      icon: '',
      color: '',
    };
  }
  buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      FrecuencyId: ['', Validators.required],
      FrecuencyName: [],
      Parameters: this.formBuilder.array([]),
      //en dada posición va la lista de valores que se podran agregar(mat-select)
      listSelectByParameter: this.formBuilder.array([]),
    });
  }

  //Lista de valores que se pinta para agregar uno o cambiarlo en el parametro
  enabledValuesByParam(): FormArray {
    return this.form.get('listSelectByParameter') as FormArray;
  }
  getEnabledListValuesByParam(paramIndex: number): FormArray {
    return this.enabledValuesByParam()
      .at(paramIndex)
      .get('valores') as FormArray;
  }
  //formGroup
  newArrayValuesByParam(idParam: number, enabledValues: any[]): FormGroup {
    return this.formBuilder.group({
      id: [idParam ?? '-/'],
      valores: [enabledValues ?? []],
    });
  }
  removeListValuesByParam(empIndex: number) {
    this.enabledValuesByParam().removeAt(empIndex);
  }

  parameters(): FormArray {
    return this.form.get('Parameters') as FormArray;
  }
  /**
   * Nueva instancia de Parameter que tiene a su vez otro formArray de Valores
   * @returns
   */
  newParameter(param: Parameter): FormGroup {
    return this.formBuilder.group({
      id: [param.id ?? ''],
      name: [param.name ?? ''],
      column: [param.column ?? ''],
      description: [param.description ?? ''],
      values: this.formBuilder.array(
        param.values?.map((val) => {
          return this.formBuilder.group({
            id: [val.id ?? ''],
            code: [val.code ?? ''],
            description: [val.description ?? ''],
          });
        }) ?? []
      ),
    });
  }

  /**
   * Define los parametros que se van a agregar de la lista
   */
  setSelectedParameters() {
    const dialog = this.dialog.open(ListCheckParametersComponent, {
      width: '850px',
      data: {
        insertMode: true,
        parameters: this.parameters().value,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      // console.log(result, result?.parameters?.length);
      if(result){
        if (result?.parameters?.length > 0) {
          this.deleteParametersDeselected(result.parameters);
          this.addParametersSelected(result.parameters);
        } else {
          this.parameters().clear();
          this.enabledValuesByParam().clear();
        }
      }
    });
  }
  //si no está en los parametros iniciales antes de abrir el modal checks lo borrro del form
  deleteParametersDeselected(arraySelecteds: any[]) {
    //recorro los params que tengo
    this.parameters().value.forEach((ele: any, index: number) => {
      //si dentro de los seleccionados no se encuentra el que tenia, lo quitó
      if (!arraySelecteds.find((el) => ele.id === el.id)) {
        this.removeParameter(index);
        this.removeListValuesByParam(index);
      }
    });
  }
  addParametersSelected(arraySelecteds: any[]) {
    arraySelecteds.forEach((param: Parameter) => {
      if (!this.parameters().value.find((el: any) => el.id === param.id)) {
        const newParam = this.newParameter(param);
        this.catalogService
          .getCatalogByID(newParam.value.id)
          .subscribe((res) => {
            if (res) {
              // console.log('completo llega:', res);
              // const newParam = this.newParameter(param);
              if (newParam) {
                //Agrega formControl al formArray de parametros
                this.parameters().push(newParam);
                //Agrega la lista que desplegara el select de los valores del parametro agregado
                this.enabledValuesByParam().push(
                  this.newArrayValuesByParam(newParam.value.id, res.data.values)
                );
              }
            }
          });
      }
    });
  }

  removeParameter(empIndex: number) {
    this.parameters().removeAt(empIndex);
  }

  //Values Form array
  valuesOfParameter(paramIndex: number): FormArray {
    return this.parameters().at(paramIndex).get('values') as FormArray;
  }
  newValue(): FormGroup {
    return this.formBuilder.group({
      id: ['', Validators.required],
      code: [''],
      description: [''],
    });
  }
  //agregar un nuevo valor Vacio a cierto parametro del form
  addValueToParameter(paramIndex: number) {
    this.valuesOfParameter(paramIndex).push(this.newValue());
  }
  //eliminar valor de cierto parameter
  removeParameterSkill(paramIndex: number, skillIndex: number) {
    this.valuesOfParameter(paramIndex).removeAt(skillIndex);
  }

  editMode() {
    this.formEditMode = true;
    this.formViewMode = false;
    this.formInsertMode = false;
  }
  viewMode() {
    this.formEditMode = false;
    this.formViewMode = true;
    this.formInsertMode = false;
    this.setDefaultToast();
  }

  //Evalua si es primera vez y dependiendo guarda o edita
  save() {
    if (this.form.valid) {
      if (this.combination.id === -1) {
        //si es primera vez
        this.createCombination();
      } else {
        this.editCombination();
      }
    } else {
      this.openSnackBar(
        'Campos vacios, por favor complete todos los valores y parametros.',
        'Ok',
        'red-snackbar'
      );
    }
  }

  createCombination() {
    const modelCreation = this.setModelCreationCombination(
      this.parameters().value
    );
    this.combinationService.createCombination(modelCreation).subscribe(
      (res) => {
        if (res) {
          this.openSnackBar('Combinación registrada con éxito.', 'Ok');
          this.combination.id = res.data.id;
          this.form.controls['id'].setValue(this.combination.id ?? '');
          this.viewMode();
        }
      },
      (error) => {
        console.log(error);
        this.openSnackBar('No se pudó crear: ' + error.error.message, 'Ok');
      }
    );
  }

  editCombination() {
    const modelCreation = this.setModelEditionCombination(
      this.parameters().value
    );
    this.combinationService
      .editCombination(modelCreation, this.idChargeDad)
      .subscribe(
        (res) => {
          if (res) {
            // this.charge = res;
            // this.form.patchValue(this.charge);
            // this.charge.Combinations = res.data.Combinations;
            this.openSnackBar(
              'Combinación editado con éxito.',
              'Ok',
            );
            this.viewMode();
          }
        },
        (error) => {
          this.toast.show = true;
          this.toast.text = error.error.message;
          this.toast.icon = 'Info.svg';
          this.toast.color = '#FFFF00';
        }
      );
  }

  openSnackBar(
    message: string,
    action: string,
    classColor: string = 'default-snackbar'
  ) {
    this.snackBar.open(message, action, {
      panelClass: [classColor],
    });
  }
  /**
   * Moldelo para crear Combinaciones
   * @param parameters, parametros que se combinaran con sus valores.
   * @returns modelo requerido por back pra crear y editar combinaión.
   */
  setModelCreationCombination(parameters: Parameter[]) {
    let parmascombination: any = [];
    parameters.forEach((param) => {
      let model: any = {};
      param.values?.forEach((val) => {
        model = {};
        model.parameterid = param.id;
        model.valueid = val.id;
        parmascombination.push(model);
      });
    });
    return {
      positionid: this.idChargeDad,
      frequencyId: this.form.value.FrecuencyId,
      parmascombination: parmascombination,
    };
  }

  setModelEditionCombination(parameters: Parameter[]) {
    let parmascombination: any = [];
    parameters.forEach((param) => {
      let model: any = {};
      param.values?.forEach((val) => {
        model = {};
        model.parameterid = param.id;
        model.valueid = val.id;
        model.combinationid = this.combination.id;
        model.id = ''; //error de back toca enviarselo
        parmascombination.push(model);
      });
    });
    return {
      combinationid: this.combination.id,
      positionid: this.idChargeDad,
      frequencyId: 1,
      parmascombination: parmascombination,
    };
  }

  getFrecuencies() {
    this.frequencies = this.chargeService
      .getFrecuencies()
      .pipe(map((res) => res.data));
  }
  deleteCombination() {
    let proceed = confirm(`¿Desea eliminar la combinación ?`);
    if (proceed) {
      this.combinationService
        .deleteCombination(this.idChargeDad, this.combination.id!)
        .subscribe((res) => {
          if (res) {
            this.outCombinationDeleted.emit(this.indexCombination);
          }
        });
    }
  }
}
