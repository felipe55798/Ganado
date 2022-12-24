/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ZootechnicsComponent } from './zootechnics.component';

describe('ZootechnicsComponent', () => {
  let component: ZootechnicsComponent;
  let fixture: ComponentFixture<ZootechnicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZootechnicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZootechnicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
