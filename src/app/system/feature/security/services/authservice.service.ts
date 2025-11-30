import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from './../../../../../environment/environments';

const apiUrl = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUserFromStorage();
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${apiUrl}/login`, credentials)
      .pipe(
        tap((data: any) => {
          this.storeSession(data);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');

    this.currentUserSubject.next(null);
    this.router.navigate(['/auth']);
  }

  private storeSession(data: any) {
    localStorage.setItem('access_token', data.token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('current_user', JSON.stringify(data.data));

    this.currentUserSubject.next(data.user);
  }

  private loadUserFromStorage() {
    const data = localStorage.getItem("current_user");

    if (!data) {
      this.currentUserSubject.next(null);
      return;
    }

    try {
      this.currentUserSubject.next(JSON.parse(data));
    } catch (e) {
      console.error("Erro ao carregar dados do user:", e);
      this.currentUserSubject.next(null);
    }
  }

  refreshToken() {
    const refresh_token = localStorage.getItem('refresh_token');

    return this.http.post(`${apiUrl}/refresh`, { refresh_token })
      .pipe(
        tap((data: any) => {
          this.storeSession(data);
        })
      );
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
