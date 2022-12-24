import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { csvToJSON } from 'src/app/shared/utils/csvTextToJson';
import { jsonHasProperties } from 'src/app/shared/utils/jsonHasProperties';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterViewInit{
  form!: FormGroup;
  formInsertMode: boolean = false;
  formEditMode: boolean = false;
  formViewMode: boolean = false;
  cleanFiles = true;
  // nameSelectedFile: string ='';
  selectedFile: any;
  propertiesCSV = ["Codigo","Descripcion"];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormComponent>,
    private formBuilder: FormBuilder,
    private cdRef:ChangeDetectorRef,
  ) {
    this.dialogRef.disableClose = true;
  }
  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.formInsertMode = this.data?.insertMode;
    this.formViewMode = this.data?.viewMode;
    this.formEditMode = this.data?.editMode;
    
    this.buildForm();
    this.form.patchValue(this.data?.catalog);
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
      description: [ '',Validators.maxLength(500),],
      values: [[]],
      csvFile: [null, [Validators.required]],
    });
    if (this.formViewMode) {
      this.form.disable();
    }
  }

  save() {
    const {value, valid} = this.form;
    if(valid){
      this.dialogRef.close(value);
    }else{
      this.form.markAllAsTouched();
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  deleteNameFileSelected(){
    this.cleanFiles = !this.cleanFiles;
    this.selectedFile = {};
    this.cdRef.detectChanges();
  }
  getCSV(file: File) {
    if (file) {
      if (
        file.type === "text/csv" ||
        file.type === "text/x-csv" ||
        file.type === "text/plain" ||
        file.type === "application/vnd.ms-excel" ||
        file.type === "application/csv" ||
        file.type === "application/x-csv" ||
        file.type === "text/comma-separated-values" ||
        file.type === "text/x-comma-separated-values"
      ) {
        this.form.controls['csvFile'].setErrors(null);
        const reader = new FileReader();
        reader.readAsText(file);
        // console.log(file);
        reader.onload = () => {
          let data = csvToJSON(reader.result);
          // console.log(data);

          let error = false;
          if (data?.length === 0) {
            // No hay datos
            this.form.controls['csvFile'].setErrors({
              noRows: "El archivo seleccionado no tiene datos.",
            });
          }

          for (const value of data) {
            if (!jsonHasProperties(value, this.propertiesCSV) ) {
              //Si no cumple la estructura
              error = true;
              break;
            }
          }
          if (error) {
            this.form.controls['csvFile'].setErrors({
              columnasIncorrectas:
              "La estructura del archivo no concuerda con el estándar.",
            });
          }
          this.selectedFile = file;
          // console.log(this.form);
          
          
        data.forEach(el=>{
          el['code'] = el['Codigo'];
          delete el['Codigo'];

          el['description'] = el['Descripcion'];
          delete el['Descripcion'];

          // return el;
          });


          this.form.controls['values'].setValue(data);
        };
      }else{
        this.form.controls['csvFile'].setErrors({
          extension: "Formato de archivo no soportado",
        });
      }
    } else {
        this.form.controls['csvFile'].setErrors({
          extension: "Debe seleccionar un archivo con extension .csv",
        });
      }
  }
  

}
