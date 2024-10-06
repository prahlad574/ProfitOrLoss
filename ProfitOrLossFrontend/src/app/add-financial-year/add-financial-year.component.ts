import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

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

    this.backendService.addFinancialYear(this.financialYearName).subscribe({
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
