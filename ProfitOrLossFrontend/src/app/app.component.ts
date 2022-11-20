import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddFinancialYearComponent } from './add-financial-year/add-financial-year.component';
import { AddShareCompanyComponent } from './add-share-company/add-share-company.component';
import { DataSourceService } from './data-source.service';
import { ShowFinancialYearComponent } from './show-financial-year/show-financial-year.component';
import { ShowShareCompanyComponent } from './show-share-company/show-share-company.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  

  constructor(public dialog: MatDialog, private datasource: DataSourceService) {}
  ngOnInit(): void {
    this.datasource.getAndMapShareCompanies();
  }
  

  openAddFinancialYearDialog() {
    const dialogRef = this.dialog.open(AddFinancialYearComponent, {restoreFocus: false});
  }
  openAddShareCompanyDialog() {
    const dialogRef = this.dialog.open(AddShareCompanyComponent, {restoreFocus: false});
  }

  openShowFinancialYearDialog(){
    const dialogRef = this.dialog.open(ShowFinancialYearComponent, {restoreFocus: false});
  }
  openShowShareCompanyDialog(){
    const dialogRef = this.dialog.open(ShowShareCompanyComponent, {restoreFocus: false});
  }
}
