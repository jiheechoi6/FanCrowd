import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, startWith, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.sass']
})
export class SearchUserComponent implements OnInit {

  myControl = new FormControl();
  userList:Map<string, string> = new Map();
  filteredOptions: Observable<Map<string, string>> | undefined;
  userToSearch:string = "";
  
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userList = this.userService.getUsernameNameMap();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterName(value))
      );
  }

  searchUser(){
    console.log(this.userToSearch);
    this.router.navigate(['/users', this.userToSearch]);
  }

  private _filterName(value: string): Map<string, string> {
    const filterValue = value.toLowerCase();
    let filteredMap = new Map<string, string>();

    for(let [key, value] of this.userList){
      if(key.toLowerCase().includes(filterValue) || value.toLowerCase().includes(filterValue)){
        filteredMap.set(key, value);
      }
    }
    return filteredMap;
  }

}
