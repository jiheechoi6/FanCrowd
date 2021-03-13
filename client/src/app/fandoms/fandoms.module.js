"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FandomsModule = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const core_module_1 = require("../core/core.module");
const shared_module_1 = require("../shared/shared.module");
const fandoms_component_1 = require("./fandoms.component");
const fandoms_routing_module_1 = require("./fandoms-routing.module");
const fandom_selection_component_1 = require("./fandom-selection/fandom-selection.component");
const add_dialog_component_1 = require("../shared/components/add-dialog/add-dialog.component");
const fandom_detail_component_1 = require("./fandom-detail/fandom-detail.component");
const create_post_dialog_component_1 = require("./create-post-dialog/create-post-dialog.component");
const post_detail_component_1 = require("./post-detail/post-detail.component");
const add_comment_dialog_component_1 = require("./add-comment-dialog/add-comment-dialog.component");
let FandomsModule = class FandomsModule {
};
FandomsModule = __decorate([
    core_1.NgModule({
        declarations: [
            fandoms_component_1.FandomsComponent,
            fandom_selection_component_1.FandomSelectionComponent,
            add_dialog_component_1.AddDialogComponent,
            fandom_detail_component_1.FandomDetailComponent,
            create_post_dialog_component_1.CreatePostDialogComponent,
            post_detail_component_1.PostDetailComponent,
            add_comment_dialog_component_1.AddCommentDialogComponent,
        ],
        imports: [common_1.CommonModule, core_module_1.CoreModule, shared_module_1.SharedModule, fandoms_routing_module_1.FandomsRoutingModule],
    })
], FandomsModule);
exports.FandomsModule = FandomsModule;
