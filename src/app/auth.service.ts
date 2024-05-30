import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private role: string = '';

  login(username: string, password: string, role: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      this.role = role;
      return true;
    }
    if (username === 'student' && password === 'student') {
      this.isAuthenticated = true;
      this.role = role;
      return true;
    }
    if (username === 'teacher' && password === 'teacher') {
      this.isAuthenticated = true;
      this.role = role;
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated = false;
    this.role = '';
  }

  getRole(): string {
    return this.role;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
