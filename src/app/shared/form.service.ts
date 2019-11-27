import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslationService } from '../translation.service';

@Injectable({ providedIn: "root" })
export class FormService {

    // Teh FormGroup used (to set in component's initialization)
    public form: FormGroup = null;

    // The element treated (to optionnaly set in component's initialization)
    public element: string = "global";

    constructor(private t: TranslationService) {

    }
    /**
     * Does the field have an error
     * @param field The field 
     */
    public hasError(field: string): boolean {
        if (!this.form) {
            throw "FormService need a form (FormGroup) to work properly"
        }

        const control = this.form.get(field);

        if (control) {
            return control.invalid && control.touched;
        }

        return false;
    }

    /**
     * Returns an object that can be used in [ngClass] of a input
     * @param field The field
     */
    public is_invalid(field: string): { [key: string]: boolean } {
        return { "is-invalid": this.hasError(field) };
    }

    /**
     * Error messages
     * @param field The field
     */
    public getErrorMessage(field: string): string {
        const comp = this.form.get(field);

        if (!comp) {
            throw "FormControl not found";
        }

        if (this.element == "expense") {
            switch (field) {
                case "amount":
                    if (comp.errors.required) return "Please provide an amount";

            }
        }

        // Generic error messages

        switch (field) {
            case "email":
                if (comp.errors.email) return "Email doesn't seem to be valid";
                if (comp.errors.required) return "Email is required";
                if (comp.errors.taken) return "This email is already taken";
            case 'password':
                if (comp.errors.required) return "Password is required";
                if (comp.errors.minlength) return "Password must be at least 4 characters";
                if (comp.errors.no_match) return "Password and repeated password don't match";
            case 'name':
                if (comp.errors.required) return this.t.t('global.error.name.required');
            case 'icon':
                if (comp.errors.required) return this.t.t("global.error.icon.required");
            case 'color':
                if (comp.errors.required) return "The color is required";
            case 'password_repeat':
                if (comp.errors.required) return "Please repeat the password";
                if (comp.errors.no_match) return "The passwords don't match";
            case 'date':
                if (comp.errors.required) return "The date is required";
            default:
                return `Message not set (form-error.service)`
        }
    }
}