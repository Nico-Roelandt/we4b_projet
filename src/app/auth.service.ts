import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private isAuthenticated: boolean = false;
  private role: string = '';
  private username: string = '';
  private userId: number = 0;

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('isAuthenticated', JSON.stringify(this.isAuthenticated));
    localStorage.setItem('role', this.role);
    localStorage.setItem('username', this.username);
    localStorage.setItem('userId', JSON.stringify(this.userId));
  }

  private loadFromLocalStorage() {
    this.isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') || 'false');
    this.role = localStorage.getItem('role') || '';
    this.username = localStorage.getItem('username') || '';
    this.userId = JSON.parse(localStorage.getItem('userId') || '0');
  }

  login(username: string, password: string, role: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password, role })
      .pipe(
        map(user => {
          if (user) {
            this.isAuthenticated = true;
            this.role = role;
            this.username = username;
            this.userId = user.id;
            this.saveToLocalStorage();
            return true;
          }
          return false;
        }),
        catchError(() => of(false))
      );
  }

  logout() {
    this.isAuthenticated = false;
    this.role = '';
    this.username = '';
    this.userId = 0;
    localStorage.clear();
  }

  getRole(): string {
    return this.role;
  }

  getUsername(): string {
    return this.username;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getStudentId(): number {
    return this.userId;
  }
  
  getTeacherId(): number {
    return this.userId;
  }
}
