import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Field} from './dynamic-forms/form-field.model';
import {US_STATES} from './dynamic-forms/geographic.data';
import {DynamicFormService} from './dynamic-forms/dynamic-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  form: FormGroup;
  formValue: any = {};

  fields: Field[] = [{
    label: 'Company Name',
    key: 'name',
    type: 'text',
    validators: Validators.required
  }, {
    label: 'Number of Employees',
    key: 'employeeCount',
    type: 'number'
  }, {
    label: 'Target Demographic',
    key: 'demographicAge',
    type: 'minMax'
  }, {
    label: 'State',
    key: 'state',
    type: 'select',
    options: US_STATES
  }];

  constructor(private df: DynamicFormService) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      age: new FormControl({})
    });
  }

  submit() {
    this.formValue = this.form.getRawValue();
  }

}
