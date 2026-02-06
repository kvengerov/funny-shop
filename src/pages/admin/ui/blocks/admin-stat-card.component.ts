import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { CardComponent } from '@shared/ui';
import { cn } from '@shared/lib/cn';

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
  label = input.required<string>();
  value = input.required<string>();
  trendLabel = input.required<string>();
  trendUp = input.required<boolean>();
  icon = input.required<any>();
  trendIcon = input.required<any>();
  iconClass = input.required<string>();
  progress = input<number | null>(null);

  protected cn = cn;
}
