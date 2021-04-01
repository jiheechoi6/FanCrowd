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
      console.log(res);
      this.isLoggingIn = false;
      
      if(!res.pwValid) {
        this.loginError = 'Password is wrong';
        return;
      }
      if(!res.usernameValid) {
        this.loginError = 'Username is wrong';
        return;
      }

      if (res.user) {
        localStorage.setItem('id_token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user))
        this._authService.currentUser.next({
          ...res.user,
          country: "",
          city: "",
          bio: "",
          profileUrl: "",
          attendingEvents: [],
          fandoms: []
        })
        this._authService.token = res.token;

        this._router.navigate(['/users', res.user.username]);
      }
    })
  }
}