import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blogService/blog.service';
import { Blog } from '../models/blog';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
  standalone: true
})
export class BlogPostComponent implements OnInit {
  blog: Blog | undefined;

  blogUpdate = {
    title: '',
    content: '',
    priority : 0,
    public : false
  };

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router : Router
  ) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.blogService.getBlogById(id)?.subscribe({
      next: (data) => {
        this.blog = data;
        this.blogUpdate = data;
      },
      error: (err) => {
        console.error('Failed to load blog:', err);
      }
    });
  }

  saveBlog() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.blogService.updateBlog(this.blogUpdate, id).subscribe({
      next : () => {
        this.router.navigate(['/blog', this.blog?.id])
      },
    })
  }
}