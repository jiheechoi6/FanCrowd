import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.sass']
})
export class SearchUserComponent implements OnInit {

  myControl = new FormControl();
  userList:string[] = ['one', 'two', 'three'];
  filteredOptions: Observable<string[]> | undefined;
  userToSearch:string = "";
  
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userList = this.userService.getUsernameList();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  searchUser(){
    console.log(this.userToSearch);
    this.router.navigate(['/users', this.userToSearch]);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.userList.filter(option => option.toLowerCase().includes(filterValue));
  }

}
