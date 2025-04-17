import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/userService/user.service';

@Component({
  selector: 'app-user-list',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  isLoading : boolean = false;
  users: User[] = [];
  constructor(private userService : UserService) {}

  ngOnInit(): void {
    this.userService.getAllUser().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error(err)
    });
  }

  deleteUser(user : User) {
    const confirmed = window.confirm(`Are you sure you want to delete this user ${user.username}?`);

    if (confirmed) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          
        
        },
        error: err => {
          
        }
      });
    }
  }
}
