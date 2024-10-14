import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddFinancialYearComponent } from './add-financial-year/add-financial-year.component';
import { AddShareCompanyComponent } from './add-share-company/add-share-company.component';
import { DataSourceService } from './data-source.service';
import { FinancialYear, ShowFinancialYearComponent } from './show-financial-year/show-financial-year.component';
import { ShowShareCompanyComponent } from './show-share-company/show-share-company.component';
import { EventQueueService } from './services/event-queue.service';
import { AppEventType } from './models/app.event.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  financialYears: FinancialYear[]=[];
  currentFinacialYear: string='';

  constructor(public dialog: MatDialog, private datasource: DataSourceService, private eventQueue: EventQueueService,) {}
  ngOnInit(): void {
    this.currentFinacialYear = this.getCurrentFinancialYear()
    this.datasource.getAndMapBasicData(this.currentFinacialYear);
    this.eventQueue.On(AppEventType.BasicMetaDataLoaded).subscribe(event => {
      this.financialYears = this.datasource.getFinancialYears();
    })
  }
  
  getCurrentFinancialYear(): string {
    let currentDate = new Date();
    return currentDate.getMonth() > 3 ? currentDate.getFullYear()+'-'+(currentDate.getFullYear()+1) : (currentDate.getFullYear()-1)+'-'+(currentDate.getFullYear());
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
