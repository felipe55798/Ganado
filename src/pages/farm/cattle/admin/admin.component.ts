import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Confirm } from 'src/app/shared/services/confirm/confirm.service';
import { Cattle } from 'src/models/hacienda/cattle';
import { ICattle } from 'src/pages/services/contracts/cattle.interface';
import { CattleType } from '../../../../models/hacienda/cattleType';
import { ICattleType } from '../../../services/contracts/cattleType.interface';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  activeIndex: number = 0;
  public cattleTypes: CattleType[] = [];
  public cattles: Cattle[] = [];
  public cattlesAux: Cattle[] = [];

  search: string;
  pageSize: number = 10;
  pageNumber: number = 1;
  totalCattleTypesByPage: number = 0;

  constructor(
    private cattleTypeService: ICattleType,
    private cattleService: ICattle,
    public dialog: MatDialog,
    private confirm: Confirm
  ) {
    this.search = '';
  }

  ngOnInit() {
    this.loadCattleTypes();
    this.getAllCattles({});
  }

  //Permite consultar todos los tipos de Ganado
  loadCattleTypes() {
    this.cattleTypeService
      .getCattleTypeByPage(this.pageNumber, 50)
      .subscribe((res) => {
        this.cattleTypes = res.data.filter((el: CattleType) => el.active);
        if (res.data.length > 0) this.totalCattleTypesByPage = res.data.length;
      });
  }

  //Permite  el ganado de Todos los Tipos Páginado.
  getAllCattles(paginated: any) {
    this.cattleService
      .getAllCattlesByPage(paginated?.page ?? 1, paginated?.pageSize ?? 10)
      .subscribe((res) => {
        this.cattles = res.data?.filter((el: CattleType) => el.active) ?? [];
        this.cattlesAux = [...this.cattles];
      });
  }
  //Permite obtener el ganadao según cierto Tipo Páginado
  getCattlesByType(paginated: any, idCattle: string) {
    console.log('getCattlesByType: ', paginated, idCattle);
    // console.log(paginated);
    this.cattleTypeService
      .getCattleByType(
        paginated.page ?? 1,
        paginated.pageSize ?? 10,
        idCattle
      )
      .subscribe((res) => {
          this.cattles = res.data.filter((el: Cattle) => el.active) ?? [];
          this.cattlesAux = [...this.cattles];
      });
  }

  //Para consultar el ganado según su Tipo
  cattleTypeChanged(tabChangeEvent: MatTabChangeEvent) {
    if (tabChangeEvent.index > 0) {
      // console.log(this.cattleTypes[tabChangeEvent.index - 1].id);
      this.getCattlesByType({}, this.cattleTypes[tabChangeEvent.index - 1].id);
    }else{
      this.getAllCattles({});
    }
  }

  ///CRUD///
  createCattle() {
    console.log('a verr');
    const dialog = this.dialog.open(FormComponent, {
      disableClose: true,
      width: '750px',
      data: {
        insertMode: true,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result) {
        this.cattleService.createCattle(result).subscribe((res) => {
          if (res) {
            this.cattles.unshift(result);
            this.cattlesAux.unshift(result);
          }
        });
      }
    });
  }

  updateCattle(cattle: Cattle) {
    const dialog = this.dialog.open(FormComponent, {
      disableClose: true,
      width: '650px',
      data: {
        editMode: true,
        cattle,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.cattleService.updateCattle(result).subscribe((res) => {
          // console.log({ res });
          if (res) {
            this.cattles = this.cattles.filter((el) => el.id !== result.id);
            this.cattles.unshift(result);
            this.cattlesAux = this.cattlesAux.filter(
              (el) => el.id !== result.id
            );
            this.cattlesAux.unshift(result);
          }
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const total = this.cattles.filter((cat) =>
      cat.name.trim().toLowerCase().includes(filterValue.trim().toLowerCase())
    );
    if (this.search != '') {
      if (total.length > 0) {
        this.cattles = this.cattles.filter((cat) =>
          cat.name
            .trim()
            .toLowerCase()
            .includes(this.search.trim().toLowerCase())
        );
      }
    } else {
      this.cattles = [...this.cattlesAux];
    }
  }

  deleteCattle(row: Cattle) {
    this.confirm
      .show({
        title: 'Eliminar ganado',
        content: `
        <img width="100px" src="'../../../../assets/img/trash.svg" alt="">
        <br>
          ¿Está seguro que desea eliminar el ganado <b> ${row.name}</b>?
        `,
      })
      .then((res: any) => {
        if (res) {
          this.cattleService.deleteCattle(row.id).subscribe(
            (resService: boolean) => {
              if (resService) {
                this.cattles = this.cattles.filter((el) => el.id !== row.id);
                this.cattlesAux = [...this.cattles.filter((el) => el.id !== row.id)];
              } else {
                console.log('Error');
              }
            },
            (err: any) => console.log(err)
          );
        }
      });
  }
}
