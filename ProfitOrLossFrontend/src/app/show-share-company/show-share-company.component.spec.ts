import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowShareCompanyComponent } from './show-share-company.component';

describe('ShowShareCompanyComponent', () => {
  let component: ShowShareCompanyComponent;
  let fixture: ComponentFixture<ShowShareCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowShareCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowShareCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
