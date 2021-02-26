import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  firstname = ""
  lastname = ""
  username = ""
  password = ""
  passwordConfirm = ""
  errorMessage = ""
  signUpFailed = false

  constructor(
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }

  onSignUp(){
    if(this.username=="" || this.firstname=="" || this.lastname=="" || this.password==""){
      this.errorMessage = "Please fill out all the fields"
      this.signUpFailed = true
    }else if(this.password != this.passwordConfirm){
      this.errorMessage = "Please confirm your password correctly"
      this.signUpFailed = true
    }else{
      this.authService.addNewUser(this.username, this.firstname, this.lastname, this.password, 'user');
      this.router.navigate(['/events']);
    }
  }
}
