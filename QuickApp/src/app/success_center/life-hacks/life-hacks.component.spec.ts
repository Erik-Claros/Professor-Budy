import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeHacksComponent } from './life-hacks.component';

describe('LifeHacksComponent', () => {
  let component: LifeHacksComponent;
  let fixture: ComponentFixture<LifeHacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LifeHacksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LifeHacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
