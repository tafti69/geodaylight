import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResultByDateRequest } from '../results-by-customer/cus-by-date-res.model';
import { CusResult } from '../results-by-customer/cus-result.model';
import { CustomerResultByDate } from '../results-by-customer/customer-result-by-date.model';
import { ResultByCustomerNameReq } from '../results-by-customer/res-by-cus-name-req.model';
import { ResultByCustomerName } from '../results-by-customer/res-by-cus-name.model';
import { PackResult } from '../results-by-services/pack-result.model';
import { ResultByPackName } from '../results-by-services/res-by-pack-name.model';
import { SummaryResult } from './summary-result.model';

@Injectable({ providedIn: 'root' })
export class ResultsService {
  constructor(private http: HttpClient) {}

  getSummaryResults(): Observable<SummaryResult[]> {
    return this.http.get<SummaryResult[]>(
      'https://webapi.geodaylight.site/api/results/SummaryResults'
    );
  }

  getCurrentResults(arg: string): Observable<CusResult> {
    return this.http.get<CusResult>(
      `https://webapi.geodaylight.site/api/results/CurrentResults/${arg}`
    );
  }

  getServices(): Observable<string[]> {
    return this.http.get<string[]>(
      'https://webapi.geodaylight.site/api/results/GetServices'
    );
  }

  getYears(): Observable<string[]> {
    return this.http.get<string[]>(
      'https://webapi.geodaylight.site/api/results/years'
    );
  }

  getMonths(): Observable<string[]> {
    return this.http.get<string[]>(
      'https://webapi.geodaylight.site/api/results/month'
    );
  }

  getResultsByDateRequest(
    res: CustomerResultByDateRequest
  ): Observable<CusResult> {
    return this.http.post<CusResult>(
      'https://webapi.geodaylight.site/api/results/GetResultsByDate',
      res
    );
  }

  getResultsByCustomerName(
    res: ResultByCustomerNameReq
  ): Observable<ResultByCustomerName[]> {
    return this.http.post<ResultByCustomerName[]>(
      'https://webapi.geodaylight.site/api/results/GetResultsByCustomerName',
      res
    );
  }

  getResultsByCustomerNamep(
    res: ResultByCustomerNameReq
  ): Observable<ResultByCustomerName[]> {
    return this.http.post<ResultByCustomerName[]>(
      'https://webapi.geodaylight.site/api/results/GetResultsByCustomerNamep',
      res
    );
  }

  getCurrentResultsp(arg: string): Observable<CusResult> {
    return this.http.get<CusResult>(
      `https://webapi.geodaylight.site/api/results/CurrentResultsp/${arg}`
    );
  }

  getResultsByDateRequestp(
    res: CustomerResultByDateRequest
  ): Observable<CusResult> {
    return this.http.post<CusResult>(
      'https://webapi.geodaylight.site/api/results/GetResultsByDatep',
      res
    );
  }

  getCurrentPackResults(arg: string): Observable<PackResult> {
    return this.http.get<PackResult>(
      `https://webapi.geodaylight.site/api/results/CurrentPackResults/${arg}`
    );
  }

  getPackResultsByDateRequest(
    res: CustomerResultByDateRequest
  ): Observable<PackResult> {
    return this.http.post<PackResult>(
      'https://webapi.geodaylight.site/api/results/GetPackResultsByDate',
      res
    );
  }

  getResultsByPackName(
    res: ResultByCustomerNameReq
  ): Observable<ResultByPackName[]> {
    return this.http.post<ResultByPackName[]>(
      'https://webapi.geodaylight.site/api/results/GetResultsByPackrName',
      res
    );
  }
}
