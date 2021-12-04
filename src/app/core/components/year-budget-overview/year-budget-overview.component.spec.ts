import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearBudgetOverviewComponent } from './year-budget-overview.component';

describe('YearBudgetOverviewComponent', () => {
  let component: YearBudgetOverviewComponent;
  let fixture: ComponentFixture<YearBudgetOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearBudgetOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearBudgetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
