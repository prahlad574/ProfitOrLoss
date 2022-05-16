import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShareCompanyComponent } from './add-share-company.component';

describe('AddShareCompanyComponent', () => {
  let component: AddShareCompanyComponent;
  let fixture: ComponentFixture<AddShareCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShareCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShareCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
