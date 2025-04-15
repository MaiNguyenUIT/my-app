import { Component , OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { UserService } from '../services/userService/user.service';
import { AuthService } from '../services/authService/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true
})
export class HeaderComponent implements OnInit {
  userName : string = ''
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private userService: UserService,
    private router : Router
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkLoginStatus(); // Gọi mỗi khi chuyển route
      });
  }

  checkLoginStatus() {
    const token = localStorage.getItem('jwt');
    console.log("jwt", token)
    if (token) {
      this.getUserName();
    }
  }

  getUserName() {
    this.userService.getUserInformation().subscribe({
      next : (user) => {
        this.userName = user.username
        this.isLoggedIn = true
        if(user.userRole == "ROLE_ADMIN"){
          localStorage.setItem('role', "admin")
          this.isAdmin = true
        }  else {
          localStorage.setItem('role', "user")
          this.isAdmin = false
        }
      },
      error: (err) => {
        console.error('Load user failed', err);
      }
    })
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    this.isLoggedIn = false;
    this.userName = '';
  }
}
