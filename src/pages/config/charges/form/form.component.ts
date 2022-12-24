import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Parameter } from '../../models/catalog';
import { TypeZone } from '../../models/zone-type';
import { ICatalogs } from '../../segmentation-catalogs/services/contracts/catalogs.interface';
import { ICharge } from '../services/contracts/charge.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  formInsertMode: boolean = false;
  formEditMode: boolean = false;
  formViewMode: boolean = false;
  
  catalogsArray: Parameter[] = [] ;
  selectedCatalogs: any = [];
  zoneTypes!: TypeZone[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormComponent>,
    private cdRef:ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private catalogService: ICatalogs,
    private chargeService: ICharge,

  ) {
    this.dialogRef.disableClose = true;
  }
  
  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
  
  ngOnInit(): void {
    this.getAllParameters();
    this.getZones()
    this.formInsertMode = this.data?.insertMode;
    this.formViewMode = this.data?.viewMode;
    this.formEditMode = this.data?.editMode;
    this.buildForm2();
    // this.form.patchValue(this.data?.charge);
    // this.setValuesFromArray(this.catalogsArray);
  }
  getZones() {
    this.chargeService.getZoneTypes().subscribe((res) => {
      if (res) {
        this.zoneTypes = res.data;
      }
    });
  }
  getAllParameters(){
    this.catalogService.getCatalogs().subscribe(
      res=>{
        if(res){
          this.catalogsArray=res.data;
          this.buildForm();
        }
      }
    );
  }
  buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(1)
        ]),
      ],
      code: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(1)
        ]),
      ],
      visitsperday: [
        '',
        Validators.compose([
          Validators.required,
          Validators.max(100),
          Validators.min(1)
        ]),
      ],
      maxvisitsperday: [
        '',
        Validators.compose([
          Validators.required,
          Validators.max(100),
          Validators.min(1),
        ]),
      ],
      poctime: ['',
      Validators.compose([
          Validators.required,
          Validators.max(100),
          Validators.min(1),
        ]),
      ],
      daysperweek: ['',
     [
          Validators.required,
          Validators.max(100),
          Validators.min(1),
        ],
      ],
      zonetypeId: ['', Validators.required],
      catalogs: this.formBuilder.array(this.catalogsArray.map(x => false))
      // catalogs:[this.formBuilder.array([])]
    });
  }
  buildForm2() {
    this.form = this.formBuilder.group({
      id: [''],
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(1)
        ]),
      ],
      code: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(1)
        ]),
      ],
      visitsperday: [
        '',
        Validators.compose([
          Validators.required,
          Validators.max(100),
          Validators.min(1)
        ]),
      ],
      maxvisitsperday: [
        '',
        Validators.compose([
          Validators.required,
          Validators.max(100),
          Validators.min(1),
        ]),
      ],
      poctime: ['',
      Validators.compose([
          Validators.required,
          Validators.max(100),
          Validators.min(1),
        ]),
      ],
      daysperweek: ['',
     [
          Validators.required,
          Validators.max(100),
          Validators.min(1),
        ],
      ],
      zonetypeId: ['', Validators.required],
      catalogs:[this.formBuilder.array([])]
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
  /**
   * Evalua el form y cierra el modal o no, en función de éste.
   */
  save(){
    this.getSelectedParameters();
    const {value, valid} = this.form;
    // console.log(this.selectedCatalogs);
    if(valid){
      if( this.selectedCatalogs.length > 0){
        value.catalogs = [...this.selectedCatalogs];
        //Todos los parametros seleccionados arrancan con values []
        value.catalogs.forEach((ele: Parameter) => {
          ele.values = [];      
        });
      }else{
        value.catalogs = [];
      }
      this.dialogRef.close(value);
    }else{
      this.form.markAllAsTouched();
    }
  }
  /**
   * Obtiene los parámetros seleccionados de la lista check.
   */
  getSelectedParameters(){
    this.selectedCatalogs = [];
    const lengthParameters = this.form.value.catalogs.length;
    if(lengthParameters > 0){
      for (let index = 0; index < lengthParameters; index++) {
        const element = this.form.controls['catalogs'].value[index];
        if(element){
          this.selectedCatalogs.push(this.catalogsArray[index])
        }
      }
    }
  }
}
