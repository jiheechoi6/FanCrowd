import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import NewUser from '../shared/models/new-user';
import UserDTO from '../shared/models/user-dto';
import { Token } from '@angular/compiler/src/ml_parser/lexer';


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

  ngOnInit(): void {}

  onSignUp() {
    this.isSigningUp = true;
    const newUser: NewUser = {
      email: this.email,
      fullName: this.fullName,
      password: this.password,
      username: this.username,
    };
    
    this.isSigningUp = true;

    this._authService.createNewUser(newUser)?.subscribe((res)=>{
      console.log(res);
      if (res.user) {
        // localStorage.setItem('id_token', res.token);
        // localStorage.setItem('user', JSON.stringify(res.user))
        // this._authService.currentUser.next({
        //   ...res.user
        // })
        // this._authService.token = res.token;

        this._router.navigate(['/users', res.user.username]);
      } else {
        this.signUpError = 'Signup failed';
      }
    },
    (error)=>{
      this.signUpError = error.error.message;
    })
    this.isSigningUp = false;
  }
}
