import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blogService/blog.service';
import { Blog } from '../models/blog';
import { Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogResponse } from '../models/blogResponse';
import { BlogDisplay } from '../models/blogDisplay';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  imports: [RouterModule, CommonModule, FormsModule],
  standalone: true
})
export class BlogListComponent implements OnInit {
  blogs: BlogDisplay[] = [];
  blog : Blog[] = [];
  selectAll: boolean = false;

  updateBlog = {
    title: '',
    content: '',
    priority : 0,
    public : false
  };
  
  constructor(private blogService: BlogService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.blogService.getUserBlogs().subscribe({
      next: (data: Blog[]) => {
        this.blogs = data.map((blog: Blog) => ({
          blog: blog,         
          checkBox: false     
        }));
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit(blog : BlogDisplay) {
    this.updateBlog.content = blog.blog.content
    this.updateBlog.public = blog.blog.public
    this.updateBlog.title = blog.blog.title
    this.blogService.updateBlog(this.updateBlog, blog.blog.id).subscribe({
      next : () => {
        this.router.navigate(['/blogs'])
      },
    })
  }

save(isPublic : string) {
  
  const confirmed = window.confirm(`Are you sure you want to ${isPublic}?`);
  if(confirmed){
    const selectedBlogs = this.blogs
    .filter(blog => blog.checkBox)
    .map(blog => blog.blog);

    this.blogService.updateBlogStatus(selectedBlogs, isPublic).subscribe({
      next: () => {
        console.log('Public blogs updated!');
      },
      error: (err) => {
        console.error('Failed to update:', err);
      }
    });
  }
}

setAllPublic() {
  this.selectAll = !this.selectAll;
  this.blogs.forEach(blog => {
    blog.checkBox = this.selectAll;
  });
}

setSameStatus(status : boolean): void {
  this.blogs.forEach(blogDisplay => {
    if (blogDisplay.checkBox) {
      blogDisplay.blog.public = status;
    }
  });
}

deleteBlog(blog : BlogDisplay) {
  const confirmed = window.confirm(`Are you sure you want to delete blog ${blog.blog.title}?`);

    if (confirmed) {
      this.blogService.deleteBlog(blog.blog.id).subscribe({
        next: () => {
          
        
        },
        error: err => {
          
        }
      });
    }
}
}