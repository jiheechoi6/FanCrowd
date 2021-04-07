import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserIdentity } from 'src/app/shared/models/user-identity-token';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  userSubscription!: Subscription;
  user: UserIdentity | null = null;

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this._authService.currentUser.subscribe(
      (user) => (this.user = user)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onLogOut() {
    this._authService.logOut();
  }
}
