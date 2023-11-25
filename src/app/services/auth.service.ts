import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9992/student'; 
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem(this.tokenKey, response.token); 
          }
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey); 
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); 
  }
}
