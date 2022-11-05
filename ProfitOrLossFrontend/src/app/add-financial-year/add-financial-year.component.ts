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

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
  }

  saveFinancialYear(){
    
    this.backendService.getFinancialYear().subscribe(s => console.log(s));
    this.backendService.getShareCompany().subscribe(s => console.log(s));
    const gud = this.backendService.addFinancialYear(this.financialYearName).subscribe(r => console.log(r));
  }
}
