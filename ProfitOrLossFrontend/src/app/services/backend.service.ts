import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaleChange } from '../models/SaleChange';
import { ShareCompany } from '../show-share-company/show-share-company.component';
import { FinancialYear } from '../show-financial-year/show-financial-year.component';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  readonly backendUrl = "https://localhost:7219"; 
  header = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }
  
  addShareCompany(data: ShareCompany) {
    return this.http.post(this.backendUrl + '/AddShareCompany', data, {headers: this.header});
  }

  addFinancialYear(data: FinancialYear):Observable<any> {
    return this.http.post(this.backendUrl + '/AddFinancialYear', data, {headers: this.header});
  }

  getFinancialYear():Observable<any>{
    return this.http.get(this.backendUrl + '/GetFinancialYear');
  }

  getShareCompany():Observable<any>{
    return this.http.get(this.backendUrl + '/GetShareCompany');
  }

  deleteFinancialYear(financialYearId: string){
    return this.http.delete(this.backendUrl + '/DeleteFinancialYear/' + financialYearId, {headers: this.header});
  }
  
  deleteShareCompany(shareCompanyId: string){
    return this.http.delete(this.backendUrl + '/DeleteShareCompany/' + shareCompanyId, {headers: this.header});
  }

  updateSale(saleChange: SaleChange){
    return this.http.post(this.backendUrl + '/UpdateSale', saleChange, {headers: this.header});
  }
  
  getSalesForFinancialYear(financialYear: string){
    return this.http.get(this.backendUrl + '/getSalesForFinancialYear/' + financialYear, {headers: this.header});
  }
  
  getSalesSummaryForFinancialYear(financialYear: string){
    return this.http.get(this.backendUrl + '/getSalesSummaryForFinacialYear/' + financialYear, {headers: this.header});
  }
}
