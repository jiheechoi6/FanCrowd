"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUserComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const operators_1 = require("rxjs/operators");
let SearchUserComponent = class SearchUserComponent {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
        this.myControl = new forms_1.FormControl();
        this.userList = new Map();
        this.userProfilePhotos = new Map();
        this.userToSearch = '';
        this.profilePhotos = [];
    }
    ngOnInit() {
        this.userList = this.userService.getUsernameNameMap();
        this.filteredOptions = this.myControl.valueChanges.pipe(operators_1.startWith(''), operators_1.map((value) => this._filterName(value)));
        this.userProfilePhotos = this.userService.getUserProfilePhotos();
    }
    searchUser() {
        this.router.navigate(['/users', this.userToSearch]);
    }
    _filterName(value) {
        const filterValue = value.toLowerCase();
        let filteredMap = new Map();
        for (let [key, value] of this.userList) {
            if (key.toLowerCase().includes(filterValue) ||
                value.toLowerCase().includes(filterValue)) {
                filteredMap.set(key, value);
            }
        }
        return filteredMap;
    }
};
SearchUserComponent = __decorate([
    core_1.Component({
        selector: 'app-search-user',
        templateUrl: './search-user.component.html',
        styleUrls: ['./search-user.component.sass'],
    })
], SearchUserComponent);
exports.SearchUserComponent = SearchUserComponent;
