import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTimeSpendingComponent } from './one-time-spending.component';

describe('OneTimeSpendingComponent', () => {
  let component: OneTimeSpendingComponent;
  let fixture: ComponentFixture<OneTimeSpendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTimeSpendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTimeSpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
