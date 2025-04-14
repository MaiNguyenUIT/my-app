import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../services/blogService/blog.service';

@Component({
  selector: 'app-blog-create',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './blog-create.component.html',
  styleUrl: './blog-create.component.css'
})
export class BlogCreateComponent {
  blog = {
    title: '',
    content: '',
    priority : 0
  };

  constructor(private blogService : BlogService) {}
  onSubmit() {
    this.blogService.postBlog(this.blog).subscribe({
      next : () => {
        window.alert('Post blog successfully');
      },
    })
  }
}
