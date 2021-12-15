import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTabViewComponent } from './income-tab-view.component';

describe('IncomeTabViewComponent', () => {
  let component: IncomeTabViewComponent;
  let fixture: ComponentFixture<IncomeTabViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeTabViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
