import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularSpendingComponent } from './regular-spending.component';

describe('RegularSpendingComponent', () => {
  let component: RegularSpendingComponent;
  let fixture: ComponentFixture<RegularSpendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularSpendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularSpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
