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

  constructor(private http: HttpClient) { }

  login(username: string, password: string, role: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password, role })
      .pipe(
        map(user => {
          if (user) {
            this.isAuthenticated = true;
            this.role = role;
            this.username = username;
            this.userId = user.id;
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
