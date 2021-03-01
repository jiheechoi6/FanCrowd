import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import NewUser from '../shared/models/new-user';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSignUp() {
    this.isSigningUp = true;
    const newUser: NewUser = {
      email: this.email,
      fullName: this.fullName,
      password: this.password,
      username: this.username,
    };
    const user = this.authService.createNewUser(newUser);
    this.isSigningUp = false;
    if (user) {
      this.router.navigate(['/users', user.username]);
    } else {
      this.signUpError = 'Username is already taken';
    }
  }
}
