import { Injectable } from '@angular/core';
import { AppEvent } from './models/app.event';
import { AppEventType } from './models/app.event.type';
import { BackendService } from './services/backend.service';
import { EventQueueService } from './services/event-queue.service';
import { ShareCompany } from './show-share-company/show-share-company.component';
import { FinancialYear } from './show-financial-year/show-financial-year.component';
import { forkJoin } from 'rxjs';
import { Sale } from './models/Sale';

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
    private eventQueue: EventQueueService) { }

  getAndMapBasicData = (currentFinancialYear: string) => {
    this.selectedFinancialYear= currentFinancialYear;
    forkJoin({
      financialYears: this.backendService.getFinancialYear(),
      shareCompanies: this.backendService.getShareCompany(),
      currentFinacialYearSalesData: this.backendService.getSalesForFinancialYear(currentFinancialYear)
    }).subscribe({
      next: (data: any) =>{
        this.financialYears= data.financialYears;
        this.shareCompanyNames= data.shareCompanies;
        this.salesForFinancialYear= data.currentFinacialYearSalesData;
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
    this.selectedFinancialYear = financialYear;
    this.getSalesForFinancialYear(this.selectedFinancialYear);
  }

  getSaleData(): Sale[]{
    return this.salesForFinancialYear;
  }

  getSalesSummaryData():Sale[]{
    return this.salesSummaryForFinancialYear.concat({
      financialYear:'2024-2025',
      saleId:'15232-4545655-5454',
      costPrice:100,
      profitOrLoss:200,
      sellingPrice:300,
      shareCompany:'LIC'
    } as Sale);
  }

  getSelectedFinancialYear(): string{
    return this.selectedFinancialYear;
  }

  getSalesForFinancialYear(financialYear: string){
    this.backendService.getSalesForFinancialYear(financialYear).subscribe({
      next: (data: any) => {
        this.salesForFinancialYear = data;
        this.eventQueue.dispatch(new AppEvent(AppEventType.SalesDataForSelectedFinacialYearLoaded, this.salesForFinancialYear));
      },
      error: error=>{
        console.log('error occured while getting sales data for financial year'+ error)
      }
    });
  }
}
