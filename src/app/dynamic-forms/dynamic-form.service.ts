import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Field } from './form-field.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  constructor(private fb: FormBuilder) {}

  formGroupGenerator(formFields: Field[], data = {}): FormGroup {
    const formControls = {};

    formFields.forEach(field => {
      formControls[field.key] = this.formControlGenerator(field, data);
    });
    console.log(formControls);

    return this.fb.group(formControls);
  }

  formControlGenerator(field: Field, data): FormControl {
    console.log(field.key);
    return new FormControl(data[field.key], {
      validators: this.mapValidator(field.validators)
    });
  }

  mapValidator(validators) {
    if (validators) {
      return Object.keys(validators).map(validationType => {
        if (validationType === 'required') {
          return Validators.required;
        }
      });
    } else {
      return [];
    }
  }
}
