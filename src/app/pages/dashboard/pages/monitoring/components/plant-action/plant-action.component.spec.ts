import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantActionComponent } from './plant-action.component';

describe('PlantActionComponent', () => {
  let component: PlantActionComponent;
  let fixture: ComponentFixture<PlantActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
