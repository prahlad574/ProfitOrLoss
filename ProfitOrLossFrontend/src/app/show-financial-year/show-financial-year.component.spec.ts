import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFinancialYearComponent } from './show-financial-year.component';

describe('ShowFinancialYearComponent', () => {
  let component: ShowFinancialYearComponent;
  let fixture: ComponentFixture<ShowFinancialYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFinancialYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFinancialYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
