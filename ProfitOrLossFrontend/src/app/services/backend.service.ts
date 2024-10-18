import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '../models/Sale';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  readonly backendUrl = "https://localhost:7219"; 
  header = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }
  
  addShareCompany(shareCompanyName: string) {
    const data = { shareCompanyName }
    return this.http.post(this.backendUrl + '/AddShareCompany', data, {headers: this.header});
  }

  addFinancialYear(financialYearName: string):Observable<any> {
  
    const data = { financialYearName }

    return this.http.post(this.backendUrl + '/AddFinancialYear', data, {headers: this.header});
  }

  getFinancialYear():Observable<any>{
    return this.http.get(this.backendUrl + '/GetFinancialYear');
  }

  getShareCompany():Observable<any>{
    return this.http.get(this.backendUrl + '/GetShareCompany');
  }

  deleteFinancialYear(financialYearId: number){
    return this.http.delete(this.backendUrl + '/DeleteFinancialYear/' + financialYearId, {headers: this.header});
  }
  
  deleteShareCompany(shareCompanyId: number){
    return this.http.delete(this.backendUrl + '/DeleteShareCompany/' + shareCompanyId, {headers: this.header});
  }

  updateSale(sale: Sale){
    
    return this.http.post(this.backendUrl + '/UpdateSale', sale, {headers: this.header});
  }
  
  getSalesForFinancialYear(financialYear: string){
    return this.http.get(this.backendUrl + '/getSalesForFinancialYear/' + financialYear, {headers: this.header});
  }
  
  getSalesSummaryForFinancialYear(financialYear: string){
    return this.http.get(this.backendUrl + '/getSalesSummaryForFinacialYear/' + financialYear, {headers: this.header});
  }
}
