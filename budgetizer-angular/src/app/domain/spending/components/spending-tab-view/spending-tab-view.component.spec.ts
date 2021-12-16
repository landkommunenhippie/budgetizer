import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingTabViewComponent } from './spending-tab-view.component';

describe('SpendingTabViewComponent', () => {
  let component: SpendingTabViewComponent;
  let fixture: ComponentFixture<SpendingTabViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendingTabViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
