import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

/**
 * @deprecated 
 * @use shared/form.service
 */
@Injectable({
  providedIn: 'root'
})
export class FormErrorService {

  form: FormGroup = null;

  constructor() { }


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

  public is_invalid(field: string): { [key: string]: boolean } {
    return { "is-invalid": this.hasError(field) };
  }

  public getMessage(comp: AbstractControl, key: string): string {
    switch (key) {
      case "email":
        if (comp.errors.email) return "Email doesn't seem to be valid";
        if (comp.errors.required) return "Email is required";
        if (comp.errors.taken) return "This email is already taken";
      case 'password':
        if (comp.errors.required) return "Password is required";
        if (comp.errors.minlength) return "Password must be at least 4 characters";
        if (comp.errors.no_match) return "Password and repeated password don't match";
      case 'name':
        if (comp.errors.required) return "The name is required";
      case 'password_repeat':
        if (comp.errors.required) return "Please repeat the password";
        if (comp.errors.no_match) return "The passwords don't match";
      default:
        return `Message not set (form-error.service)`
    }
  }
}
