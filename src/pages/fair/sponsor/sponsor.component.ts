import { Component, OnInit } from '@angular/core';
import { Sponsor } from 'src/models/hacienda/sponsor';
import { ISponsor } from 'src/pages/services/contracts/sponsor.interface';
import { MatDialog } from '@angular/material/dialog';
import { Confirm } from 'src/app/shared/services/confirm/confirm.service';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss']
})
export class SponsorComponent implements OnInit {

  sponsors: Sponsor[] = [];
  constructor(
    public dialog: MatDialog, 
    private confirm: Confirm,
    private sponsorService: ISponsor
  ) { }

  ngOnInit(): void {
    this.getAllSponsors({});
  }

  getAllSponsors(paginated: any) {
    this.sponsorService.
    getAllSponsorsByPage(paginated?.page ?? 1, paginated?.pageSize ?? 10).
    subscribe((res)=>{
      this.sponsors = res.data?.filter((el: Sponsor) => el.active) ?? [];
    });
  }

   ///CRUD///
  createSponsor() {
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
        this.sponsorService.createSponsor(result).subscribe((res) => {
          if (res) {
            result.id = res.data.id;
            this.sponsors.unshift(result);
          }
        });
      }
    });
  }

  updateSponsor(sponsor: Sponsor) {
    const dialog = this.dialog.open(FormComponent, {
      disableClose: true,
      width: '750px',
      data: {
        editMode: true,
        sponsor,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.sponsorService.updateSponsor(result).subscribe((res) => {
          // console.log({ res });
          if (res) {
            this.sponsors = this.sponsors.filter((el) => el.id !== result.id);
            this.sponsors.unshift(result);
          }
        });
      }
    });
  }

  deleteSponsor(row: Sponsor) {
    this.confirm
      .show({
        title: 'Eliminar patrocinador',
        content: `
        <img width="100px" src="'../../../../assets/img/trash.svg" alt="">
        <br>
          ¿Está seguro que desea eliminar el patrocinador <b> ${row.name}</b>?
        `,
      })
      .then((res: any) => {
        if (res) {
          this.sponsorService.deleteSponsor(row.id).subscribe(
            (resService: boolean) => {
              if (resService) {
                this.sponsors = this.sponsors.filter((el) => el.id !== row.id);
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
