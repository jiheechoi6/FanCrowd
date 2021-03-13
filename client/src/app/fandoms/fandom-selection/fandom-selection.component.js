"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FandomSelectionComponent = void 0;
const core_1 = require("@angular/core");
const add_dialog_component_1 = require("src/app/shared/components/add-dialog/add-dialog.component");
let FandomSelectionComponent = class FandomSelectionComponent {
    constructor(_fandomService, _activatedRoute, dialog) {
        this._fandomService = _fandomService;
        this._activatedRoute = _activatedRoute;
        this.dialog = dialog;
        this.category = '';
        this.fandoms = [];
        this._activatedRoute.params.subscribe((params) => {
            this.category = params['category'];
        });
    }
    ngOnInit() {
        this.fandoms = this._fandomService.getFandomsByCategories(this.category);
    }
    openCreateFandomDialog() {
        const dialogRef = this.dialog.open(add_dialog_component_1.AddDialogComponent, {
            data: {
                title: 'Fandom in ' + this.category,
                categoryName: this.category,
                isCategory: false,
            },
            width: '360px',
            height: '300px',
            autoFocus: false,
        });
        dialogRef.afterClosed().subscribe(() => {
            this.fandoms = this._fandomService.getFandomsByCategories(this.category);
        });
    }
};
FandomSelectionComponent = __decorate([
    core_1.Component({
        selector: 'app-fandom-selection',
        templateUrl: './fandom-selection.component.html',
        styleUrls: ['./fandom-selection.component.sass'],
    })
], FandomSelectionComponent);
exports.FandomSelectionComponent = FandomSelectionComponent;
