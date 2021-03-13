"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsRoutingModule = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const events_component_1 = require("./events.component");
const event_detail_component_1 = require("./event-detail/event-detail.component");
const routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: events_component_1.EventsComponent,
            },
            {
                path: ':id',
                component: event_detail_component_1.EventDetailComponent,
                data: {
                    breadcrumb: {
                        alias: 'eventName',
                    },
                },
            },
        ],
    },
];
let EventsRoutingModule = class EventsRoutingModule {
};
EventsRoutingModule = __decorate([
    core_1.NgModule({
        declarations: [],
        imports: [common_1.CommonModule, router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule],
    })
], EventsRoutingModule);
exports.EventsRoutingModule = EventsRoutingModule;
