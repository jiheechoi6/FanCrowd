import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import NewUser from '../shared/models/new-user';
import UserDTO from '../shared/models/user-dto';


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
    
    this.isSigningUp = false;

    this._authService.createNewUser(newUser)?.subscribe((res)=>{
      console.log(res);
      if (res.user) {
        this._router.navigate(['/users', res.user.username]);
      } else {
        this.signUpError = 'Username is already taken';
      }
    })
    this.isSigningUp = true;
  }
}
