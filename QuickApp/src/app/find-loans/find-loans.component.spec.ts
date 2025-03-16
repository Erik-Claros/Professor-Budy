import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindLoansComponent } from './find-loans.component';

describe('FindLoansComponent', () => {
  let component: FindLoansComponent;
  let fixture: ComponentFixture<FindLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindLoansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
