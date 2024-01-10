import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDronesComponent } from './view-drones.component';

describe('ViewDronesComponent', () => {
  let component: ViewDronesComponent;
  let fixture: ComponentFixture<ViewDronesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDronesComponent]
    });
    fixture = TestBed.createComponent(ViewDronesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
