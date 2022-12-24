import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentType } from 'src/models/hacienda/documentType';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form!: FormGroup;
  formInsertMode: boolean = false;
  formEditMode: boolean = false;
  formViewMode: boolean = false;
  documentTypeList!: DocumentType[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<FormComponent>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formInsertMode = this.data?.insertMode;
    this.formEditMode = this.data?.editMode;
    this.buildForm();
    this.form.patchValue(this.data?.sponsor);
    this.documentTypeList = [
      {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'Cédula de ciudadanía',
      }
    ];
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

  buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      lastName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      address: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      documentNumber: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(10)]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      fkDocumentTypePerson: [
        '',
        Validators.compose([Validators.required, Validators.required]),
      ],
      active: [true],
    });
  }

}
