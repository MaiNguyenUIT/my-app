import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Blog } from '../models/blog';
import { BlogService } from '../services/blogService/blog.service';
import { BlogResponse } from '../models/blogResponse';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-public-blog-feed',
  imports: [RouterModule, CommonModule, FormsModule, CommentComponent],
  templateUrl: './public-blog-feed.component.html',
  styleUrl: './public-blog-feed.component.css'
})
export class PublicBlogFeedComponent {
  blogs: BlogResponse[] = [];

  constructor(private blogService: BlogService) {}
  
    ngOnInit(): void {
      this.blogService.getPublicBlogs().subscribe({
        next: (data) => 
          {this.blogs = data},
        
        error: (err) => console.error(err)
      });
      
    }

    postComment(id : String, comment : string) {

    }
}
