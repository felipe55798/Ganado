import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { INavigator } from 'src/providers/Navigation/contracts/navigator.interface';
import { Charge } from '../../models/charges/charge';
import { FormComponent } from '../form/form.component';
import { ICharge } from '../services/contracts/charge.interface';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.scss'],
})
export class ChargesComponent implements OnInit {
  charges: Charge[] = [
    // {
    //   name: '001 BDR Mixto',
    //   column: 'Columna',
    //   Description: 'Última modificación el: 23/12/2021 a las 18:29',
    // },
  ];

  constructor(
    public dialog: MatDialog,
    private navegationService: INavigator,
    private chargeService: ICharge,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllCharges();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
  getAllCharges() {
    this.chargeService.getCharges().subscribe((res) => {
      this.charges = res.data;
    });
  }

  createCharge() {
    const dialog = this.dialog.open(FormComponent, {
      width: '850px',
      data: { insertMode: true },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        const value = result as Charge;
        value.zonetypeID = value.zonetypeId!;
        // console.log({ value });
        this.chargeService.createCharge(value).subscribe(res=>{
          if(res){
            const sendCharge = res.data;
            sendCharge.catalogs = value.catalogs;
            this.openSnackBar('Cargo registrado con éxito.', 'Ok');
            this.goToEditCharge(sendCharge); //res.data);
          }
        //   }
        },error=>{
          console.log(error);
          this.openSnackBar("No se pudó crear: " + error.error.message,"Ok")
        })
      }
    });
  }
  //Enviar el catalgo por ruta TODO
  goToEditCharge(charge: Charge) {
    this.navegationService.Push('pages/config/charges/detail', { charge });
  }
}
