import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearAccountOverviewComponent } from './year-account-overview.component';

describe('YearBudgetOverviewComponent', () => {
  let component: YearAccountOverviewComponent;
  let fixture: ComponentFixture<YearAccountOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearAccountOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearAccountOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
