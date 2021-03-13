"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const core_module_1 = require("../core/core.module");
const shared_module_1 = require("../shared/shared.module");
const events_component_1 = require("./events.component");
const event_detail_component_1 = require("./event-detail/event-detail.component");
const event_create_dialog_component_1 = require("./event-create-dialog/event-create-dialog.component");
const create_review_dialog_component_1 = require("./create-review-dialog/create-review-dialog.component");
const events_routing_module_1 = require("./events-routing.module");
const edit_review_dialog_component_1 = require("./edit-review-dialog/edit-review-dialog.component");
let EventsModule = class EventsModule {
};
EventsModule = __decorate([
    core_1.NgModule({
        declarations: [
            events_component_1.EventsComponent,
            event_create_dialog_component_1.EventCreateDialogComponent,
            event_detail_component_1.EventDetailComponent,
            create_review_dialog_component_1.ReviewDialogComponent,
            edit_review_dialog_component_1.EditReviewDialogComponent,
        ],
        imports: [common_1.CommonModule, core_module_1.CoreModule, shared_module_1.SharedModule, events_routing_module_1.EventsRoutingModule],
    })
], EventsModule);
exports.EventsModule = EventsModule;
