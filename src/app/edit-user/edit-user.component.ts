import { Component } from '@angular/core';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  user = {
    name : '',
    password : '',
    role : ''
  }

  onSubmit() {

  }
}
