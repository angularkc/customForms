import {
  Component, ElementRef, HostBinding, Input, OnDestroy, Optional, Self,
} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NgControl} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {MatFormFieldControl} from '@angular/material';
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

class MinMaxModel {
  min?: number;
  max?: number;
  constructor({min = null, max = null}: MinMaxModel = {}) {
    this.min = min;
    this.max = max;
  }
}

@Component({
  selector: 'app-min-max-input',
  template: `
    <div class="input-container" [formGroup]="parts">
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
  providers: [
    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   useExisting: forwardRef(() => MinMaxInputComponent),
    //   multi: true
    // },
    {
      provide: MatFormFieldControl,
      useExisting: MinMaxInputComponent
    }
  ]
})
export class MinMaxInputComponent
  implements OnDestroy,
    ControlValueAccessor,
    MatFormFieldControl<MinMaxModel> {
  static nextId = 0;

  parts: FormGroup;
  sub: Subscription;
  controlType = 'min-max-input';
  focused = false;
  stateChanges = new Subject<void>();
  get empty() {
    const {
      value: { min, max }
    } = this.parts;

    return !min && !max;
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @HostBinding('id') id = `range-input-${MinMaxInputComponent.nextId++}`;
  @HostBinding('class.label-floating') get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  @HostBinding('attr.aria-describedby') describedBy = '';

  @Input()
  get value(): MinMaxModel | null {
    const {value} = this.parts;
    return new MinMaxModel(value);
  }
  set value(value: MinMaxModel) {
    const {min, max} = new MinMaxModel(value);
    this.parts.setValue({ min, max });
  }

  get errorState() {
    if (!this.ngControl) {
      return false;
    }
    return this.ngControl.errors !== null && !!this.ngControl.touched;
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private elRef: ElementRef,
    private fm: FocusMonitor,
  ) {
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }

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
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      const inputRef = this.elRef.nativeElement.querySelector('input');
      if (inputRef) {
        inputRef.focus();
      }
    }
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
