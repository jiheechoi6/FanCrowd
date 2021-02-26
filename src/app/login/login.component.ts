import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  username = ""
  password = ""
  loginfailed = false
  errorMessage = ""

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  onLogIn(){
    if(this.authService.getPasswordByUsername(this.username) == this.password){
      this.authService.currentLoggedInUser = this.username
      this.loginfailed = false
      this.router.navigate(['/events'])
    }else{
      if(this.username == "" || this.password == ""){
        this.errorMessage = "Please enter your username and password"
      }else{
        this.errorMessage = "Your username or password is wrong"
      }
      this.loginfailed = true
    }
  }
}
