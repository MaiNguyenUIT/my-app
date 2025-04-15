import { Injectable } from '@angular/core';
import { Blog } from '../../models/blog';
import { environment } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { handleHttpError } from '../../utils/http-error-handler';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = `${environment.apiUrl}/blogs`;
  constructor(private http: HttpClient) { }

  private blogs: Blog[] = [
    
  ];

  getBlogs(): Blog[] {
    return this.blogs;
  }

  getBlogById(id: String): Observable<any> | undefined {
    const token = localStorage.getItem('jwt');
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  getUserBlogs(): Observable<any> {
    const token = localStorage.getItem('jwt');
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if(localStorage.getItem('role') == "admin"){
      return this.http.get(`${this.apiUrl}`, { headers });
    } else {
      return this.http.get(`${this.apiUrl}/user`, { headers });
    }
  }

  getPublicBlogs(): Observable<any> {
    const token = localStorage.getItem('jwt');
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if(localStorage.getItem('role') == "admin"){
      return this.http.get(`${this.apiUrl}`, { headers });
    } else {
      console.log("run")
      return this.http.get(`${this.apiUrl}/public`, { headers });
    }
  }

  postBlog(blogData: { content: string, title: string, priority: number }) : Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}`, blogData , {headers}) ;
  }

  updateBlog(blogData: { content: string, title: string, priority: number }, id : string) : Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${id}`, blogData , {headers}).pipe(
      catchError(handleHttpError)
    ) ;
  }

  publicBlog(id : string[], isPublic : boolean) : Observable<any>{
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('isPublic', isPublic.toString());
    console.log(id)
    return this.http.put(`${this.apiUrl}/public`, id , {headers, params}).pipe(
      catchError(handleHttpError)
    ) ;
  }
}