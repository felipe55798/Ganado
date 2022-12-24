import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Toast } from 'src/app/shared/models/toast';
import { ParamsService } from 'src/providers/Navigation';
import { INavigator } from 'src/providers/Navigation/contracts';
import { IAuth } from '../services/contracts/auth.interface';
import { inputPatterns } from '../utils/patterns';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  fieldTextType: boolean = false;
  fieldTextTypeConfirm: boolean = false;
  toast!: Toast;
  idUserReset!: number;
  constructor(
    private formBuilder: FormBuilder,
    private authService: IAuth,
    private navegationService: INavigator,
    private snackBar: MatSnackBar,
    private paramService: ParamsService,
  ) {}

  ngOnInit(): void {
    this.idUserReset = this.paramService.Get(
      'auth/reset-password','idUser'
    );
    this.setDefaultToast();
    this.buildForm();
  }
  buildForm() {
    this.form = this.formBuilder.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(inputPatterns.password),
          Validators.minLength(8),
        ],
      ],
      passwordConfirm: [
        '',
        [
          Validators.required,
          Validators.pattern(inputPatterns.password),
          Validators.minLength(8),
        ],
      ],
      remenber: [false],
    });
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextTypeConfirm() {
    this.fieldTextTypeConfirm = !this.fieldTextTypeConfirm;
  }
  
  setDefaultToast() {
    this.toast = {
      show: false,
      text: '',
      icon: '',
      color: '',
    };
  }
  updatePassword(){
    const values: any = {};
    values.password =  this.form.value.password;
    values.passwordConfirm =  this.form.value.passwordConfirm;
    if(this.idUserReset >= 0){
      this.authService.updatePassword(values,this.idUserReset).subscribe(
        res=>{
          if(res.data){
            this.navegationService.Push(['pages'],'pages');
          }
        },error=>{
          this.openSnackBar(`No se pudó actualizar la contraseña: ${error.error.message}`, 'Ok');
          // console.log(error);
        }
      );
    }
  }
  goBackPage() {
    this.navegationService.Push(['auth/login'],'auth/login');
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
