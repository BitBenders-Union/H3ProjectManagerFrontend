/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminpageProjecttaskstatusComponent } from './adminpage-projecttaskstatus.component';

describe('AdminpageProjecttaskstatusComponent', () => {
  let component: AdminpageProjecttaskstatusComponent;
  let fixture: ComponentFixture<AdminpageProjecttaskstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpageProjecttaskstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpageProjecttaskstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
