import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, BarChart3 } from 'lucide-angular';
import { CardComponent, ButtonComponent } from '@shared/ui';

/**
 * Side widgets for the admin dashboard.
 * Includes system telemetry and marketing/action cards.
 */
@Component({
  selector: 'app-admin-side-widgets',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, CardComponent, ButtonComponent],
  template: `
    <div class="space-y-6">
      <!-- System Telemetry Widget -->
      <app-card className="p-6">
        <h3 class="mb-4 text-base font-bold app-text-main leading-none">System Telemetry</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="h-2 w-2 rounded-full bg-blue-600 animate-pulse ring-4 ring-blue-50"></div>
              <span class="text-sm font-bold app-text-muted">API Latency</span>
            </div>
            <span class="text-xs font-black text-blue-600">12ms</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
              <span class="text-sm font-bold app-text-muted">DB Uptime</span>
            </div>
            <span class="text-xs font-black text-emerald-600">100%</span>
          </div>
        </div>
        <div class="mt-8 overflow-hidden rounded-xl border app-border app-surface-alt p-4">
          <div class="flex flex-col items-center">
            <lucide-icon [name]="icons.BarChart3" class="size-10 app-text-soft"></lucide-icon>
            <span class="mt-2 text-[10px] font-black uppercase tracking-widest app-text-soft">Traffic Stream</span>
          </div>
        </div>
      </app-card>

      <!-- Advanced Management Widget -->
      <div class="rounded-2xl app-surface-alt p-8 text-white shadow-xl border app-border">
        <h4 class="text-lg font-black leading-tight">Advanced Management</h4>
        <p class="mt-2 text-xs font-medium app-text-soft leading-relaxed">Scale your Funny Shop infrastructure to enterprise-grade with our automated CLI tools.</p>
        <app-button 
          variant="primary" 
          className="mt-8 bg-blue-600 text-white hover:bg-blue-700 w-full rounded-xl border-none font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-900/40"
        >
          Learn More
        </app-button>
      </div>
    </div>
  `
})
export class AdminSideWidgetsComponent {
  /** Grouped icons for template reference */
  protected readonly icons = {
    BarChart3
  };
}
