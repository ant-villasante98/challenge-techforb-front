import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MPlantComponent } from './m-plant.component';

describe('MPlantComponent', () => {
  let component: MPlantComponent;
  let fixture: ComponentFixture<MPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MPlantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
