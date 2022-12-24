import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCheckParametersComponent } from './list-check-parameters.component';

describe('ListCheckParametersComponent', () => {
  let component: ListCheckParametersComponent;
  let fixture: ComponentFixture<ListCheckParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCheckParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCheckParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
