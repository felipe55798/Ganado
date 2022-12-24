import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { GrassType } from 'src/models/hacienda/grassType';
import { Group } from 'src/models/hacienda/group';
import { LandType } from 'src/models/hacienda/landType';
import { IPen } from 'src/pages/services/contracts/pens.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  formInsertMode: boolean = false;
  formEditMode: boolean = false;
  grassTypes!: GrassType[];
  landTypes!: LandType[];
  groups!: Group[];
  selectedTypeGrass = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormComponent>,
    private formBuilder: FormBuilder,
    private penService: IPen
  ) {}

  ngOnInit(): void {
    this.formInsertMode = this.data?.insertMode;
    this.formEditMode = this.data?.editMode;
    this.buildForm();
    this.form.patchValue(this.data?.pen);
    this.getGrassTypes();
    this.getLandTypes();
    this.getGroups();
    // this.form.controls['fkGrassTypes'].valueChanges.subscribe((val) => {
    //   if (val) {
    //     this.form.controls['typeOfGrass'].setValue('');
    //   }
    // });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      size: ['', Validators.compose([Validators.required, Validators.min(0)])],
      typeOfGrass: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      quantity: [
        '',
        Validators.compose([
          Validators.required,
          Validators.required,
          Validators.min(0),
        ]),
      ],
      lote: ['', Validators.compose([Validators.required, Validators.min(0)])],
      team: ['', Validators.compose([Validators.required, Validators.min(0)])],
      location: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      coordinate: [''],
      loteType: ['', Validators.required],
      active: [true],
      fkLandTypes: [
        '',
        Validators.compose([Validators.required, Validators.required]),
      ], 
      fkGrassTypes: [
        '',
        Validators.compose([Validators.required, Validators.required]),
      ],
      fkGroups: [
        '',
        Validators.compose([Validators.required, Validators.required]),
      ], 
    });
  }
  getGrassTypes() {
    this.penService.getGrassTypes(1, 100).subscribe((res) => {
      if (res) {
        this.grassTypes = res.data;
      }
    });
  }
  getLandTypes() {
    this.penService.getLandTypes(1, 100).subscribe((res) => {
      if (res) {
        this.landTypes = res.data;
      }
    });
  }
  getGroups() {
    this.penService.getGroups(1, 100).subscribe((res) => {
      if (res) {
        this.groups = res.data;
      }
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

  selectedValue(event: MatSelectChange) {
    this.form.controls['typeOfGrass'].setValue(event.source.triggerValue);
  }
}
