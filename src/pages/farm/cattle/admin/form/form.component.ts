import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Cattle } from 'src/models/hacienda/cattle';
import { Lote } from 'src/models/hacienda/lote';
import { ICattle } from 'src/pages/services/contracts/cattle.interface';
import { ICattleType } from 'src/pages/services/contracts/cattleType.interface';
import { ILote } from 'src/pages/services/contracts/lote.interface';
import { CattleType } from '../../../../../models/hacienda/cattleType';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form!: FormGroup;
  formInsertMode: boolean = false;
  formEditMode: boolean = false;
  today = new Date();
  lotes: Lote[] = [];
  cattleTypes!: CattleType[];
  cattlesFather!: Cattle[];
  cattlesMother!: Cattle[];




  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<FormComponent>,
  private formBuilder: FormBuilder,
  private cattleService: ICattle,
  private cattleTypeService: ICattleType,
  private loteService: ILote,
) { }

  ngOnInit(): void {
    this.formInsertMode = this.data?.insertMode;
    this.formEditMode = this.data?.editMode;
    this.buildForm();
    this.getAllCattleTypes();
    this.getAllCattles({});
    this.getAllLotes();
    if(this.formEditMode){
      this.data.cattle.dateOfBirth = new Date(this.data?.cattle.dateOfBirth);
    }
    this.form.patchValue(this.data?.cattle);
  }

  getAllCattleTypes(){
    this.cattleTypeService
    .getCattleTypeByPage(1, 50)
    .subscribe((res) => {
      this.cattleTypes = res.data.filter((el: CattleType) => el.active);
    });
  }
  getAllLotes(){
    this.loteService
    .getLotesByPage(1, 50)
    .subscribe((res) => {
      this.lotes = res.data.filter((el: CattleType) => el.active);
    });
  }
  getAllCattles(paginated: any) {
    this.cattleService
      .getAllCattlesByPage(paginated?.page ?? 1, paginated?.pageSize ?? 50)
      .subscribe((res) => {
        this.cattlesFather = res.data?.filter((el: CattleType) => el.active) ?? [];
        this.cattlesMother = this.cattlesFather ?? [];
      });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      dateOfBirth: [ this.today, Validators.required,],
      active: [true],
      fkLotes: [
        '',
        Validators.compose([Validators.required, Validators.required]),
      ], 
      chipCode: [0, Validators.compose([Validators.required, Validators.min(0)])],
      fkCattleTypes: [
        '',
        Validators.compose([Validators.required, Validators.required]),
      ],
      fkCattlesFather: [
        '',
        Validators.compose([Validators.required, Validators.required]),
      ],
      fkCattlesMother: [
        '',
        Validators.compose([Validators.required, Validators.required]),
      ], 
    });
  }
  closeDialog() {
    this.dialogRef.close(false);
  }

  save() {
    const { value, valid } = this.form;
    if (valid) {
      this.dialogRef.close(value);
    } else {
      this.form.markAllAsTouched();
    }
  }

}
