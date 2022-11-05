import {Component, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddFinancialYearComponent } from './add-financial-year/add-financial-year.component';
import { AddShareCompanyComponent } from './add-share-company/add-share-company.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  constructor(public dialog: MatDialog) {}
  

  openAddFinancialYearDialog() {
    const dialogRef = this.dialog.open(AddFinancialYearComponent, {restoreFocus: false});
  }
  openAddShareCompanyDialog() {
    const dialogRef = this.dialog.open(AddShareCompanyComponent, {restoreFocus: false});
  }
}
