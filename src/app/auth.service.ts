import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private isAuthenticated: boolean = false;
  private role: string = '';
  private username: string = '';
  private userId: number = 0;

  constructor(private http: HttpClient) { }

  login(username: string, password: string, role: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}&password=${password}&role=${role}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            this.isAuthenticated = true;
            this.role = role;
            this.username = username; // Stocker le nom d'utilisateur
            this.userId = users[0].id;
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
