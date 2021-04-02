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

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  onLogIn() {
    this.isLoggingIn = true;
    this._authService.loginUser(this.username, this.password)?.subscribe((res)=>{
      if (res.user) {
        localStorage.setItem('id_token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user))
        this._authService.currentUser.next({
          ...res.user,
        })
        this._authService.token = res.token;

        this._router.navigate(['/users', res.user.username]);
      }
    }, (err)=>{
      this.loginError = err.error.message;
    })
    this.isLoggingIn = false;
  }
}