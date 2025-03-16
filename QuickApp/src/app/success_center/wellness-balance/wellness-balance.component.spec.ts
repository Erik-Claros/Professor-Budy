import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellnessBalanceComponent } from './wellness-balance.component';

describe('WellnessBalanceComponent', () => {
  let component: WellnessBalanceComponent;
  let fixture: ComponentFixture<WellnessBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WellnessBalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WellnessBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
