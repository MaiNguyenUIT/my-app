import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) { }

  getUserInformation(): Observable<any> {
    const token = localStorage.getItem('jwt');
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get(`${this.apiUrl}/user`, { headers });
  }

  getAllUser(): Observable<any> {
    const token = localStorage.getItem('jwt');
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get(`${this.apiUrl}`, { headers });
  }
}
