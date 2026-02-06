import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Box, Inbox, MoreVertical, Plus } from 'lucide-angular';
import { CardComponent, ButtonComponent } from '@shared/ui';
import { cn } from '@shared/lib/cn';

/**
 * Data table displaying recent transactions in the admin dashboard.
 * Supports loading states and empty states with a call-to-action.
 */
@Component({
  selector: 'app-admin-transactions-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, CardComponent, ButtonComponent],
  template: `
    <app-card className="overflow-hidden flex flex-col min-h-[480px]">
      <div class="table-card-inner">
        <!-- Table Header -->
        <div class="flex items-center justify-between border-b app-border px-2 py-4">
          <div class="flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
              <lucide-icon [name]="icons.Box" class="size-4"></lucide-icon>
            </div>
            <h3 class="text-base font-bold app-text-main">Recent Transactions</h3>
          </div>
          <button class="text-xs font-bold text-blue-300 hover:text-blue-200 transition-colors">View All Analysis</button>
        </div>

        <div class="flex-1 overflow-x-auto px-2 pb-2 pt-2">
        @if (stats(); as currentStats) {
          @if (currentStats.length > 0) {
            <!-- Transactions Data Table -->
            <table class="w-full border-spacing-0 text-left">
              <thead class="app-surface-alt text-[11px] font-bold uppercase tracking-widest app-text-soft">
                <tr>
                  <th class="px-3 py-4 border-b app-border font-bold">Transaction</th>
                  <th class="px-3 py-4 border-b app-border font-bold">Status</th>
                  <th class="px-3 py-4 border-b app-border font-bold">Valuation</th>
                  <th class="px-3 py-4 border-b app-border text-right font-bold">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y app-divide">
                @for (item of transactions(); track item.id) {
                  <tr class="group transition-colors app-surface-hover">
                    <td class="px-3 py-5">
                      <div class="flex items-center gap-3">
                        <div class="flex h-10 w-10 items-center justify-center rounded-xl app-surface-alt app-text-soft group-hover:shadow-sm transition-all">
                          <lucide-icon [name]="icons.Box" class="size-5"></lucide-icon>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-sm font-bold app-text-main">{{ item.id }}</span>
                          <span class="text-[10px] font-medium app-text-soft uppercase tracking-tight">{{ item.category }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="px-3 py-5">
                      <div [class]="cn('inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide', getStatusStyles()(item.status))">
                        <div class="size-1.5 rounded-full bg-current"></div>
                        {{ item.status }}
                      </div>
                    </td>
                    <td class="px-3 py-5">
                      <span class="text-sm font-black app-text-main">{{ item.amount }}</span>
                    </td>
                    <td class="px-3 py-5 text-right">
                      <button class="h-9 w-9 rounded-full flex items-center justify-center app-text-soft app-surface-hover hover:text-white transition-all">
                        <lucide-icon [name]="icons.MoreVertical" class="size-4"></lucide-icon>
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          } @else {
            <!-- Empty State -->
            <div class="flex flex-col items-center justify-center py-24 px-6 text-center">
              <div class="flex h-20 w-20 items-center justify-center rounded-3xl app-surface-alt app-text-soft mb-6">
                <lucide-icon [name]="icons.Inbox" class="size-10"></lucide-icon>
              </div>
              <h3 class="text-lg font-bold app-text-main">No transactions recorded</h3>
              <p class="max-w-xs text-sm app-text-muted mt-2 mb-8">It looks like there aren't any transactions in your queue yet.</p>
              <app-button variant="primary" size="sm" className="h-10 px-6 font-bold shadow-lg shadow-blue-500/20">
                <lucide-icon [name]="icons.Plus" class="size-4 mr-2"></lucide-icon>
                Create Transaction
              </app-button>
            </div>
          }
        } @else {
          <!-- Skeleton Loading State -->
          <div class="p-0">
            <div class="app-surface-alt h-12 w-full border-b app-border mb-2"></div>
            @for (i of [1,2,3,4,5]; track i) {
              <div class="flex items-center justify-between px-6 py-5 border-b app-border animate-pulse">
                <div class="flex items-center gap-3">
                  <div class="size-10 rounded-xl app-surface-alt"></div>
                  <div class="space-y-2">
                    <div class="w-24 h-4 app-surface-alt rounded"></div>
                    <div class="w-16 h-2 app-surface-alt rounded"></div>
                  </div>
                </div>
                <div class="w-20 h-6 rounded-full app-surface-alt"></div>
                <div class="w-16 h-4 app-surface-alt rounded"></div>
                <div class="size-8 rounded-lg app-surface-alt"></div>
              </div>
            }
          </div>
        }
        </div>
      </div>
    </app-card>
  `,
  styles: [`
    .table-card-inner {
      padding: 16px;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  `]
})
export class AdminTransactionsTableComponent {
  /** Reference metrics to determine if the table is "loading" or "empty" */
  stats = input<any>();

  /** List of transaction objects to display */
  transactions = input.required<any[]>();

  /** Function to retrieve CSS classes for status badges based on transaction status */
  getStatusStyles = input.required<(status: string) => string>();

  /** Utility reference for class merging */
  protected readonly cn = cn;

  /** Grouped icons for template reference */
  protected readonly icons = {
    Box,
    Inbox,
    MoreVertical,
    Plus
  };
}
