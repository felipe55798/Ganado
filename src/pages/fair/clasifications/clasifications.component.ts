import { Component, OnInit } from '@angular/core';
import { Clasification } from 'src/models/hacienda/clasification';
import { MatDialog } from '@angular/material/dialog';
import { IClasificacion } from 'src/pages/services/contracts/clasification.interface';
import { FormComponent } from './form/form.component';
import { Confirm } from 'src/app/shared/services/confirm/confirm.service';

@Component({
  selector: 'app-clasifications',
  templateUrl: './clasifications.component.html',
  styleUrls: ['./clasifications.component.scss']
})
export class ClasificationsComponent implements OnInit {

  clasifications: Clasification[] = [];
  constructor(
    public dialog: MatDialog, 
    private confirm: Confirm,
    private clasificationService: IClasificacion
  ) { }

  ngOnInit(): void {
    this.getAllClasifications({});
  }

  getAllClasifications(paginated: any) {
    this.clasificationService.
    getAllClasificationsByPage(paginated?.page ?? 1, paginated?.pageSize ?? 10).
    subscribe((res)=>{
      this.clasifications = res.data?.filter((el: Clasification) => el.active) ?? [];
    });
  }

  ///CRUD///
  createClasification() {
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
        this.clasificationService.createClasification(result).subscribe((res) => {
          if (res) {
            result.id = res.data.id;
            this.clasifications.unshift(result);
          }
        });
      }
    });
  }

  updateClasification(clasification: Clasification) {
    const dialog = this.dialog.open(FormComponent, {
      disableClose: true,
      width: '750px',
      data: {
        editMode: true,
        clasification,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.clasificationService.updateClasification(result).subscribe((res) => {
          // console.log({ res });
          if (res) {
            this.clasifications = this.clasifications.filter((el) => el.id !== result.id);
            this.clasifications.unshift(result);
          }
        });
      }
    });
  }

  deleteClasification(row: Clasification) {
    this.confirm
      .show({
        title: 'Eliminar clasificación',
        content: `
        <img width="100px" src="'../../../../assets/img/trash.svg" alt="">
        <br>
          ¿Está seguro que desea eliminar la clasificación <b> ${row.name}</b>?
        `,
      })
      .then((res: any) => {
        if (res) {
          this.clasificationService.deleteClasification(row.id).subscribe(
            (resService: boolean) => {
              if (resService) {
                this.clasifications = this.clasifications.filter((el) => el.id !== row.id);
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
