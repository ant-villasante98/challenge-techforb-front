import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MSensorComponent } from './m-sensor.component';

describe('MSensorComponent', () => {
  let component: MSensorComponent;
  let fixture: ComponentFixture<MSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
