import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { INavigator } from 'src/providers/Navigation/contracts/navigator.interface';
import { Parameter } from '../../models/catalog';
import { FormComponent } from '../form/form.component';
import { ICatalogs } from '../services/contracts/catalogs.interface';
import { Value } from '../../models/Value';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss'],
})
export class CatalogsComponent implements OnInit {
  catalogs: Parameter[] = [];
  constructor(
    public dialog: MatDialog,
    private navegationService: INavigator,
    private catalogService:ICatalogs,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllCatalogs();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
  getAllCatalogs(){
    this.catalogService.getCatalogs().subscribe(res=>{
      this.catalogs= res.data;
    })
  }


  createCatalog(){
    const dialog = this.dialog.open(FormComponent, {
      width: '700px',
      data: {insertMode: true,}
    });
    dialog.afterClosed().subscribe(
      result => {
        if(result){
          // console.log(result);
          const value = result as Value;
          delete value.csvFile
          this.catalogService.createCatalog(value).subscribe(res=>{
            if(res){
              this.openSnackBar("Catalog registrado con éxito.","Ok")
              // this.getAllCatalogs();
              this.editCatalog(res.data);
            }
          },error=>{
            console.log(error);
            this.openSnackBar("No se pudó crear: " + error.error.message,"Ok")
          })
        }
      }
    );
  }
  //Enviar el catalgo por ruta TODO
  editCatalog(catalog: Parameter){
    this.navegationService.Push("pages/config/catalogs/detail",{catalog});
  }
}
