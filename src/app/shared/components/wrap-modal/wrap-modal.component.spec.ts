import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapModalComponent } from './wrap-modal.component';

describe('WrapModalComponent', () => {
  let component: WrapModalComponent;
  let fixture: ComponentFixture<WrapModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WrapModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WrapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
