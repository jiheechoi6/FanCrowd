import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  hidePassword = true;
  loginError = '';
  isLoggingIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogIn() {
    this.isLoggingIn = true;
    const user = this.authService.loginUser(this.username, this.password);
    this.isLoggingIn = false;
    if (user) {
      console.log(user, 'has logged in');
      this.router.navigate(['/users', user.username]);
    } else {
      this.loginError = 'Username or password is wrong';
    }
  }
}
