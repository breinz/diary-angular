import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FixedPipe } from './fixed.pipe';
import { FaIconComponent } from './fa-icon/fa-icon.component';
import { LinkDirective } from './link.directive';
import { FormErrorComponent } from './form/form-error/form-error.component';
import { NewBtnComponent } from './btn/new-btn/new-btn.component';
import { EditBtnComponent } from './btn/edit-btn/edit-btn.component';
import { DeleteBtnComponent } from './btn/delete-btn/delete-btn.component';
import { RecoverBtnComponent } from './btn/recover-btn/recover-btn.component';
import { RemoveBtnComponent } from './btn/remove-btn/remove-btn.component';
import { SecondaryBtnComponent } from './btn/secondary-btn/secondary-btn.component';
import { DeletedPipe } from './deleted.pipe';
import { ElementDeletedComponent } from './element-deleted/element-deleted.component';
import { OldFormInstructionComponent } from './form/form-instruction/old-form-instruction.component';
import { AutofocusDirective } from './autofocus.directive';
import { FormInstructionComponent } from './form/form-instruction/form-instruction.component';
import { ModalComponent } from './modal/modal.component';
import { CategoryLinkComponent } from './category/link/category-link.component';
import { RouterModule } from '@angular/router';
import { CategoryBadgeComponent } from './category/badge/category-badge.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingAlertComponent } from './loading-alert/loading-alert.component';

@NgModule({
    declarations: [
        // Pipes
        FixedPipe,
        DeletedPipe,

        // Directives
        AutofocusDirective,
        LinkDirective,

        // Icon
        FaIconComponent,
        SpinnerComponent,

        // Components
        LoadingAlertComponent,

        // Form
        FormErrorComponent,
        FormInstructionComponent,
        OldFormInstructionComponent,

        // Btn
        NewBtnComponent, EditBtnComponent, DeleteBtnComponent, RecoverBtnComponent, RemoveBtnComponent, SecondaryBtnComponent,

        // Category
        CategoryLinkComponent, CategoryBadgeComponent,

        // Element deleted
        ElementDeletedComponent,

        // Modal
        ModalComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        FixedPipe,
        DeletedPipe,
        AutofocusDirective,
        LinkDirective,
        FaIconComponent,
        SpinnerComponent,
        LoadingAlertComponent,
        FormErrorComponent,
        FormInstructionComponent,
        OldFormInstructionComponent,
        NewBtnComponent, EditBtnComponent, DeleteBtnComponent, RecoverBtnComponent, RemoveBtnComponent, SecondaryBtnComponent,
        ElementDeletedComponent,
        ModalComponent,
        CategoryLinkComponent,
        CategoryBadgeComponent
    ]
})
export class SharedModule { }