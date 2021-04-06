import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

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

  ngOnInit() {}

  onLogIn() {
    this.isLoggingIn = true;
    this._authService
      .loginUser(this.username, this.password)
      .pipe(finalize(() => (this.isLoggingIn = false)))
      .subscribe(
        (res) => this._router.navigate(['/users', res.user.username]),
        (err) => (this.loginError = err.error.message)
      );
  }
}
