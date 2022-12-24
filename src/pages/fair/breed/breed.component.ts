import { Component, OnInit } from '@angular/core';
import { Breed } from 'src/models/hacienda/breed';
import { IBreed } from 'src/pages/services/contracts/breed.interface';
import { Confirm } from 'src/app/shared/services/confirm/confirm.service';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss']
})
export class BreedComponent implements OnInit {

  breeds: Breed[] = [];
  constructor(private breedService: IBreed, public dialog: MatDialog, 
    private confirm: Confirm,) { }

  ngOnInit(): void {
    this.getAllBreeds({});
  }

  getAllBreeds(paginated: any) {
    this.breedService.
    getAllBreedsByPage(paginated?.page ?? 1, paginated?.pageSize ?? 10).
    subscribe((res)=>{
      this.breeds = res.data?.filter((el: Breed) => el.active) ?? [];
    });
  }

  ///CRUD///
  createBreed() {
    const dialog = this.dialog.open(FormComponent, {
      disableClose: true,
      width: '650px',
      data: {
        insertMode: true,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result) {
        this.breedService.createBreed(result).subscribe((res) => {
          if (res) {
            result.id = res.data.id;
            this.breeds.unshift(result);
          }
        });
      }
    });
  }

  updateBreed(breed: Breed) {
    const dialog = this.dialog.open(FormComponent, {
      disableClose: true,
      width: '550px',
      data: {
        editMode: true,
        breed,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.breedService.updateBreed(result).subscribe((res) => {
          // console.log({ res });
          if (res) {
            this.breeds = this.breeds.filter((el) => el.id !== result.id);
            this.breeds.unshift(result);
          }
        });
      }
    });
  }

  deleteBreed(row: Breed) {
    this.confirm
      .show({
        title: 'Eliminar raza',
        content: `
        <img width="100px" src="'../../../../assets/img/trash.svg" alt="">
        <br>
          ¿Está seguro que desea eliminar la raza <b> ${row.name}</b>?
        `,
      })
      .then((res: any) => {
        if (res) {
          this.breedService.deleteBreed(row.id).subscribe(
            (resService: boolean) => {
              if (resService) {
                this.breeds = this.breeds.filter((el) => el.id !== row.id);
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
