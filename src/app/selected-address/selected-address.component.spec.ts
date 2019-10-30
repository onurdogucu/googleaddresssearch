import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedAddressComponent } from './selected-address.component';

describe('SelectedAddressComponent', () => {
  let component: SelectedAddressComponent;
  let fixture: ComponentFixture<SelectedAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
