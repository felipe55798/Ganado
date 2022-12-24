import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<FormComponent>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formInsertMode = this.data?.insertMode;
    this.formEditMode = this.data?.editMode;
    this.buildForm();
    this.form.patchValue(this.data?.clasification);
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
      description: [ '',Validators.maxLength(500)],
      ageRange: [
        '',
        Validators.compose([
          Validators.required,
          Validators.max(100),
          Validators.min(1)
        ]),
      ],
      active: [true],
    });
  }

}
