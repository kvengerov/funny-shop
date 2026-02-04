import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SessionService } from '@entities/session';
import {
  LucideAngularModule,
  LayoutDashboard,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-angular';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  template: `
    <aside class="fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200/60 bg-white">
      <div class="flex h-full flex-col">
        <!-- Logo Section -->
        <div class="flex h-16 items-center border-b border-slate-100 px-6">
          <div class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <lucide-icon [name]="LayoutDashboard" class="size-5"></lucide-icon>
            </div>
            <span class="text-lg font-bold tracking-tight text-slate-900">Funny Admin</span>
          </div>
        </div>

        <!-- Navigation Section -->
        <nav class="flex-1 space-y-1 px-3 py-4">
          <a routerLink="/admin" routerLinkActive="bg-blue-50 text-blue-600" [routerLinkActiveOptions]="{exact: true}"
             class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-50">
            <lucide-icon [name]="LayoutDashboard" class="size-4"></lucide-icon>
            Dashboard
          </a>
          <a routerLink="/admin/products" routerLinkActive="bg-blue-50 text-blue-600"
             class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
            <lucide-icon [name]="ShoppingBag" class="size-4"></lucide-icon>
            Products
          </a>
          <a routerLink="/admin/customers" routerLinkActive="bg-blue-50 text-blue-600"
             class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
            <lucide-icon [name]="Users" class="size-4"></lucide-icon>
            Customers
          </a>
          <a routerLink="/admin/stats" routerLinkActive="bg-blue-50 text-blue-600"
             class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
            <lucide-icon [name]="BarChart3" class="size-4"></lucide-icon>
            Reports
          </a>
          <div class="pt-4 pb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Settings</div>
          <a routerLink="/admin/settings" routerLinkActive="bg-blue-50 text-blue-600"
             class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
            <lucide-icon [name]="Settings" class="size-4"></lucide-icon>
            General Settings
          </a>
        </nav>

        <!-- User Footer Section -->
        <div class="border-t border-slate-100 p-4">
          <div class="flex items-center gap-3 px-2 py-2">
            <div class="h-9 w-9 rounded-full bg-slate-100 ring-2 ring-white"></div>
            <div class="flex flex-col text-left">
              <span class="text-sm font-semibold text-slate-900 leading-tight">
                {{ sessionService.currentUser()?.firstName }}
              </span>
              <div class="mt-0.5">
                <span class="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-blue-600">
                  {{ sessionService.currentUser()?.role }}
                </span>
              </div>
            </div>
            <button class="ml-auto text-slate-400 hover:text-slate-600">
              <lucide-icon [name]="LogOut" class="size-4"></lucide-icon>
            </button>
          </div>
        </div>
      </div>
    </aside>
  `
})
export class AdminSidebar {
  protected sessionService = inject(SessionService);

  // Icons
  protected LayoutDashboard = LayoutDashboard;
  protected ShoppingBag = ShoppingBag;
  protected Users = Users;
  protected BarChart3 = BarChart3;
  protected Settings = Settings;
  protected LogOut = LogOut;
}
