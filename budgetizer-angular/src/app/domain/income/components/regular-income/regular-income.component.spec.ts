import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularIncomeComponent } from './regular-income.component';

describe('RegularIncomeComponent', () => {
  let component: RegularIncomeComponent;
  let fixture: ComponentFixture<RegularIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
