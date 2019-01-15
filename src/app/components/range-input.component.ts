import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

class MinMax {
  min?: number;
  max?: number;
}

@Component({
  selector: 'app-range-input',
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
  styleUrls: ['range-input.component.scss'],
})
export class RangeInputComponent implements OnInit {
  parts: FormGroup;

  ngOnInit() {
    this.parts = new FormGroup({
      min: new FormControl(this.value.min),
      max: new FormControl(this.value.max)
    });
  }
}
