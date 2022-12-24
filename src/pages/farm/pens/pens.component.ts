import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Pen } from 'src/models/hacienda/pen';
import { IPen } from 'src/pages/services/contracts/pens.interface';
import { FormComponent } from './form/form.component';
import { MatDialog } from '@angular/material/dialog';
import { Confirm } from '../../../app/shared/services/confirm/confirm.service';

@Component({
  selector: 'app-pens',
  templateUrl: './pens.component.html',
  styleUrls: ['./pens.component.scss'],
})
export class PensComponent implements OnInit {
  @ViewChild('uiElement', { static: false }) public uiElement!: ElementRef;
  pageSize: number = 10;
  pageNumber: number = 1;
  totalPens: number = 0;

  public pensList: Pen[] = [];
  constructor(
    private penService: IPen,
    public dialog: MatDialog,
    private confirm: Confirm
  ) {}

  ngOnInit() {
    this.loadPens();
  }

  loadPens() {
    this.penService
      .getPensByPage(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        // console.log(res);
        this.pensList = res.data.filter((el: Pen) => el.active);
        if (res.data.length > 0) this.totalPens = res.data.length;
      });
  }

  createPen() {
    const dialog = this.dialog.open(FormComponent, {
      disableClose: true,
      width: '650px',
      data: {
        insertMode: true,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Llega', result);
        this.penService.createPen(result).subscribe((res) => {
          console.log(res);
          if (res) {
            this.pensList.unshift(result);
          }
        });
      }
    });
  }

  updatePen(pen: Pen) {
    const dialog = this.dialog.open(FormComponent, {
      disableClose: true,
      width: '650px',
      data: {
        editMode: true,
        pen,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        // console.log('Llega', result);
        this.penService.updatePen(result).subscribe((res) => {
          console.log({ res });
          if (res) {
            this.pensList = this.pensList.filter((el) => el.id !== result.id);
            this.pensList.unshift(result);
          }
        });
      }
    });
  }

  deletePen(row: Pen) {
    this.confirm
      .show({
        title: 'Eliminar corral',
        content: `
        <img width="100px" src="'../../../../assets/img/trash.svg" alt="">
        <br>
          ¿Está seguro que desea eliminar el corral <b> ${row.name}</b>?
        `,
      })
      .then((res: any) => {
        if (res) {
          this.penService.deletePen(row.id).subscribe(
            (resService: boolean) => {
              if (resService) {
                this.pensList = this.pensList.filter((el) => el.id !== row.id);
              } else {
                console.log('Error');
              }
            },
            (err: any) => console.log(err)
          );
        }
      });
  }

  paginate(event: any) {
    this.penService
      .getPensByPage(event.page + 1, this.pageSize)
      .subscribe((res) => {
        console.log(res);
        this.pensList = res.data.filter((el: Pen) => el.active);
        if (res.data.length > 0) this.totalPens = res.data.length;
      });
  }
}
