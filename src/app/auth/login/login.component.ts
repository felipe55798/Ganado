import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from 'src/app/shared/models/toast';
import { LoginModel } from 'src/models/login/login';
import { Contracts } from "src/providers/Navigation";
import { IAuth } from '../services/contracts/auth.interface';
import { inputPatterns } from '../utils/patterns';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  fieldTextType: boolean = false;
  inputPatterns = inputPatterns;

  loginModel: LoginModel =  new LoginModel([]);
  toast!: Toast;
  codeColorsErroMessage: any = {
    1:'#FFFF00',
    2: '#F0ECFC',
    400: '#FF6F71'
  };
  constructor(
    private formBuilder: FormBuilder,
    private authService: IAuth,
    private navegationService: Contracts.INavigator,
  ) {}

  ngOnInit(): void {
    this.setDefaultToast();
    this.buildForm();
  }
  buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(inputPatterns.password),
          Validators.minLength(8),
        ]
      ],
      remenber: [false],
    });
  }

  resetPassword() {}
  login() {
    this.loginModel.email = this.form.value.email;
    this.loginModel.password = this.form.value.password;
    this.authService.login(this.loginModel).subscribe((res:any)=>{
      if(res){
        // console.log(res);
        if(res.succeeded){
          if(res.data.temporal_password){
            this.navegationService.Push(['auth/reset-password'], 'auth/reset-password', {idUser: res.data.id});
          }else{
            this.navegationService.Push(['pages'],'page');
          }
        }else{
          this.toast.show = true;
          this.toast.text = res.error.Message.toString();
          this.toast.icon = 'Info.svg';
          setTimeout(() => {
            this.setDefaultToast();
          }, 3000);
        }
      }
    },error=>{
      console.log(error);
      this.toast.show = true;
      this.toast.text = error.error.Message;
      this.toast.icon = 'Info.svg';
      this.toast.color = this.codeColorsErroMessage[error.status];
      setTimeout(() => {
        this.setDefaultToast();
      }, 6000);
    })
  }
  logout(){
    this.authService.logout();
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  setDefaultToast(){
    this.toast = {
      show: false,
      text: '',
      icon: '',
      color: ''
    };
  }


}
