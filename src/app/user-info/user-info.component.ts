import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../services/userService/user.service';
import { RouterModule } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-user-info',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  user = {
    username : '',
    email : '',
    picture : '',
    userRole : '',
    avatarUrl : ''
  }
  selectedFile!: File;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserInformation().subscribe({
      next : (user) => {
        this.user.username = user.username
        this.user.email = user.email
        this.user.userRole = user.userRole
        this.user.avatarUrl = user.avatarUrl
      }
    });
  }

  uploadImage() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('avatar', this.selectedFile);

    this.userService.uploadImage(formData).subscribe({
      next: (res) => {
        alert('Upload avatar successfully');
      },
      error: (err) => {
        alert('Upload avatar failed');
        console.error(err);
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    // Tạo preview ảnh
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
