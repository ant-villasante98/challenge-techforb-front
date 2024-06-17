import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantHistoryComponent } from './plant-history.component';

describe('PlantHistoryComponent', () => {
  let component: PlantHistoryComponent;
  let fixture: ComponentFixture<PlantHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
