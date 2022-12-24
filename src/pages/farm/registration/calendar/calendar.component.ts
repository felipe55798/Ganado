import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timeGrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarOptions } from '@fullcalendar/core';
import { FairSchedule } from 'src/models/hacienda/fairSchedule';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() eventos!: FairSchedule[];
  @Output() eventoSeleccionado = new EventEmitter<any>();
  selectedEvent!: Date;

  calendarOptions!: CalendarOptions;
  // disabledDatesArr = [
  //   new Date('2022-12-24'), 
  //   new Date('2022-12-25'), 
  //   new Date('2022-12-26')
  // ];
  constructor() { }

  ngOnInit(): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: '',
        center: 'title',
        right: 'prev,next',
      },
      events: this.eventos,
      locale: esLocale,
      editable: false,
      selectable: true,
      selectMirror: true,
      select: this.handleDateSelect.bind(this),
    };
  }

  async handleDateSelect(selectInfo: any) {
    const calendarApi = selectInfo.view.calendar;
    const actualDate = new Date(this.selectedEvent);
    const selectedDate = new Date(selectInfo.start);
    //Si el contador es igual a eventos.length entonces no cumple
    let contFall = 0;
    for (const elm of this.eventos) {
      if(selectedDate < elm.start || selectedDate > elm.end) {
        contFall = contFall + 1;
      }
    }
    if(contFall === this.eventos.length) {
      calendarApi.unselect();
    }
    this.selectedEvent = selectedDate;
    if(actualDate.toString() === selectedDate.toString()) {
      calendarApi.unselect(); // clear date selection
    }
  }

}
