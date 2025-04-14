import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../services/blogService/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-blog',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.css'
})
export class EditBlogComponent {
  blog = {
    title: '',
    content: '',
    priority : 0
  };

  constructor(private blogService : BlogService,
    private route: ActivatedRoute,
  ) {}

  onSubmit() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.blogService.updateBlog(this.blog, id).subscribe({
      next : () => {
        window.alert('Update blog successfully');
      },
    })
  }
  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    console.log("id", id)
    this.blogService.getBlogById(id)?.subscribe({
      next: (data) => {
        this.blog = data;
      },
      error: (err) => {
        console.error('Failed to load blog:', err);
      }
    });
  }
}
