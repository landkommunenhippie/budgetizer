import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTimeIncomeComponent } from './one-time-income.component';

describe('OneTimeIncomeComponent', () => {
  let component: OneTimeIncomeComponent;
  let fixture: ComponentFixture<OneTimeIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTimeIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTimeIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
