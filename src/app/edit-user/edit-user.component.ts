import { Component } from '@angular/core';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/userService/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  user = {
    email : '',
    userRole : ''
  }

  constructor(private userService : UserService,
    private route: ActivatedRoute,
  ) {}

  onSubmit() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.userService.updateUser(this.user, id).subscribe({
      next : () => {
        window.alert('Update user successfully');
      },
    })
  }
}
