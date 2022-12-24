import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-paginated',
  templateUrl: './list-paginated.component.html',
  styleUrls: ['./list-paginated.component.scss']
})
export class ListPaginatedComponent implements OnInit {

  @Output() add = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() view = new EventEmitter<any>();
  @Output() paginate = new EventEmitter<any>();

  @Input() pageSize!: number;
  @Input() totalRecords!: number;
  @Input() list!: any[] ;

  constructor() { }

  ngOnInit(): void {
  }
  createRegister(){
    this.add.emit(true);
  }
  updateRegister(pen: any){
    this.update.emit(pen);
  }
  deleteRegister(pen: any){
    this.delete.emit(pen);
  }
  searchPaginate(event: any){
    this.paginate.emit({pageSize: this.pageSize, page: event.page + 1})
  }
}
