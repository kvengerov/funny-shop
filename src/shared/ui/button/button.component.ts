import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';
type ButtonRounded = 'md' | 'lg' | 'full';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      class="btn-base {{ buttonClasses() }}"
      (click)="onClick.emit($event)"
    >
      @if (loading()) {
        <svg
          class="-ml-1 mr-2 h-4 w-4 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      }
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn-base {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      transition: all 0.3s var(--ease-spring);
      cursor: pointer;
      border: none;
      font-family: inherit;
    }
    
    .btn-base:active {
      transform: scale(0.96);
    }

    .btn-base:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* Variants using Design Tokens */
    .variant-primary {
      background: var(--color-brand);
      color: #fff;
      box-shadow: var(--shadow-glow);
    }
    .variant-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px var(--color-brand-glow);
    }

    .variant-secondary {
      background: var(--color-bg-surface);
      color: var(--color-text-main);
      border: 1px solid var(--color-border);
    }
    .variant-secondary:hover {
      background: var(--color-border);
      transform: translateY(-1px);
    }

    .variant-outline {
      background: transparent;
      color: var(--color-text-main);
      border: 1px solid var(--color-border);
    }
    .variant-outline:hover {
      border-color: var(--color-text-main);
      background: rgba(255, 255, 255, 0.05);
      transform: translateY(-1px);
    }

    .variant-ghost {
      background: transparent;
      color: var(--color-text-muted);
    }
    .variant-ghost:hover {
      color: var(--color-text-main);
      background: rgba(255, 255, 255, 0.05);
    }

    .variant-danger {
      background: #ef4444;
      color: #fff;
    }

    /* Rounding */
    .rounded-md { border-radius: var(--radius-md); }
    .rounded-lg { border-radius: var(--radius-lg); }
    .rounded-full { border-radius: var(--radius-full); }

    /* Sizes */
    .size-sm { padding: 0.5rem 1rem; font-size: 0.75rem; }
    .size-md { padding: 0.75rem 1.5rem; font-size: 0.875rem; }
    .size-lg { padding: 1rem 2.5rem; font-size: 1rem; }
    .size-icon { width: 2.5rem; height: 2.5rem; padding: 0; }
  `]
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  rounded = input<ButtonRounded>('full'); // Hero style by default
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input(false);
  loading = input(false);
  className = input('');

  onClick = output<MouseEvent>();

  buttonClasses = computed(() => {
    return cn(
      `variant-${this.variant()}`,
      `size-${this.size()}`,
      `rounded-${this.rounded()}`,
      this.className()
    );
  });
}
