"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const spinner_component_1 = require("./components/spinner/spinner.component");
const core_module_1 = require("../core/core.module");
const delete_dialog_component_1 = require("./components/delete-dialog/delete-dialog.component");
const events_summary_card_component_1 = require("./components/events-summary-card/events-summary-card.component");
const review_stars_component_1 = require("./components/review-stars/review-stars.component");
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    core_1.NgModule({
        declarations: [
            spinner_component_1.SpinnerComponent,
            delete_dialog_component_1.DeleteDialogComponent,
            events_summary_card_component_1.EventsSummaryCardComponent,
            review_stars_component_1.ReviewStarsComponent,
        ],
        imports: [common_1.CommonModule, core_module_1.CoreModule],
        exports: [
            spinner_component_1.SpinnerComponent,
            delete_dialog_component_1.DeleteDialogComponent,
            events_summary_card_component_1.EventsSummaryCardComponent,
            review_stars_component_1.ReviewStarsComponent,
        ],
    })
], SharedModule);
exports.SharedModule = SharedModule;
