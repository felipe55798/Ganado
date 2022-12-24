/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PensComponent } from './pens.component';

describe('PensComponent', () => {
  let component: PensComponent;
  let fixture: ComponentFixture<PensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
