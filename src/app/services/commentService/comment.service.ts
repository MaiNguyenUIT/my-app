import { Injectable } from '@angular/core';
import { CommentResponse } from '../../models/commentResponse';
import { environment } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { handleHttpError } from '../../utils/http-error-handler';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = `${environment.apiUrl}/blogs`;
  constructor(private http: HttpClient) { }

  getBlogComment(blogId : string): Observable<any> {
    const token = localStorage.getItem('jwt');
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/${blogId}/comments`, { headers });
  }
  
  createBlogComment(commentData : {content : string}, blogId : string) : Observable<any> {
    const token = localStorage.getItem('jwt');
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/${blogId}/comments`, commentData, { headers });
  }
}
