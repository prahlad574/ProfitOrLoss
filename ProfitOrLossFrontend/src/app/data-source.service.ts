import { Injectable } from '@angular/core';
import { AppEvent } from './models/app.event';
import { AppEventType } from './models/app.event.type';
import { BackendService } from './services/backend.service';
import { EventQueueService } from './services/event-queue.service';
import { ShareCompany } from './show-share-company/show-share-company.component';
import { FinancialYear } from './show-financial-year/show-financial-year.component';
import { forkJoin } from 'rxjs';
import { Sale } from './models/Sale';
import { SignalRService } from './signal-r.service';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
shareCompanyNames: ShareCompany[] = [];
financialYears: FinancialYear[] = [];
selectedFinancialYear: string= '';
salesForFinancialYear: Sale[]=[];
salesSummaryForFinancialYear: Sale[]=[];

  constructor(private backendService: BackendService,
    private eventQueue: EventQueueService,
    private signalRService:SignalRService) { }

  getAndMapBasicData = (currentFinancialYear: string) => {
    this.selectedFinancialYear= currentFinancialYear;
    forkJoin({
      financialYears: this.backendService.getFinancialYear(),
      shareCompanies: this.backendService.getShareCompany(),
      currentFinacialYearSalesData: this.backendService.getSalesForFinancialYear(currentFinancialYear),
      currentFinancialYearSummaryData: this.backendService.getSalesSummaryForFinancialYear(currentFinancialYear)
    }).subscribe({
      next: (data: any) =>{
        this.financialYears= data.financialYears;
        this.shareCompanyNames= data.shareCompanies;
        this.salesForFinancialYear= data.currentFinacialYearSalesData;
        this.salesSummaryForFinancialYear= data.currentFinancialYearSummaryData;
        this.eventQueue.dispatch(new AppEvent(AppEventType.BasicMetaDataLoaded,''));
      },
      error: error=>{
        console.log('error while fetching basic meta data' + error);
      }
    })
  }

  getFinancialYears= (): FinancialYear[] => {
    return this.financialYears;
  }

  getShareCompanyNames= (): string[] => {
    return this.shareCompanyNames.map(x => x.shareCompanyName);
  }

  getShareComapnies=(): ShareCompany[] => {
    return this.shareCompanyNames;
  }

  updateSelectedFinancialYear(financialYear: string){
    this.signalRService.hubConnection.off('SaleAndSummaryUpdated-'+ this.selectedFinancialYear);
    this.selectedFinancialYear = financialYear;
    this.getSalesAndSummaryForFinancialYear(this.selectedFinancialYear);
    this.signalRService.subscribeMessage('SaleAndSummaryUpdated-'+ this.selectedFinancialYear).subscribe((message) => {
      console.log(message);
    })
  }

  getSaleData(): Sale[]{
    return this.salesForFinancialYear;
  }

  getSalesSummaryData():Sale[]{
    return this.salesSummaryForFinancialYear;
  }

  getSelectedFinancialYear(): string{
    return this.selectedFinancialYear;
  }

  getSalesAndSummaryForFinancialYear(financialYear: string){
    forkJoin({
      currentFinacialYearSalesData: this.backendService.getSalesForFinancialYear(financialYear),
      currentFinancialYearSummaryData: this.backendService.getSalesSummaryForFinancialYear(financialYear)
    }).subscribe({
      next: (data: any) => {
        this.salesForFinancialYear = data.currentFinacialYearSalesData;
        this.salesSummaryForFinancialYear= data.currentFinancialYearSummaryData;
        this.eventQueue.dispatch(new AppEvent(AppEventType.SalesDataForSelectedFinacialYearLoaded, this.salesForFinancialYear));
      },
      error: error=>{
        console.log('error occured while getting sales and summary data for financial year'+ error)
      }
    });
  }

  addMetaData(message: any){
    switch (message.metadataType){
    case 0:
      this.financialYears= this.financialYears.concat({
        financialYearId: message.id,
        financialYearName: message.name
      } as unknown as FinancialYear);
      this.eventQueue.dispatch(new AppEvent(AppEventType.FinancialYearAddedOrDeleted,''));
      break;

    case 1:
      this.shareCompanyNames= this.shareCompanyNames.concat({
        shareCompanyId: message.id,
        shareCompanyName: message.name
      }as unknown as ShareCompany);
      this.eventQueue.dispatch(new AppEvent(AppEventType.ShareCompanyAddedOrDeleted,''));
      break;
    }
  }

  deleteMetaData(message: any){
    switch (message.metadataType){
      case 0:
        this.financialYears= this.financialYears.filter(x => x.financialYearId !== message.id);
        this.eventQueue.dispatch(new AppEvent(AppEventType.FinancialYearAddedOrDeleted,''));
        break;
  
      case 1:
        this.shareCompanyNames= this.shareCompanyNames.filter(x => x.shareCompanyId !== message.id);
        this.eventQueue.dispatch(new AppEvent(AppEventType.ShareCompanyAddedOrDeleted,''));
        break;
      }
  }

}
