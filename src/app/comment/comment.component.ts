import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { CommentResponse } from '../models/commentResponse';
import { CommentService } from '../services/commentService/comment.service';

@Component({
  selector: 'app-comment',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})

export class CommentComponent {
  @Input() blogId!: string;
  comments : CommentResponse[] = []
  comment = {
    content: ''
  };
  newComment : string = ''
  constructor(private commentService : CommentService,
    private router : Router
  ) {}

  postComment() {
    this.comment.content = this.newComment
    this.commentService.createBlogComment(this.comment, this.blogId).subscribe({
      next : () => {
        this.router.navigate(['/blog-feed'])
      }
    })
  }

  ngOnInit(): void {
    this.commentService.getBlogComment(this.blogId).subscribe({
      next : (data) => {
        this.comments = data;
      },
    })
  }

  deleteComment(comment : CommentResponse) {
      const confirmed = window.confirm(`Are you sure you want to delete comment ${comment.content}?`);
  
      if (confirmed) {
        this.commentService.deleteBlogComment(comment.id).subscribe({
          next: () => {

          },
          error: err => {
            
          }
        });
      }
    }

}
