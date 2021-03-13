"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const material_module_1 = require("./material/material.module");
const forms_1 = require("@angular/forms");
const navbar_component_1 = require("./navbar/navbar.component");
const router_1 = require("@angular/router");
const page_footer_component_1 = require("./page-footer/page-footer.component");
const xng_breadcrumb_1 = require("xng-breadcrumb");
const search_user_component_1 = require("./navbar/search-user/search-user.component");
const owl_datetime_picker_module_1 = require("./owl-datetime-picker/owl-datetime-picker.module");
const spaces_to_hyphen_pipe_1 = require("./pipes/spaces-to-hyphen.pipe");
const hyphen_to_spaces_pipe_1 = require("./pipes/hyphen-to-spaces.pipe");
const layout_component_1 = require("./layout/layout.component");
let CoreModule = class CoreModule {
};
CoreModule = __decorate([
    core_1.NgModule({
        declarations: [
            navbar_component_1.NavbarComponent,
            page_footer_component_1.PageFooterComponent,
            spaces_to_hyphen_pipe_1.SpacesToHyphenPipe,
            hyphen_to_spaces_pipe_1.HyphenToSpacesPipe,
            search_user_component_1.SearchUserComponent,
            layout_component_1.LayoutComponent,
        ],
        imports: [
            common_1.CommonModule,
            material_module_1.MaterialModule,
            forms_1.FormsModule,
            router_1.RouterModule,
            forms_1.ReactiveFormsModule,
            owl_datetime_picker_module_1.OwlDateTimePickerModule,
            xng_breadcrumb_1.BreadcrumbModule,
        ],
        exports: [
            material_module_1.MaterialModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            navbar_component_1.NavbarComponent,
            page_footer_component_1.PageFooterComponent,
            router_1.RouterModule,
            owl_datetime_picker_module_1.OwlDateTimePickerModule,
            spaces_to_hyphen_pipe_1.SpacesToHyphenPipe,
            hyphen_to_spaces_pipe_1.HyphenToSpacesPipe,
            xng_breadcrumb_1.BreadcrumbModule,
            layout_component_1.LayoutComponent,
        ],
    })
], CoreModule);
exports.CoreModule = CoreModule;
