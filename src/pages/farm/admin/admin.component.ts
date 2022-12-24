import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CattleFarm } from 'src/models/hacienda/cattleFarm';
import { Third } from 'src/models/hacienda/third';
import { Weather } from 'src/models/hacienda/weather';
import { IFarm } from 'src/pages/services/contracts/farm.interface';
import { Contracts } from 'src/providers/Navigation';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  form!: FormGroup;

  weathers: Weather[] = [];
  thirds: Third[] = [];

  idFarm =    JSON.parse(localStorage.getItem('currentUser') ?? '').id ?? '';  
  constructor(private formBuilder: FormBuilder, private farmService: IFarm) {}
  ngOnInit(): void {
    this.idFarm ='40b1b3d5-824c-45ce-a058-c91eda2d330b';
    console.log(this.idFarm);
    this.buildForm();
    this.getAllWeathers({});
    this.getFarmById();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      name: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      hectare: [
        0,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      active: [true],
      fkWeathers: [
        '',
        Validators.compose([Validators.required, Validators.required]),
      ],
      fkThirds: [
        '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        Validators.compose([Validators.required, Validators.required]),
      ],
    });
  }

  getAllWeathers(paginated: any) {
    this.farmService
      .getAllWheathers(paginated?.page ?? 1, paginated?.pageSize ?? 50)
      .subscribe((res) => {
        this.weathers = res.data ?? [];
      });
  }
  getFarmById(){
    this.farmService.getFarmById(this.idFarm).subscribe( res => {
      if(res.data){
        this.form.patchValue(res.data)
        console.log(res);
      }
    });
  }

  updateFarm() {
    if (this.form.valid) {
      // console.log('Llega', result);
      const farm = this.form.value as CattleFarm;
      console.log(farm);
      this.farmService.updateFarm(farm).subscribe((res) => {
        console.log({ res });
        if (res) {
          alert('Se acualizó con éxito');
        }
      });
    }
  }
}
