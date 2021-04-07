import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.sass'],
})
export class SearchUserComponent implements OnInit {
  myControl = new FormControl();
  userList = new Map<string, string>();
  filteredOptions: Observable<Map<string, string>> | undefined;
  userProfilePhotos: Map<String, String> = new Map<String, String>();
  userToSearch: string = '';
  profilePhotos: String[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // this.userList = this.userService.getUsernameNameMap();
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filterName(value))
    // );
    // this.userProfilePhotos = this.userService.getUserProfilePhotos();
    // this.loadUsers();
  }

  searchUser() {
    this.router.navigate(['/users', this.userToSearch]);
  }

  private _filterName(value: string): Map<string, string> {
    const filterValue = value.toLowerCase();
    let filteredMap = new Map<string, string>();
    if (!this.userList) {
      return filteredMap;
    }
    for (let [key, value] of this.userList) {
      if (
        key.toLowerCase().includes(filterValue) ||
        value.toLowerCase().includes(filterValue)
      ) {
        filteredMap.set(key, value);
      }
    }
    return filteredMap;
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      users.forEach((user) => {
        this.userList.set(user.fullName, user.username);
        this.userProfilePhotos.set(user.username, user.profileURL);
      });
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterName(value))
      );
    });
  }
}
