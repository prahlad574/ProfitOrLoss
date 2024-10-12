import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-financial-year-toggle',
  templateUrl: './financial-year-toggle.component.html',
  styleUrls: ['./financial-year-toggle.component.css']
})
export class FinancialYearToggleComponent implements OnInit {
  selectedFinancialYear?: string;
  financialYears: string[] = [];
  constructor() { }

  ngOnInit(): void {
    this.financialYears = ['2021-2022', '2022-2023', '2023-2024']
  }
  onFinancialYearChanges(){
    console.log('I am hit' + event);
  }
}
