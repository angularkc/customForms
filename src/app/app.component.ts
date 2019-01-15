import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  form: FormGroup;
  formValue: any = {};

  ngOnInit() {
    this.form = new FormGroup({
      ageMin: new FormControl(
        null,
        [Validators.min(0), Validators.max(130)]
      ),
      ageMax: new FormControl(
        null,
        [Validators.min(0), Validators.max(130)]
      )
    });
  }

  submit() {
    this.formValue = this.form.getRawValue();
  }

}
