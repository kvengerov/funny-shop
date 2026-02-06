import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '@shared/lib/cn';

/**
 * Foundation card component for layout grouping.
 * Provides a standardized surface with rounded corners and optional hover effects.
 */
@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div [class]="cn('card-root app-card rounded-2xl', className())">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card-root {
      position: relative;
      overflow: hidden;
      transition: all 0.3s var(--ease-spring);
    }
  `]
})
export class CardComponent {
  /** Optional CSS classes to override or extend card styling */
  className = input('');

  /** Utility reference for class merging */
  protected readonly cn = cn;
}
