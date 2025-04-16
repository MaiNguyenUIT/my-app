import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blogService/blog.service';
import { Blog } from '../models/blog';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  imports: [RouterModule, CommonModule, FormsModule],
  standalone: true
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  selectAll: boolean = false;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getUserBlogs().subscribe({
      next: (data) => 
        {this.blogs = data},
      
      error: (err) => console.error(err)
    });
    
  }

setPublic(status: boolean) {
  const confirmed = window.confirm(`Bạn có chắc chắn muốn public các blog đã chọn?`);
  if(confirmed){
    this.blogService.publicBlog(this.getSelectedBlogIds(), status).subscribe({
      next: () => {
        console.log('Public blogs updated!');
      },
      error: (err) => {
        console.error('Failed to update:', err);
      }
    });
  }
}

getSelectedBlogIds(): string[] {
  return this.blogs
    .filter(blog => blog.public)
    .map(blog => blog.id);
}

setAllPublic() {
  this.selectAll = !this.selectAll;
  this.blogs.forEach(blog => blog.public = this.selectAll);
}

deleteBlog(blog : Blog) {
  const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa blog ${blog.content}?`);

    if (confirmed) {
      this.blogService.deleteBlog(blog.id).subscribe({
        next: () => {
          
        
        },
        error: err => {
          
        }
      });
    }
}
}