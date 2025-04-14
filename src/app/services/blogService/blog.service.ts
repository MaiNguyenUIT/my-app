import { Injectable } from '@angular/core';
import { Blog } from '../../models/blog';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = `${environment.apiUrl}/blogs`;
  private blogs: Blog[] = [
    { id: 1, title: 'First Blog Post', content: 'This is the content of the first blog post.', date: '2025-04-01' },
    { id: 2, title: 'Second Blog Post', content: 'This is the content of the second blog post.', date: '2025-04-02' },
  ];

  getBlogs(): Blog[] {
    return this.blogs;
  }

  getBlogById(id: number): Blog | undefined {
    return this.blogs.find(blog => blog.id === id);
  }
}