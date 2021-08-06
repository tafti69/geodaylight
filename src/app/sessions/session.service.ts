import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DateRequest } from './date-request.model';
import { Sessions } from './session.model';

@Injectable({ providedIn: 'root' })
export class SessionService {
  sessions: Sessions[];

  constructor(private http: HttpClient, private authService: AuthService) {}

  getSessionsByDate(date: DateRequest): Observable<Sessions[]> {
    this.authService.refreshToken();
    return this.http.post<Sessions[]>(
      `https://webapi.geodaylight.site/sessions/getsessionsbydate`,
      date
    );
  }

  getDate(): Observable<string[]> {
    this.authService.refreshToken();
    return this.http.get<string[]>(
      'https://webapi.geodaylight.site/sessions/getdates'
    );
  }

  createSession(session: Sessions, succeded: boolean): Observable<Sessions[]> {
    this.authService.refreshToken();
    return this.http.post<Sessions[]>(
      'https://webapi.geodaylight.site/sessions',
      session
    );
  }

  getAllSessions(): Observable<Sessions[]> {
    this.authService.refreshToken();
    return this.http.get<Sessions[]>(
      'https://webapi.geodaylight.site/sessions'
    );
  }

  getSessionById(id: number): Observable<Sessions> {
    this.authService.refreshToken();
    return this.http.get<Sessions>(
      `https://webapi.geodaylight.site/sessions/${id}`
    );
  }

  updateSession(updatedSession: Sessions): Observable<void> {
    this.authService.refreshToken();
    return this.http.put<void>(
      `https://webapi.geodaylight.site/sessions/${updatedSession.id}`,
      updatedSession
    );
  }

  deleteSession(id: number): Observable<void> {
    this.authService.refreshToken();
    return this.http.delete<void>(
      `https://webapi.geodaylight.site/sessions/${id}`
    );
  }

  getCanceledSessions(): Observable<Sessions[]> {
    this.authService.refreshToken();
    return this.http.get<Sessions[]>(
      'https://webapi.geodaylight.site/sessions/GetCancelledSessions'
    );
  }

  getClosedSessions(): Observable<Sessions[]> {
    this.authService.refreshToken();
    return this.http.get<Sessions[]>(
      'https://webapi.geodaylight.site/sessions/GetClosedSessions'
    );
  }

  getCurrentClosedSessions(): Observable<Sessions[]> {
    this.authService.refreshToken();
    return this.http.get<Sessions[]>(
      'https://webapi.geodaylight.site/sessions/GetCurrentClosedSessions/'
    );
  }

  getOpenSessions(): Observable<Sessions[]> {
    this.authService.refreshToken();
    return this.http.get<Sessions[]>(
      'https://webapi.geodaylight.site/sessions/OpenSessions'
    );
  }
}
