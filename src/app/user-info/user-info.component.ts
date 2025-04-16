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
    userRole : ''
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserInformation().subscribe({
      next : (user) => {
        this.user.username = user.username
        this.user.email = user.email
        this.user.userRole = user.userRole
      }
    });
  }

}
