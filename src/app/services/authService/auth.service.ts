import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: { username: string, password: string }[] = [];

  register(username: string, password: string): Observable<boolean> {
    // Check if user already exists
    if (this.users.some(user => user.username === username)) {
      return throwError(() => new Error('Username already exists'));
    }
    this.users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(this.users));
    return of(true);
  }

  login(username: string, password: string): Observable<boolean> {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = this.users.find(user => user.username === username && user.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return of(true);
    }
    return throwError(() => new Error('Invalid username or password'));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): { username: string, password: string } | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}