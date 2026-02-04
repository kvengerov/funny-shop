import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionService } from '@entities/session';
import { RouterLink } from '@angular/router';
import { ButtonComponent, CardComponent } from '@shared/ui';
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

@Component({
   selector: 'app-admin-page',
   standalone: true,
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [CommonModule, RouterLink, ButtonComponent, CardComponent, LucideAngularModule, AdminSidebar],
   template: `
    <div class="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <!-- Sidebar -->
      <app-admin-sidebar></app-admin-sidebar>

      <!-- Main Content -->
      <div class="flex-1 pl-64">
        <!-- Dashboard Header / Top Bar -->
        <header class="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/80 px-8 backdrop-blur-md">
          <div class="flex max-w-lg flex-1 items-center gap-4">
            <div class="relative w-full max-w-xs">
              <lucide-icon [name]="Search" class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400"></lucide-icon>
              <input type="text" placeholder="Search data..."
                     class="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm transition-all focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/10" />
            </div>
          </div>

          <div class="flex items-center gap-3">
             <app-button variant="outline" size="sm" className="h-10 w-10 p-0! border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
               <lucide-icon [name]="Bell" class="size-4"></lucide-icon>
             </app-button>
             <app-button routerLink="/" variant="secondary" size="sm" className="h-10 gap-2 border-slate-300 text-slate-700 bg-white hover:bg-slate-50">
               <lucide-icon [name]="ArrowRight" class="size-4"></lucide-icon>
               Shop View
             </app-button>
          </div>
        </header>

        <!-- Main Dashboard Surface -->
        <main class="mx-auto max-w-7xl p-8">
          <!-- Page Title & CTA -->
          <div class="mb-8 flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold tracking-tight text-slate-900">Dashboard Summary</h2>
              <p class="text-sm text-slate-500">Global shop performance and operational data.</p>
            </div>
            <app-button variant="primary" className="bg-blue-600 hover:bg-blue-700 h-11 px-5 gap-2 text-sm font-medium rounded-xl transition-all shadow-sm">
              <lucide-icon [name]="Plus" class="size-4"></lucide-icon>
              New Product Entry
            </app-button>
          </div>

          <!-- Stats Grid -->
          <div class="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            @if (stats(); as currentStats) {
              @if (currentStats.length > 0) {
                @for (stat of currentStats; track stat.label) {
                  <app-card className="group p-6 border-slate-200/60 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
                    <div class="flex items-center justify-between mb-4">
                      <div [class]="cn('flex h-10 w-10 items-center justify-center rounded-xl transition-colors', getStatColor(stat.label))">
                         <lucide-icon [name]="getStatIcon(stat.label)" class="size-5"></lucide-icon>
                      </div>
                      <div [class]="cn('flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full', stat.trendUp ? 'text-emerald-600 bg-emerald-500/10' : 'text-rose-600 bg-rose-500/10')">
                        <lucide-icon [name]="stat.trendUp ? TrendingUp : TrendingUp" [class]="cn('size-3', !stat.trendUp && 'rotate-180')"></lucide-icon>
                        {{ stat.trend }}
                      </div>
                    </div>
                    <div class="space-y-1">
                      <p class="text-xs font-bold uppercase tracking-wider text-slate-400 leading-none">{{ stat.label }}</p>
                      <h3 class="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{{ stat.value }}</h3>
                    </div>
                    @if (stat.progress) {
                      <div class="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100/50">
                        <div class="h-full rounded-full bg-blue-600 transition-all duration-1000" [style.width]="stat.progress + '%'"></div>
                      </div>
                    }
                  </app-card>
                }
              } @else {
                <!-- Stats Empty State -->
                <div class="col-span-full py-12 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white/50 text-center">
                  <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 mb-4">
                    <lucide-icon [name]="Inbox" class="size-6"></lucide-icon>
                  </div>
                  <h3 class="text-sm font-bold text-slate-900">No Metrics Found</h3>
                  <p class="text-xs text-slate-500 mt-1 mb-4">Start tracking your business performance.</p>
                  <app-button variant="secondary" size="sm" className="h-9 px-4 gap-2">
                    <lucide-icon [name]="Plus" class="size-4"></lucide-icon>
                    Setup Analytics
                  </app-button>
                </div>
              }
            } @else {
              <!-- Stats Loading Skeleton -->
              @for (i of [1,2,3,4]; track i) {
                  <div class="h-40 animate-pulse rounded-xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
                    <div class="absolute inset-0 bg-linear-to-r from-transparent via-slate-50/50 to-transparent skew-x-[-20deg] animate-shimmer"></div>
                   <div class="p-6 space-y-4">
                     <div class="flex justify-between">
                       <div class="size-10 rounded-xl bg-slate-100"></div>
                       <div class="w-16 h-5 rounded-full bg-slate-100"></div>
                     </div>
                     <div class="space-y-2">
                       <div class="w-20 h-3 bg-slate-50 rounded"></div>
                       <div class="w-32 h-8 bg-slate-100 rounded-lg"></div>
                     </div>
                   </div>
                 </div>
              }
            }
          </div>

          <!-- Tables and Sidebar Details -->
          <div class="grid gap-8 lg:grid-cols-3">
             <div class="lg:col-span-2">
                <app-card className="overflow-hidden border-slate-200/60 flex flex-col min-h-[440px]">
                   <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                      <div class="flex items-center gap-3">
                         <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <lucide-icon [name]="CheckCircle2" class="size-4"></lucide-icon>
                         </div>
                         <h3 class="text-base font-bold text-slate-900">Recent Transactions</h3>
                      </div>
                      <button class="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">View All Analysis</button>
                   </div>
                   
                   <div class="flex-1 overflow-x-auto">
                      @if (stats(); as currentStats) {
                        @if (currentStats.length > 0) {
                        <table class="w-full border-spacing-0 text-left">
                           <thead class="bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                              <tr>
                                 <th class="px-6 py-4 border-b border-slate-100 font-bold">Transaction</th>
                                 <th class="px-6 py-4 border-b border-slate-100 font-bold">Status</th>
                                 <th class="px-6 py-4 border-b border-slate-100 font-bold">Valuation</th>
                                 <th class="px-6 py-4 border-b border-slate-100 text-right font-bold">Action</th>
                              </tr>
                           </thead>
                           <tbody class="divide-y divide-slate-50">
                              @for (item of transactions; track item.id) {
                                 <tr class="group transition-colors hover:bg-slate-50/50">
                                    <td class="px-6 py-4">
                                       <div class="flex items-center gap-3">
                                          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                                             <lucide-icon [name]="Box" class="size-5"></lucide-icon>
                                          </div>
                                          <div class="flex flex-col">
                                             <span class="text-sm font-bold text-slate-700">{{ item.id }}</span>
                                             <span class="text-[10px] font-medium text-slate-400 uppercase tracking-tight">{{ item.category }}</span>
                                          </div>
                                       </div>
                                    </td>
                                    <td class="px-6 py-4">
                                       <div [class]="cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide', getStatusStyles(item.status))">
                                          <div class="size-1.5 rounded-full bg-current"></div>
                                          {{ item.status }}
                                       </div>
                                    </td>
                                    <td class="px-6 py-4">
                                       <span class="text-sm font-black text-slate-900">{{ item.amount }}</span>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                       <button class="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all">
                                          <lucide-icon [name]="MoreVertical" class="size-4"></lucide-icon>
                                       </button>
                                    </td>
                                 </tr>
                              }
                           </tbody>
                        </table>
                        } @else {
                           <!-- Table Empty State -->
                           <div class="flex flex-col items-center justify-center py-24 px-6 text-center">
                            <div class="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 text-slate-200 mb-6">
                               <lucide-icon [name]="Inbox" class="size-10"></lucide-icon>
                            </div>
                            <h3 class="text-lg font-bold text-slate-900">No transactions recorded</h3>
                            <p class="max-w-xs text-sm text-slate-500 mt-2 mb-8">It looks like there aren't any transactions in your queue yet.</p>
                            <app-button variant="primary" size="sm" className="h-10 px-6 font-bold shadow-lg shadow-blue-500/20">
                               <lucide-icon [name]="Plus" class="size-4 mr-2"></lucide-icon>
                               Create Transaction
                            </app-button>
                         </div>
                       }
                    } @else {
                       <!-- Table Loading Skeleton -->
                         <div class="p-0">
                            <div class="bg-slate-50/50 h-12 w-full border-b border-slate-100 mb-2"></div>
                            @for (i of [1,2,3,4,5]; track i) {
                               <div class="flex items-center justify-between px-6 py-5 border-b border-slate-50 animate-pulse">
                                  <div class="flex items-center gap-3">
                                     <div class="size-10 rounded-xl bg-slate-100"></div>
                                     <div class="space-y-2">
                                        <div class="w-24 h-4 bg-slate-100 rounded"></div>
                                        <div class="w-16 h-2 bg-slate-50 rounded"></div>
                                     </div>
                                  </div>
                                  <div class="w-20 h-6 rounded-full bg-slate-100"></div>
                                  <div class="w-16 h-4 bg-slate-100 rounded"></div>
                                  <div class="size-8 rounded-lg bg-slate-50"></div>
                               </div>
                            }
                         </div>
                      }
                   </div>
                </app-card>
             </div>

             <div class="space-y-6">
                <app-card className="p-6">
                   <h3 class="mb-4 text-base font-bold text-slate-900 leading-none">System Telemetry</h3>
                   <div class="space-y-4">
                      <div class="flex items-center justify-between">
                         <div class="flex items-center gap-3">
                            <div class="h-2 w-2 rounded-full bg-blue-600 animate-pulse ring-4 ring-blue-50"></div>
                            <span class="text-sm font-bold text-slate-600">API Latency</span>
                         </div>
                         <span class="text-xs font-black text-blue-600">12ms</span>
                      </div>
                      <div class="flex items-center justify-between">
                         <div class="flex items-center gap-3">
                            <div class="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                            <span class="text-sm font-bold text-slate-600">DB Uptime</span>
                         </div>
                         <span class="text-xs font-black text-emerald-600">100%</span>
                      </div>
                   </div>
                   <div class="mt-8 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <div class="flex flex-col items-center">
                         <lucide-icon [name]="BarChart3" class="size-10 text-slate-200"></lucide-icon>
                         <span class="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-300">Traffic Stream</span>
                      </div>
                   </div>
                </app-card>

                <div class="rounded-2xl bg-slate-900 p-8 text-white shadow-xl">
                   <h4 class="text-lg font-black leading-tight">Advanced Management</h4>
                   <p class="mt-2 text-xs font-medium text-slate-400 leading-relaxed">Scale your Funny Shop infrastructure to enterprise-grade with our automated CLI tools.</p>
                   <app-button variant="primary" className="mt-8 bg-blue-600 text-white hover:bg-blue-700 w-full rounded-xl border-none font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-900/40">
                      Learn More
                   </app-button>
                </div>
             </div>
          </div>
        </main>
      </div>
    </div>
  `,
   styles: [`
    :host { display: block; }
  `]
})
export class AdminPageComponent {
   private statsApi = inject(StatsApiService);
   protected sessionService = inject(SessionService);
   protected cn = cn;

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
         case 'Active': return 'bg-emerald-500/10 text-emerald-600';
         case 'Pending': return 'bg-amber-500/10 text-amber-600';
         case 'Deleted': return 'bg-rose-500/10 text-rose-600';
         default: return 'bg-slate-500/10 text-slate-600';
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
      if (l.includes('revenue')) return 'text-blue-600 bg-blue-50';
      if (l.includes('users')) return 'text-indigo-600 bg-indigo-50';
      if (l.includes('tasks')) return 'text-amber-600 bg-amber-50';
      return 'text-slate-600 bg-slate-50';
   }
}
