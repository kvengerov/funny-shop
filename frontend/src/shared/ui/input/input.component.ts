import { Component, input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { cn } from '@shared/lib/cn';

/**
 * Custom form input component implementing ControlValueAccessor.
 * Integrates seamlessly with Angular Reactive Forms while maintaining premium styling.
 */
@Component({
  selector: 'app-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
          <!-- Left-aligned icon wrapper -->
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
        <!-- Contextual error message -->
        <p class="mt-1 text-xs text-red-400">
          {{ error() }}
        </p>
      }
    </div>
  `
})
export class InputComponent implements ControlValueAccessor {
  /** Text label displayed above the input */
  label = input<string>();

  /** Input placeholder text */
  placeholder = input('');

  /** HTML input type (text, password, email, etc.) */
  type = input('text');

  /** Error message string to display below the input */
  error = input<string | null>();

  /** Custom CSS classes for the container */
  className = input('');

  /** Template reference for the left icon */
  icon = input<any>();

  /** Current value of the input */
  value: string = '';

  /** Current disabled status */
  disabled = false;

  /** Utility reference for class merging */
  protected readonly cn = cn;

  /** Callback initiated by Angular Forms when value changes */
  onChange: any = () => { };

  /** Callback initiated by Angular Forms when control is touched */
  onTouched: any = () => { };

  // ControlValueAccessor methods

  /**
   * Sets the value for the input form angular forms.
   * @param value The value to write to the input
   */
  writeValue(value: string): void {
    this.value = value;
  }

  /**
   * Registers a callback for value changes.
   * @param fn Callback function
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback for touch events.
   * @param fn Callback function
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Updates the disabled state of the input.
   * @param isDisabled Whether the input should be disabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Internal handler for input changes. 
   * Triggers the registered Angular Forms callback.
   * @param event DOM input event
   */
  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  /**
   * Internal handler for blur event to mark control as touched.
   */
  onBlur(): void {
    this.onTouched();
  }
}
