import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

export interface AuthResponseData {
  access_token: string;
  token_type: string;
  user_id: string;
  expires_in: number;
  creation_Time: number;
  expiration_Time: number;
  userName: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null!);
  // user: User
  private tokenExpTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(login: string, password: string) {
    let loginInfo = {
      login: login,
      password: password,
    };
    return this.http
      .post<AuthResponseData>(
        'https://webapi.geodaylight.site/api/accounts/login',
        loginInfo
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          localStorage.setItem('token', resData.access_token);
          localStorage.setItem('id', resData.userName);
          localStorage.setItem('login', login);
          localStorage.setItem('password', password);
          localStorage.setItem(
            'exptTime',
            JSON.stringify(resData.expiration_Time)
          );
          this.handleAuthentication(
            resData.user_id,
            resData.token_type,
            resData.access_token,
            resData.expires_in,
            resData.creation_Time,
            resData.expiration_Time
          );
        })
      );
  }

  refreshToken() {
    var current = Date.now() / 5000;
    var exp = parseInt(localStorage.getItem('exptTime')!);

    this.login(
      localStorage.getItem('login')!,
      localStorage.getItem('password')!
    );
  }

  logout() {
    this.user.next(null!);
    this.router.navigate(['/auth']);
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('userData');
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }

  autoLogin() {
    this.refreshToken();
    const userData: {
      login: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.login, userData.id);

    if (loadedUser) {
      this.user.next(loadedUser);
    }
  }

  autoLogout(expDuration: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.logout();
    }, expDuration);
  }

  private handleAuthentication(
    access_token: string,
    token_type: string,
    user_id: string,
    expires_in: number,
    creation_Time: number,
    expirations_Time: number
  ) {
    // const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(user_id, access_token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Неверный логин или пароль!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    return throwError(errorMessage);
  }
}
