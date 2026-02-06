import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { CardComponent } from '@shared/ui';
import { cn } from '@shared/lib/cn';

/**
 * Individual statistic card for the admin dashboard.
 * Displays a metric with its trend and visual indicator (icon).
 */
@Component({
  selector: 'app-admin-stat-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, CardComponent],
  template: `
    <app-card className="stat-card group transition-all duration-300 app-card-hover">
      <div class="stat-card-body">
        <div class="stat-card-row">
          <div [class]="cn('flex h-10 w-10 items-center justify-center rounded-xl transition-colors', iconClass())">
            <lucide-icon [name]="icon()" class="size-5"></lucide-icon>
          </div>
          <div [class]="cn('stat-card-trend flex items-center gap-1 text-[10px] font-bold rounded-full', trendUp() ? 'text-emerald-300 bg-emerald-500/15' : 'text-rose-300 bg-rose-500/15')">
            <lucide-icon [name]="trendIcon()" [class]="cn('size-3', !trendUp() && 'rotate-180')"></lucide-icon>
            {{ trendLabel() }}
          </div>
        </div>
        <div class="stat-card-text">
          <p class="text-xs font-bold uppercase tracking-wider app-text-soft leading-none">{{ label() }}</p>
          <h3 class="text-2xl font-bold app-text-main group-hover:text-blue-400 transition-colors">{{ value() }}</h3>
        </div>
      </div>
    </app-card>
  `,
  styles: [`
    .stat-card-body {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .stat-card-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .stat-card-text {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .stat-card-trend {
      padding: 6px 12px;
    }
  `]
})
export class AdminStatCardComponent {
  /** Label describing the metric (e.g., "Total Revenue") */
  label = input.required<string>();

  /** Formatted metric value (e.g., "$12,450.00") */
  value = input.required<string>();

  /** Trend description (e.g., "+12.5%") */
  trendLabel = input.required<string>();

  /** Indicates if the trend is positive or negative */
  trendUp = input.required<boolean>();

  /** Main icon representing the metric */
  icon = input.required<any>();

  /** Icon indicating the trend direction */
  trendIcon = input.required<any>();

  /** Tailwind classes for icon styling (colors/background) */
  iconClass = input.required<string>();

  /** Optional progress percentage for visual bar */
  progress = input<number | null>(null);

  protected readonly cn = cn;
}
