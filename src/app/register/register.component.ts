import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/authService/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerModel = {
    username : '',
    email : '',
    password : '',
  }

  confirmPassword : string = ''

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {

    if (this.registerModel.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    this.authService.register(this.registerModel).subscribe({
      next : () => {
        window.alert('Register successfully');
      },
    })
  }
}
