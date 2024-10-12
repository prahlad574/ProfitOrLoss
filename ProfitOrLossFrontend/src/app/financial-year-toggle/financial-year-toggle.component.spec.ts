import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialYearToggleComponent } from './financial-year-toggle.component';

describe('FinancialYearToggleComponent', () => {
  let component: FinancialYearToggleComponent;
  let fixture: ComponentFixture<FinancialYearToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialYearToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialYearToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
