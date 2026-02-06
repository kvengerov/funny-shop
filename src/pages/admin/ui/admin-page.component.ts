import { Component, inject, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from '@entities/session';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@shared/ui';
import { cn } from '@shared/lib/cn';
import { StatsApiService } from '@entities/stats';
import { toSignal } from '@angular/core/rxjs-interop';
import {
   LucideAngularModule,
   LayoutDashboard,
   DollarSign,
   Users,
   CheckCircle,
   Box,
   TrendingUp,
   ArrowRight,
   Plus,
   BarChart3,
   Search,
   MoreVertical,
   ShoppingBag,
   Settings,
   LogOut,
   Bell,
   Menu,
   Inbox,
   Clock,
   CheckCircle2,
   AlertCircle
} from 'lucide-angular';
import { AdminSidebar } from '@widgets/admin-sidebar';
import { AdminStatsGridComponent } from './blocks/admin-stats-grid.component';
import { AdminTransactionsTableComponent } from './blocks/admin-transactions-table.component';
import { AdminSideWidgetsComponent } from './blocks/admin-side-widgets.component';

@Component({
   selector: 'app-admin-page',
   standalone: true,
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [CommonModule, RouterLink, ButtonComponent, LucideAngularModule, AdminSidebar, AdminStatsGridComponent, AdminTransactionsTableComponent, AdminSideWidgetsComponent],
   template: `
    <div class="flex min-h-screen app-shell font-sans">
      <!-- Sidebar -->
      <app-admin-sidebar [isOpen]="isSidebarOpen()" (onClose)="closeSidebar()"></app-admin-sidebar>

      <!-- Main Content -->
      <div [class]="cn('flex-1 transition-all duration-300', isSidebarOpen() ? 'pl-64' : 'pl-0')">
        @if (isSidebarOpen()) {
          <div class="fixed inset-0 z-40 bg-black/40 lg:hidden" (click)="closeSidebar()"></div>
        }
        <!-- Dashboard Header / Top Bar -->
        <header class="sticky top-0 z-30 border-b app-border app-surface-glass backdrop-blur-md">
          <div class="container flex h-16 items-center justify-between px-10">
            <div class="flex max-w-lg flex-1 items-center gap-4">
            <app-button variant="outline" size="sm" className="h-10 w-10 p-0! app-surface app-border app-text-soft app-surface-hover" (onClick)="toggleSidebar()">
              <lucide-icon [name]="Menu" class="size-4"></lucide-icon>
            </app-button>
            <div class="relative w-full max-w-xs">
              <lucide-icon [name]="Search" class="absolute left-3 top-1/2 -translate-y-1/2 size-4 app-text-soft"></lucide-icon>
              <input type="text" placeholder="Search data..."
                     class="app-input app-input-icon text-sm" />
            </div>
            </div>

            <div class="flex items-center gap-3">
             <app-button variant="outline" size="sm" className="h-10 w-10 p-0! app-surface app-border app-text-soft app-surface-hover">
               <lucide-icon [name]="Bell" class="size-4"></lucide-icon>
             </app-button>
             <app-button routerLink="/" variant="secondary" size="sm" className="h-10 gap-2 app-surface app-border app-text-muted app-surface-hover">
               <lucide-icon [name]="ArrowRight" class="size-4"></lucide-icon>
               Shop View
             </app-button>
            </div>
          </div>
        </header>

        <!-- Main Dashboard Surface -->
        <main class="container px-10 py-14">
          <div class="admin-sections">
            <!-- Page Title & CTA -->
            <div class="admin-section-header flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold tracking-tight app-text-main">Dashboard Summary</h2>
                <p class="text-sm app-text-muted">Global shop performance and operational data.</p>
              </div>
              <app-button variant="primary" className="bg-blue-600 hover:bg-blue-700 h-11 px-5 gap-2 text-sm font-medium rounded-xl transition-all shadow-sm">
                <lucide-icon [name]="Plus" class="size-4"></lucide-icon>
                New Product Entry
              </app-button>
            </div>

            <!-- Stats Grid -->
            <app-admin-stats-grid
              [stats]="stats()"
              [getStatIcon]="getStatIcon.bind(this)"
              [getStatColor]="getStatColor.bind(this)"
              [trendIcon]="TrendingUp"
            />

            <!-- Tables and Sidebar Details -->
            <div class="grid gap-12 lg:grid-cols-3">
              <div class="lg:col-span-2">
                <app-admin-transactions-table
                  [stats]="stats()"
                  [transactions]="transactions"
                  [getStatusStyles]="getStatusStyles.bind(this)"
                />
              </div>
              <app-admin-side-widgets />
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
   styles: [`
    :host { display: block; }
    .admin-sections {
      display: flex;
      flex-direction: column;
      gap: 36px;
    }
    .admin-section-header {
      margin-top: 16px;
    }
  `]
})
export class AdminPageComponent implements OnInit {
   private statsApi = inject(StatsApiService);
   protected sessionService = inject(SessionService);
   protected cn = cn;
   protected isSidebarOpen = signal(false);

   // Icons references for lucide-icon
   protected LayoutDashboard = LayoutDashboard;
   protected DollarSign = DollarSign;
   protected Users = Users;
   protected CheckCircle = CheckCircle;
   protected Box = Box;
   protected TrendingUp = TrendingUp;
   protected ArrowRight = ArrowRight;
   protected Plus = Plus;
   protected BarChart3 = BarChart3;
   protected Search = Search;
   protected MoreVertical = MoreVertical;
   protected ShoppingBag = ShoppingBag;
   protected Settings = Settings;
   protected LogOut = LogOut;
   protected Bell = Bell;
   protected Menu = Menu;
   protected Inbox = Inbox;
   protected Clock = Clock;
   protected CheckCircle2 = CheckCircle2;
   protected AlertCircle = AlertCircle;

   toggleSidebar() {
      this.isSidebarOpen.update((value) => !value);
   }

   closeSidebar() {
      this.isSidebarOpen.set(false);
   }

   protected stats = toSignal(this.statsApi.getStats());

   protected transactions = [
      { id: 'ORD-8821', category: 'Digital Assets', amount: '$2,440.00', status: 'Active' },
      { id: 'ORD-8822', category: 'Hardware Core', amount: '$1,200.50', status: 'Pending' },
      { id: 'ORD-8823', category: 'SaaS License', amount: '$850.00', status: 'Active' },
      { id: 'ORD-8824', category: 'Consulting', amount: '$3,100.00', status: 'Deleted' },
      { id: 'ORD-8825', category: 'Inventory', amount: '$540.20', status: 'Active' },
   ];

   getPrice(index: number): string {
      return `$${(2.521 * index * 100).toFixed(2)}`;
   }

   getStatusStyles(status: string) {
      switch (status) {
         case 'Active': return 'bg-emerald-500/15 text-emerald-300';
         case 'Pending': return 'bg-amber-500/15 text-amber-300';
         case 'Deleted': return 'bg-rose-500/15 text-rose-300';
         default: return 'bg-slate-500/20 text-slate-300';
      }
   }

   getStatIcon(label: string) {
      const l = label.toLowerCase();
      if (l.includes('revenue')) return DollarSign;
      if (l.includes('users')) return Users;
      if (l.includes('tasks')) return CheckCircle;
      return Box;
   }

   getStatColor(label: string) {
      const l = label.toLowerCase();
      if (l.includes('revenue')) return 'text-blue-300 bg-blue-500/15';
      if (l.includes('users')) return 'text-indigo-300 bg-indigo-500/15';
      if (l.includes('tasks')) return 'text-amber-300 bg-amber-500/15';
      return 'text-slate-300 bg-slate-500/15';
   }

   ngOnInit(): void {
      if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches) {
         this.isSidebarOpen.set(true);
      }
   }
}
