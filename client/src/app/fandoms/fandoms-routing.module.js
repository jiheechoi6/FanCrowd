"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FandomsRoutingModule = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const fandoms_component_1 = require("./fandoms.component");
const fandom_selection_component_1 = require("./fandom-selection/fandom-selection.component");
const fandom_detail_component_1 = require("./fandom-detail/fandom-detail.component");
const post_detail_component_1 = require("./post-detail/post-detail.component");
const routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Fandoms',
        },
        children: [
            { path: '', component: fandoms_component_1.FandomsComponent },
            {
                path: ':category',
                children: [
                    { path: '', component: fandom_selection_component_1.FandomSelectionComponent },
                    {
                        path: ':fandom',
                        children: [
                            { path: '', component: fandom_detail_component_1.FandomDetailComponent },
                            {
                                path: 'posts/:postId',
                                component: post_detail_component_1.PostDetailComponent,
                                data: {
                                    breadcrumb: {
                                        alias: 'postName',
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
let FandomsRoutingModule = class FandomsRoutingModule {
};
FandomsRoutingModule = __decorate([
    core_1.NgModule({
        declarations: [],
        imports: [common_1.CommonModule, router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule],
    })
], FandomsRoutingModule);
exports.FandomsRoutingModule = FandomsRoutingModule;
