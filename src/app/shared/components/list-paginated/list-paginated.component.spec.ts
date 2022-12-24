import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaginatedComponent } from './list-paginated.component';

describe('ListPaginatedComponent', () => {
  let component: ListPaginatedComponent;
  let fixture: ComponentFixture<ListPaginatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPaginatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPaginatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
