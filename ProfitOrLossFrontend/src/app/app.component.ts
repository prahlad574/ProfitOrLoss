import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddFinancialYearComponent } from './add-financial-year/add-financial-year.component';
import { AddShareCompanyComponent } from './add-share-company/add-share-company.component';
import { DataSourceService } from './data-source.service';
import { FinancialYear, ShowFinancialYearComponent } from './show-financial-year/show-financial-year.component';
import { ShowShareCompanyComponent } from './show-share-company/show-share-company.component';
import { EventQueueService } from './services/event-queue.service';
import { AppEventType } from './models/app.event.type';
import { SignalRService } from './signal-r.service';
import { SignalRDataSourceService } from './services/signal-rdata-source.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  financialYears: FinancialYear[]=[];
  currentFinacialYear: string='';

  constructor(
    public dialog: MatDialog, 
    private datasource: DataSourceService, 
    private eventQueue: EventQueueService, 
    private signalRService: SignalRService,
    private signalRDataSource: SignalRDataSourceService) {}
  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.subscribeMessage('AddOrDeleteMetadata').subscribe((message) => {
      this.signalRDataSource.addOrDeleteMetadata(message);
    });
    this.currentFinacialYear = this.getCurrentFinancialYear()
    this.datasource.getAndMapBasicData(this.currentFinacialYear);
    this.eventQueue.On(AppEventType.BasicMetaDataLoaded).subscribe(event => {
      this.loadFinancialYears();
    })
    this.eventQueue.On(AppEventType.FinancialYearAddedOrDeleted).subscribe(event => {
      this.loadFinancialYears();
    })
  }
  
  loadFinancialYears() {
    this.financialYears = this.datasource.getFinancialYears();
    if(this.financialYears.length > 0 ) {
      this.currentFinacialYear = this.getCurrentFinancialYear();
      this.currentFinacialYear= this.financialYears.map(x => x.financialYearName).includes(this.currentFinacialYear) ? this.currentFinacialYear : this.financialYears[0].financialYearName;
    }
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
