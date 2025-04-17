import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../services/blogService/blog.service';
import { Router } from '@angular/router';

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

  constructor(private blogService : BlogService,
    private router : Router
  ) {}
  onSubmit() {
    this.blogService.postBlog(this.blog).subscribe({
      next : () => {
        this.router.navigate(['/blog-feed'])
      },
    })
  }
}
