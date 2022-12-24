import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, Observable, of } from 'rxjs';
import { Toast } from 'src/app/shared/models/toast';
import { NavegationService } from 'src/app/shared/services/navegation/navegation.service';
import { ParamsService } from 'src/providers/Navigation';
import { Charge } from '../../models/charges/charge';
import { Combination } from '../../models/combination/combination';
import { TypeZone } from '../../models/zone-type';
import { ICharge } from '../services/contracts/charge.interface';

@Component({
  selector: 'app-detail-charge',
  templateUrl: './detail-charge.component.html',
  styleUrls: ['./detail-charge.component.scss'],
})
export class DetailChargeComponent implements OnInit, AfterViewChecked {
  formInsertMode: boolean = false;
  formEditMode: boolean = false;
  formViewMode: boolean = true;

  form!: FormGroup;
  charge!: Charge;

  toast!: Toast;

  zoneTypes!: TypeZone[];
  combinations!: Combination[];

  constructor(
    private formBuilder: FormBuilder,
    private paramService: ParamsService,
    private chargeService: ICharge,
    private snackBar: MatSnackBar,
    private navegationService: NavegationService,
    private cdRef:ChangeDetectorRef  ) {}
  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.getZones();
    this.setDefaultToast();
    const chargeParamUrl = this.paramService.Get(
      'pages/config/charges/detail',
      'charge'
    );
    this.buildForm();
    // console.log("paramUrl:",chargeParamUrl);
    if (chargeParamUrl) {
      this.charge = chargeParamUrl;
      //Si trae Parametros seleccionados de crear Cargo
      //No trae combinaciones y llega el cargo recién creado
      if (chargeParamUrl?.catalogs?.length > 0) {
        this.form.patchValue(this.charge);
        if (this.charge.zonetypeid?.id)
          this.form.controls['zonetypeId'].setValue(this.charge.zonetypeid!.id);
        // console.log("Creación",{charge: chargeParamUrl});
        this.combinations = [
          {
            id: -1,
            FrecuencyId: -1,
            Parameters: chargeParamUrl.catalogs ?? [],
            agrupado: true, //ya van agrupados los parameters para q combination no haga reduce
          },
        ];
        // console.log( this.combinations);
      } else {
        //edición
        // console.log(chargeParamUrl);
        this.getChargeById(chargeParamUrl.id);
      }
    }
  }
  setDefaultToast() {
    this.toast = {
      show: false,
      text: '',
      icon: '',
      color: '',
    };
  }

  getZones() {
    this.chargeService.getZoneTypes().subscribe((res) => {
      if (res) {
        this.zoneTypes = res.data;
      }
    });
  }
  //Combinaciones del  cargo
  getCombinations() {
    this.chargeService
      .getCombinationsByCharge(this.charge?.id)
      .subscribe((res) => {
        if (res) {
          this.combinations = res.data;
          // console.log('getCombinationsDetail', this.combinations);
        }
      });
  }
  buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(1),
        ]),
      ],
      code: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(1),
        ]),
      ],
      visitsperday: [
        '',
        Validators.compose([
          Validators.required,
          Validators.max(100),
          Validators.min(1),
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
      poctime: [
        '',
        Validators.compose([
          Validators.required,
          Validators.max(100),
          Validators.min(1),
        ]),
      ],
      daysperweek: [
        '',
        [Validators.required, Validators.max(100), Validators.min(1)],
      ],
      zonetypeId: ['', Validators.required],
      Combinations: this.formBuilder.array([]),
    });
  }

  getChargeById(id: number) {
    this.chargeService.getChargeByID(id).subscribe((res) => {
      if (res) {
        this.charge = res.data as Charge;
        this.charge.zonetypeId = res.data.zonetypeid;
        this.getCombinations();
        this.form.patchValue(this.charge);
        if (this.charge.zonetypeId?.id)
          this.form.controls['zonetypeId'].setValue(this.charge.zonetypeId!.id);
        // console.log(this.charge.zonetypeId!.id);
      }
    });
  }

  goBackPage() {
    this.navegationService.navigate('pages/config/charges');
  }
  editMode() {
    this.formEditMode = true;
    this.formViewMode = false;
    this.formInsertMode = false;
  }
  viewMode() {
    this.formEditMode = false;
    this.formViewMode = true;
    this.formInsertMode = false;
    this.setDefaultToast();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  editCharge() {
    const charge = this.form.value as Charge;
    charge.zonetypeID = charge.zonetypeId;
    if (this.form.valid) {
      this.chargeService.editCharge(charge).subscribe(
        (res) => {
          if (res) {
            this.charge = res.data;
            this.form.patchValue(this.charge);
            this.charge.Combinations = res.data.Combinations;
            this.openSnackBar('Catálogo editado con éxito.', 'Ok');
            // if (this.charge.Combinations) {
            //   //para resetear los formControls
            //   // this.setValuesFromArray(this.charge.Combinations);
            // }
            this.viewMode();
          }
        },
        (error) => {
          this.toast.show = true;
          this.toast.text = error.error.message;
          this.toast.icon = 'Info.svg';
          this.toast.color = '#FFFF00';
        }
      );
    }
  }

  deleteCharge() {
    const charge = this.form.value as Charge;
    let proceed = confirm(`¿Desea eliminar el cargo: ${charge?.name} ?`);
    if (proceed) {
      if (charge.id) {
        this.chargeService.deleteCharge(charge.id).subscribe(
          (res) => {
            if (res) {
              this.openSnackBar(
                `Cargo ${charge?.name} eliminado con éxito.`,
                'Ok'
              );
              this.goBackPage();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  //eliminar combinación de la lista que se pinta
  deleteCombination(idCombination: any) {
    if(idCombination >= 0 &&  this.combinations.length > 0 ){
      this.combinations.splice(idCombination,1); 
    }
  }
  addCombination() {
    this.combinations?.push({
      id: -1,
      Parameters: [],
      FrecuencyId: -1,
      FrecuencyName: '', //Opcional
    });
  }

  
}
