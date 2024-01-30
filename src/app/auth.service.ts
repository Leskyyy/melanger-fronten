import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loginUrl = `${environment.apiBaseUrl}/auth/authenticate`;
  private validateUrl = `${environment.apiBaseUrl}/auth/validateToken`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    // Customize the request based on your authentication API
    const body = { email: username, password: password };
    return this.http.post<string>(this.loginUrl, body);
  }

  validateToken(token: string): Observable<boolean> {
    // Customize the request based on your authentication API
    const body = { token: token };
    return this.http.post<boolean>(this.validateUrl, body);
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
