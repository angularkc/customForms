import {
  Component, Input, OnDestroy,
} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

class MinMaxModel {
  min?: number;
  max?: number;
  constructor({min, max}: MinMaxModel = {}) {
    this.min = min;
    this.max = max;
  }
}

@Component({
  selector: 'app-min-max-input',
  template: `
    <div [formGroup]="parts">
      <input
        type="number"
        class="input-element"
        formControlName="min"
      />
      <span class="input-spacer">&ndash;</span>
      <input
        type="number"
        class="input-element"
        formControlName="max"
      />
    </div>
  `,
  styleUrls: ['min-max-input.component.scss'],
})
export class MinMaxInputComponent implements OnDestroy, ControlValueAccessor {
  parts: FormGroup;
  sub: Subscription;

  @Input()
  get value(): MinMaxModel | null {
    const {value} = this.parts;
    return new MinMaxModel(value);
  }
  set value(value: MinMaxModel) {
    const {min, max} = value ? value : new MinMaxModel();
    this.parts.setValue({ min, max });
  }

  constructor() {
    this.parts = new FormGroup({
      min: new FormControl(null),
      max: new FormControl(null)
    });
    this.sub = this.parts.valueChanges.subscribe(value => {
      this._onChange(value);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private _onChange = (_: any) => {};

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this._onChange = fn;
  }

  registerOnTouched(fn: any) {}
}
