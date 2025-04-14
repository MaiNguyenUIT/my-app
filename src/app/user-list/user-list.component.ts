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
    console.log(this.users)
  }

  editUser(user : User) {
    
  }

  deleteUser(user : User) {

  }
}
