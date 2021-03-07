import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import UserDTO from 'src/app/shared/models/user-dto';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  userSubscription!: Subscription;
  user: UserDTO | null = null;

  myControl = new FormControl();
  options:string[] = ['one', 'two', 'three'];
  filteredOptions: Observable<string[]> | undefined;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this._authService.currentUser.subscribe(
      (user) => (this.user = user)
    );

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onLogOut() {
    this._authService.logOut();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    console.log(this.options.filter(option => option.toLowerCase().includes(filterValue)))
    this.filteredOptions
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
