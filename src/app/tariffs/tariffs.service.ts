import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tariffs } from './tariffs.model';

@Injectable({ providedIn: 'root' })
export class TariffService {
  tariffs: Tariffs[] = [];

  constructor(private http: HttpClient) {}

  createTariff(session: Tariffs): Observable<Tariffs[]> {
    return this.http.post<Tariffs[]>(
      'https://webapi.geodaylight.site/packages',
      session
    );
  }

  getAllTariffs(): Observable<Tariffs[]> {
    return this.http.get<Tariffs[]>('https://webapi.geodaylight.site/packages');
  }

  getTariffById(id: number): Observable<Tariffs> {
    return this.http.get<Tariffs>(
      `https://webapi.geodaylight.site/packages/${id}`
    );
  }

  updateTariff(updatedTariff: Tariffs): Observable<void> {
    return this.http.put<void>(
      `https://webapi.geodaylight.site/packages/${updatedTariff.id}`,
      updatedTariff
    );
  }

  deleteTariffs(id: number): Observable<void> {
    return this.http.delete<void>(
      `https://webapi.geodaylight.site/packages/${id}`
    );
  }
}
