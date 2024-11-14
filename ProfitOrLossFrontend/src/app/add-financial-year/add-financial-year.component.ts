import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { FinancialYear } from '../show-financial-year/show-financial-year.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-financial-year',
  templateUrl: './add-financial-year.component.html',
  styleUrls: ['./add-financial-year.component.css']
})
export class AddFinancialYearComponent implements OnInit {
  financialYearName!: string;
  successMessage!: string;
  errorMessage!: string;
  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
  }

  saveFinancialYear(){
    this.successMessage='';
    this.errorMessage='';

    let financialYear = {
      financialYearName: this.financialYearName,
      financialYearId: uuidv4(),
    }as unknown as FinancialYear;
    
    this.backendService.addFinancialYear(financialYear).subscribe({
      next: response => {
         this.successMessage='Share company got added successfully';
      },
      error: error => {
        this.errorMessage='Error occurred while saving Share Company';
        console.log('There was an error while saving share company:', error);
      }
    });
  }
}
