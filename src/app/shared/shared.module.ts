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
import { FormInstructionComponent } from './form/form-instruction/form-instruction.component';
import { AutofocusDirective } from './autofocus.directive';

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

        // Form
        FormErrorComponent,
        FormInstructionComponent,

        // Btn
        NewBtnComponent, EditBtnComponent, DeleteBtnComponent, RecoverBtnComponent, RemoveBtnComponent, SecondaryBtnComponent,

        // Element deleted
        ElementDeletedComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FixedPipe,
        DeletedPipe,
        AutofocusDirective,
        LinkDirective,
        FaIconComponent,
        FormErrorComponent,
        FormInstructionComponent,
        NewBtnComponent, EditBtnComponent, DeleteBtnComponent, RecoverBtnComponent, RemoveBtnComponent, SecondaryBtnComponent,
        ElementDeletedComponent,
    ]
})
export class SharedModule { }