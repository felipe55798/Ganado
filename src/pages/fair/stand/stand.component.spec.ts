/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StandComponent } from './stand.component';

describe('StandComponent', () => {
  let component: StandComponent;
  let fixture: ComponentFixture<StandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
