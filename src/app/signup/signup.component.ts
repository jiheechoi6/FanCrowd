import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

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
    console.log(
      this.username,
      this.password,
      this.passwordConfirm,
      this.fullName
    );
  }
}
