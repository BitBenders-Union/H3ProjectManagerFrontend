/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminpageProjecttaskcategoryComponent } from './adminpage-projecttaskcategory.component';

describe('AdminpageProjecttaskcategoryComponent', () => {
  let component: AdminpageProjecttaskcategoryComponent;
  let fixture: ComponentFixture<AdminpageProjecttaskcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpageProjecttaskcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpageProjecttaskcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
