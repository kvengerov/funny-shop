import { Component, input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { cn } from '../../lib/cn';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <div [class]="cn('w-full', className())">
      @if (label()) {
        <label class="mb-1.5 block text-sm font-semibold app-text-muted">
          {{ label() }}
        </label>
      }
      <div class="relative">
        @if (icon()) {
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 app-text-soft">
            <ng-container *ngTemplateOutlet="icon()"></ng-container>
          </div>
        }
        <input
          [type]="type()"
          [placeholder]="placeholder()"
          [disabled]="disabled"
          [value]="value"
          (input)="onInput($event)"
          (blur)="onBlur()"
          [class]="cn(
            'app-input text-sm',
            icon() ? 'app-input-icon' : '',
            error() ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.15)]' : ''
          )"
        />
      </div>
      @if (error()) {
        <p class="mt-1 text-xs text-red-400">
          {{ error() }}
        </p>
      }
    </div>
  `
})
export class InputComponent implements ControlValueAccessor {
  label = input<string>();
  placeholder = input('');
  type = input('text');
  error = input<string | null>();
  className = input('');
  icon = input<any>(); // TemplateRef usually

  value: string = '';
  disabled = false;

  protected cn = cn;

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
