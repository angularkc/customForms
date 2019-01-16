import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  form: FormGroup;
  formValue: any = {};

  ngOnInit() {
    this.form = new FormGroup({
      age: new FormControl({})
    });
  }

  submit() {
    this.formValue = this.form.getRawValue();
  }

}
