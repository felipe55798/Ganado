import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Toast } from 'src/app/shared/models/toast';
import { NavegationService } from 'src/app/shared/services/navegation/navegation.service';
import { ParamsService } from 'src/providers';
import { Parameter } from '../../models/catalog';
import { Value } from '../../models/Value';
import { ICatalogs } from '../services/contracts/catalogs.interface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  formInsertMode: boolean = false;
  formEditMode: boolean = false;
  formViewMode: boolean = true;

  form!: FormGroup; 
  catalog!: Parameter;

  toast!: Toast;
  constructor(
    private formBuilder: FormBuilder,
    private paramService: ParamsService,
    private catalogService:ICatalogs,
    private snackBar: MatSnackBar,
    private navegationService: NavegationService,
  ) {}


  ngOnInit(): void {
    this.setDefaultToast();
    const catalog = this.paramService.Get('pages/config/catalogs/detail', 'catalog');
    this.buildForm();
    if(catalog){
      this.getCatalogById(catalog.id);
    }
  }
  setDefaultToast(){
    this.toast = {
      show: false,
      text: '',
      icon: '',
      color: ''
    };
  }
  getCatalogById(id: number){
    this.catalogService.getCatalogByID(id).subscribe(res=>{
      this.catalog = res.data as Parameter;
      // this.catalog.Values =  res.data.values;
      // this.catalog.Id = res.data.id;// Revisar a detalle TODO
      this.form.patchValue(this.catalog);
      if(this.catalog.values )
        this.setValuesFromArray( this.catalog.values );
    })
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      column: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      description: [ '',Validators.maxLength(500)],
      values: this.formBuilder.array([]),
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  /**
   * Crea un formGroupControl por cada valor que encuentre en el array
   * @param array, valores a agregar en el formulario.
   */
  setValuesFromArray(array: Value[]){
    this.values.clear();
    array.forEach((val)=>{
      const valueForm = this.formBuilder.group({
        id: [val.id ?? 0],
        code: [val.code, Validators.required],
        description: [val.description, Validators.required],
      });
      this.values.push(valueForm);
    });
  }

  //Documentation angular
  get values() {
    return this.form.controls['values'] as FormArray;
  }
  addValue() {
    const valueForm = this.formBuilder.group({
      id: [0],
      code: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.values.push(valueForm);
  }
  deleteValue(valueIndex: number) {
    const val=this.values.at(valueIndex)
    //Por si es un nuevo valor sin datos
    if((this.values?.value[valueIndex]?.code === '' 
    &&  this.values?.value[valueIndex]?.description === '')
    || this.values?.value[valueIndex]?.id === 0){
      this.values.removeAt(valueIndex);
    }else{
      let proceed = confirm(`¿Desea eliminar el valor con código: ${val.value.code} ?`);
      if (proceed) {
        this.catalogService.deleteValueOfCatalog(val.value.id).subscribe(res=>{
          if(res){
            this.values.removeAt(valueIndex);
            this.openSnackBar("Valor eliminado con éxito.","Ok");
          }
        });
      }
    }

  }

  editCatalog() {
    const catalog = this.form.value as Parameter;
    //Mandamos a guardar solo los valores tocados
    const valuesTouched = this.verifyTouchedValues();
    catalog.values = valuesTouched;
    if( this.form.valid){
      this.catalogService.updateCatalog(catalog).subscribe(res=>{
        if(res){
          this.catalog=res;
          this.form.patchValue(this.catalog);
          // this.catalog.values=res.data.ValuesCatalog;
          this.openSnackBar("Catálogo editado con éxito.","Ok");
          if(this.catalog.values){
            //para resetear los formControls y su touched
            this.setValuesFromArray(this.catalog.values);
          }
          this.viewMode();
        }
      },error =>{
         this.toast.show = true;
         this.toast.text = error.error.message;
         this.toast.icon = 'Info.svg';
         this.toast.color = '#FFFF00';
      });
    }
  }
  /**
   * Verificar los valores modificados para evitar enviarlos todos.
   */
  verifyTouchedValues(){
    const valuesForm =this.values;
    return valuesForm.controls.filter(element => element.touched )
            .map(el=>el.value) as Value[];
  }
  editMode() {
    this.formEditMode = true;
    this.formViewMode = false;
    this.formInsertMode = false;
  }
  viewMode(){
    this.formEditMode = false;
    this.formViewMode = true;
    this.formInsertMode = false;
    this.setDefaultToast();
  }

  goBackPage(){
    this.navegationService.navigate("pages/config/catalogs");
  }
  deleteCatalog(){
    const catalog = this.form.value as Parameter;
    let proceed = confirm(`¿Desea eliminar el caltálogo: ${catalog?.name} ?`);
    if (proceed) {
      if(catalog.id){
        this.catalogService.deleteCatalog(catalog.id).subscribe(res=>{
          if(res){
            this.openSnackBar(`Catálogo ${catalog?.name} eliminado con éxito.`,"Ok");
            this.goBackPage();
          }
        },error =>{
          console.log(error);
        });
      }
    }
  }
}
