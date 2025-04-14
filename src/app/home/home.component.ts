import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { BlogCreateComponent } from "../blog-create/blog-create.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/authService/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule, BlogCreateComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {

  isLoggedIn = false;
  constructor(private authService : AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
