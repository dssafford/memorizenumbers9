import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationImages1000Component } from './location-images1000.component';
import {MatFormFieldModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatTableModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('LocationSunListComponent', () => {
  let component: LocationImages1000Component;
  let fixture: ComponentFixture<LocationImages1000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationImages1000Component ],
      imports: [MatProgressSpinnerModule, MatTableModule,
        MatPaginatorModule, MatFormFieldModule, MatInputModule,
        BrowserAnimationsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationImages1000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
