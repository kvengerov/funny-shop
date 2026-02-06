import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '@shared/lib/cn';

@Component({
  selector: 'app-card',
  standalone: true,
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
  className = input('');
  protected cn = cn;
}
