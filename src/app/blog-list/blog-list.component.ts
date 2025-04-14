import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blogService/blog.service';
import { Blog } from '../models/blog';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  imports: [RouterModule, CommonModule],
  standalone: true
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getUserBlogs().subscribe({
      next: (data) => this.blogs = data,
      error: (err) => console.error(err)
    });
    console.log(this.blogs)
  }
}