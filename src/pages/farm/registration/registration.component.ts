import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fair } from 'src/models/hacienda/fair';
import { Calendar } from '@fullcalendar/core'; // include this line
import { Pen } from 'src/models/hacienda/pen';
import { Stand } from 'src/models/hacienda/stand';
import { Cattle } from 'src/models/hacienda/cattle';
import { ICattle } from 'src/pages/services/contracts/cattle.interface';
import { CattleType } from 'src/models/hacienda/cattleType';
import { IPen } from 'src/pages/services/contracts/pens.interface';
import { IGlobalization } from 'src/pages/services/contracts/globalization.interface';
import { City } from 'src/models/hacienda/city';
import { State } from 'src/models/hacienda/state';
import { IFair } from 'src/pages/services/contracts/fair.interface';
import { FairSchedule } from 'src/models/hacienda/fairSchedule';
import { Lote } from 'src/models/hacienda/lote';
import { ILote } from 'src/pages/services/contracts/lote.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;
  cityList!: City[];
  stateList !: State[];
  fairList!: Fair[];
  penList!: Pen[];
  standList!: Stand[];
  cattleList!: Cattle[];
  scheduleList!: FairSchedule[];
  loteList!: Lote[];
  labelPosition: 'before' | 'after' = 'after';

  //Configuración del calendario
  events!: any[];
  eventsFairSelected: FairSchedule[] = [];
  options: any;
  header: any;
  today = new Date();
  showCalendar = false;
  pageSize: number = 10;
  pageNumber: number = 1;

  constructor(
    private globalizationService: IGlobalization,
    private formBuilder: FormBuilder, 
    private cattleService: ICattle, 
    private penService: IPen,
    private loteService: ILote,
    private fairService: IFair) { 
      const name = Calendar.name; // add this line in your constructor
  }

  ngOnInit() {
    this.getAllCities();
    this.getAllStates();
    this.getAllCattles({});
    this.getAllFairs();
    this.getAllSchedules({});
    this.loadPens();
    this.loadLotes();
    this.events = [
      { title: 'Fecha apartada', start: '2022-12-24', end: '2022-12-26' },
      { title: 'Fecha apartada', start: '2022-12-28' },
      { title: 'Fecha apartada', start: '2022-12-29' }
    ];
    this.fairList = [];
    this.penList = [];
    this.buildForm();
    this.loadDependencias();
  }

  loadDependencias() {
    this.form.controls['auctionOrEvent'].valueChanges.subscribe((voe) => {
      if((voe === '1' || voe === '2') && this.form.controls['fkFair'].value) {
        this.showCalendar = true;
      }
    });

    this.form.controls['fkFair'].valueChanges.subscribe((fs) => {
      this.showCalendar = false;
      if(fs) {
        this.eventsFairSelected = this.scheduleList.filter((el: FairSchedule) => el.fkFairs === fs);
        const fName = this.fairList.filter((f: Fair) => f.id === fs)[0].name;
        for (const evs of this.eventsFairSelected) {
          evs.title = fName;
          evs.start = new Date(evs.startDate);
          evs.end = new Date(evs.endDate);
          evs.start.setFullYear(2022);
          evs.end.setFullYear(2022);
          evs.end.setSeconds(5);
        }
        setTimeout(() => {
          if(this.form.controls['auctionOrEvent'].value === '1' || this.form.controls['auctionOrEvent'].value === '2') {
            this.showCalendar = true;
          }
        }, 0);
      }
    });
  }

  getAllCattles(paginated: any) {
    this.cattleService
      .getAllCattlesByPage(paginated?.page ?? 1, paginated?.pageSize ?? 50)
      .subscribe((res) => {
        this.cattleList = res.data?.filter((el: CattleType) => el.active) ?? [];
      });
  }

  getAllCities() {
    this.globalizationService.getAllCities(this.pageNumber, this.pageSize).subscribe((res) => {
      this.cityList = res.data?.filter((el: City) => el.active);
    });
  }

  getAllStates() {
    this.globalizationService.getAllStates(this.pageNumber, this.pageSize).subscribe((res) => {
      this.stateList = res.data?.filter((el: State) => el.active);
    });
  }

  getAllFairs() {
    this.fairService.getAllFairs(this.pageNumber, this.pageSize).subscribe((res) => {
      this.fairList = res.data?.filter((el: Fair) => el.active);
    });
  }

  getAllSchedules(paginated: any) {
    this.fairService.getAllSchedules(paginated?.page ?? 1, paginated?.pageSize ?? 50).subscribe((res) => {
      this.scheduleList = res.data?.filter((el: FairSchedule) => el.active);
    });
  }

  loadPens() {
    this.penService
      .getPensByPage(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.penList = res.data.filter((el: Pen) => el.active);
      });
  }

  loadLotes() {
    this.loteService
      .getLotesByPage(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.loteList = res.data.filter((el: Lote) => el.active);
      });
  }

  inscribirse() {
    console.log('El formulario de inscripción es: ', this.form.value);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      fkDepartment: [
        1,
        Validators.compose([Validators.required, Validators.required]),
      ],
      fkTown: [
        1,
        Validators.compose([Validators.required, Validators.required]),
      ],
      fkFair: [
        '',
        Validators.compose([Validators.required, Validators.required]),
      ],
      fkPen: [
        '',
        Validators.compose([Validators.required, Validators.required]),
      ],
      fkStand: [
        '',
        Validators.compose([Validators.required, Validators.required]),
      ],
      fkCattle: [
        '',
        Validators.compose([Validators.required, Validators.required]),
      ],
      fkLote: [
        '',
        Validators.compose([Validators.required, Validators.required]),
      ],
      auctionOrEvent: [],
      corralOrStand: [],
      dateSelected: [''],
    })
  }

}
