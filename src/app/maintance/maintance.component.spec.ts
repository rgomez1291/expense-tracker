import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintanceComponent } from './maintance.component';

describe('MaintanceComponent', () => {
  let component: MaintanceComponent;
  let fixture: ComponentFixture<MaintanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
