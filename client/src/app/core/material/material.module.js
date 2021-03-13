"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialModule = void 0;
const core_1 = require("@angular/core");
const button_1 = require("@angular/material/button");
const toolbar_1 = require("@angular/material/toolbar");
const card_1 = require("@angular/material/card");
const progress_spinner_1 = require("@angular/material/progress-spinner");
const dialog_1 = require("@angular/material/dialog");
const form_field_1 = require("@angular/material/form-field");
const input_1 = require("@angular/material/input");
const datepicker_1 = require("@angular/material/datepicker");
const core_2 = require("@angular/material/core");
const icon_1 = require("@angular/material/icon");
const stepper_1 = require("@angular/material/stepper");
const snack_bar_1 = require("@angular/material/snack-bar");
const select_1 = require("@angular/material/select");
const paginator_1 = require("@angular/material/paginator");
const autocomplete_1 = require("@angular/material/autocomplete");
const progress_bar_1 = require("@angular/material/progress-bar");
const MaterialModules = [
    button_1.MatButtonModule,
    toolbar_1.MatToolbarModule,
    card_1.MatCardModule,
    progress_spinner_1.MatProgressSpinnerModule,
    dialog_1.MatDialogModule,
    form_field_1.MatFormFieldModule,
    input_1.MatInputModule,
    datepicker_1.MatDatepickerModule,
    core_2.MatNativeDateModule,
    icon_1.MatIconModule,
    stepper_1.MatStepperModule,
    snack_bar_1.MatSnackBarModule,
    select_1.MatSelectModule,
    paginator_1.MatPaginatorModule,
    autocomplete_1.MatAutocompleteModule,
    progress_bar_1.MatProgressBarModule,
];
let MaterialModule = class MaterialModule {
};
MaterialModule = __decorate([
    core_1.NgModule({
        imports: [MaterialModules],
        exports: [MaterialModules],
    })
], MaterialModule);
exports.MaterialModule = MaterialModule;
