import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslationService } from '../translation.service';

/*Not provided in root, each form should have it's own instance (providers)*/
@Injectable()
export class FormService {

    // The FormGroup used (to set in component's initialization)
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

        if (this.element === "expense") {
            switch (field) {
                case "amount":
                    if (comp.errors.required) return this.t.t("expense.error.amount.required");

            }
        }

        if (this.element === "people") {
            switch (field) {
                case "metIn":
                    if (comp.errors.required) return this.t.t("people.error.metIn.required");
                case "met_at":
                    if (comp.errors.required) return this.t.t("people.error.met_at.required");

            }
        }

        if (this.element === "event") {
            switch (field) {
                case "title":
                    if (comp.errors.required) return this.t.t("event.error.title.required");
            }
        }

        if (this.element === "contact") {
            switch (field) {
                case "message":
                    if (comp.errors.required) return this.t.t("contact.error.message.required");
            }
        }

        // Generic error messages

        switch (field) {
            case "email":
                if (comp.errors.email) return this.t.t("global.error.email.invalid");// "Email doesn't seem to be valid";
                if (comp.errors.required) return this.t.t("global.error.email.required");// "Email is required";
                if (comp.errors.taken) return this.t.t("global.error.email.taken");// "This email is already taken";
            case 'password':
                if (comp.errors.required) return this.t.t("global.error.password.required");//"Password is required";
                if (comp.errors.minlength) return this.t.t("global.error.password.minLength");//"Password must be at least 4 characters";
                if (comp.errors.no_match) return this.t.t("global.error.password.no_match");//"Password and repeated password don't match";
            case 'name':
                if (comp.errors.required) return this.t.t('global.error.name.required');
            case 'icon':
                if (comp.errors.required) return this.t.t("global.error.icon.required");
            case 'color':
                if (comp.errors.required) return this.t.t("global.error.color.required");//"The color is required";
            case 'password_repeat':
                if (comp.errors.required) return this.t.t("global.error.password_repeat.required");//"Please repeat the password";
                if (comp.errors.no_match) return this.t.t("global.error.password_repeat.no_match");//"The passwords don't match";
            case 'date':
                if (comp.errors.required) return this.t.t("global.error.date.required");//"The date is required";
            case 'firstName':
                if (comp.errors.required) return this.t.t("global.error.firstName.required");//"First name is required";
            default:
                return this.t.t("global.error.not_set");//`Message not set (form-error.service)`
        }
    }
}