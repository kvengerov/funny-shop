import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminStatCardComponent } from './admin-stat-card.component';

@Component({
  selector: 'app-admin-stats-grid',
  standalone: true,
  imports: [CommonModule, AdminStatCardComponent],
  template: `
    <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      @if (stats(); as currentStats) {
        @if (currentStats.length > 0) {
          @for (stat of currentStats; track stat.label) {
            <app-admin-stat-card
              [label]="stat.label"
              [value]="stat.value"
              [trendLabel]="stat.trend"
              [trendUp]="stat.trendUp"
              [progress]="stat.progress ?? null"
              [icon]="getStatIcon()(stat.label)"
              [trendIcon]="trendIcon()"
              [iconClass]="getStatColor()(stat.label)"
            />
          }
        } @else {
          <div class="col-span-full py-12 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed app-border app-surface-glass text-center">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl app-surface-alt app-text-soft mb-4">
              <span class="size-6"></span>
            </div>
            <h3 class="text-sm font-bold app-text-main">No Metrics Found</h3>
            <p class="text-xs app-text-muted mt-1 mb-4">Start tracking your business performance.</p>
          </div>
        }
      } @else {
        @for (i of [1,2,3,4]; track i) {
          <div class="h-40 animate-pulse rounded-xl app-surface app-border shadow-sm relative overflow-hidden">
            <div class="absolute inset-0 bg-linear-to-r from-transparent via-slate-50/50 to-transparent skew-x-[-20deg] animate-shimmer"></div>
            <div class="p-6 space-y-4">
              <div class="flex justify-between">
                <div class="size-10 rounded-xl app-surface-alt"></div>
                <div class="w-16 h-5 rounded-full app-surface-alt"></div>
              </div>
              <div class="space-y-2">
                <div class="w-20 h-3 app-surface-alt rounded"></div>
                <div class="w-32 h-8 app-surface-alt rounded-lg"></div>
              </div>
            </div>
          </div>
        }
      }
    </div>
  `
})
export class AdminStatsGridComponent {
  stats = input<any>();
  getStatIcon = input.required<(label: string) => any>();
  getStatColor = input.required<(label: string) => string>();
  trendIcon = input.required<any>();
}
