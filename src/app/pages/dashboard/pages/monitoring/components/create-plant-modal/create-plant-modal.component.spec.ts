import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlantModalComponent } from './create-plant-modal.component';

describe('CreatePlantModalComponent', () => {
  let component: CreatePlantModalComponent;
  let fixture: ComponentFixture<CreatePlantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePlantModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePlantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
