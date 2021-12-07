import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevStateCounterComponent } from './dev-state-counter.component';

describe('DevStateCounterComponent', () => {
  let component: DevStateCounterComponent;
  let fixture: ComponentFixture<DevStateCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevStateCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevStateCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
