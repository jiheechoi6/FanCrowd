import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import NewUser from '../shared/models/new-user';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  isSigningUp = false;
  hidePassword = true;
  email = '';
  fullName = '';
  username = '';
  password = '';
  passwordConfirm = '';
  signUpError = '';

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit() {}

  onSignUp() {
    this.isSigningUp = true;
    const newUser: NewUser = {
      email: this.email,
      fullName: this.fullName,
      password: this.password,
      username: this.username,
    };
    this._authService
      .createNewUser(newUser)
      .pipe(finalize(() => (this.isSigningUp = false)))
      .subscribe(
        (res) => this._router.navigate(['/users', res.user.username]),
        (err) => (this.signUpError = err.error.message)
      );
  }
}
