import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  readonly backendUrl = "https://localhost:7219"; 
  constructor(private http: HttpClient) { }
  addShareCompany(shareCompanyName: string) {
    return this.http.post(this.backendUrl + '/AddShareCompany', shareCompanyName);
  }
  addFinancialYear(financialYearName: string):Observable<any> {
  
    const data = { financialYearName }
    var header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.backendUrl + '/AddFinancialYear', data, {headers: header});
  }

  getFinancialYear():Observable<any>{
    return this.http.get(this.backendUrl + '/GetFinancialYear');
  }
}
