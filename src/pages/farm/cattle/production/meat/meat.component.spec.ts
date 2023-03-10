/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MeatComponent } from './meat.component';

describe('MeatComponent', () => {
  let component: MeatComponent;
  let fixture: ComponentFixture<MeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
