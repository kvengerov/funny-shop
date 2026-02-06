import { Component, inject, input, output } from '@angular/core';
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
  LogOut,
  X
} from 'lucide-angular';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  template: `
    <aside [class]="isOpen() 
      ? 'admin-sidebar fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-300 translate-x-0'
      : 'admin-sidebar fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-300 -translate-x-full'">
      <div class="admin-sidebar-inner flex h-full flex-col">
        <!-- Logo Section -->
        <div class="admin-sidebar-header flex h-16 items-center px-3">
          <div class="flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              <lucide-icon [name]="LayoutDashboard" class="size-5"></lucide-icon>
            </div>
            <span class="text-lg font-bold tracking-tight app-text-main">Funny Admin</span>
          </div>
          <button class="admin-close flex h-8 w-8 items-center justify-center rounded-full border border-transparent app-text-soft hover:bg-white/5 hover:text-white transition-colors"
                  (click)="onClose.emit()"
                  aria-label="Close sidebar">
            <span class="sr-only">Close sidebar</span>
            <lucide-icon [name]="X" class="size-4"></lucide-icon>
          </button>
        </div>

        <!-- Navigation Section -->
        <nav class="admin-sidebar-nav flex-1 px-3 py-6">
          <a routerLink="/admin" routerLinkActive="app-active" [routerLinkActiveOptions]="{exact: true}"
             class="admin-nav-link flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold app-text-muted transition-colors">
            <span class="nav-icon">
              <lucide-icon [name]="LayoutDashboard" class="size-4"></lucide-icon>
            </span>
            <span class="nav-label">Dashboard</span>
          </a>
          <a routerLink="/admin/products" routerLinkActive="app-active"
             class="admin-nav-link flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold app-text-muted transition-colors">
            <span class="nav-icon">
              <lucide-icon [name]="ShoppingBag" class="size-4"></lucide-icon>
            </span>
            <span class="nav-label">Products</span>
          </a>
          <a routerLink="/admin/customers" routerLinkActive="app-active"
             class="admin-nav-link flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold app-text-muted transition-colors">
            <span class="nav-icon">
              <lucide-icon [name]="Users" class="size-4"></lucide-icon>
            </span>
            <span class="nav-label">Customers</span>
          </a>
          <a routerLink="/admin/stats" routerLinkActive="app-active"
             class="admin-nav-link flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold app-text-muted transition-colors">
            <span class="nav-icon">
              <lucide-icon [name]="BarChart3" class="size-4"></lucide-icon>
            </span>
            <span class="nav-label">Reports</span>
          </a>
          <div class="settings-label pt-2 pb-3 px-3 text-[10px] font-bold uppercase tracking-widest app-text-soft">Settings</div>
          <a routerLink="/admin/settings" routerLinkActive="app-active"
             class="admin-nav-link nav-after-settings flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold app-text-muted transition-colors">
            <span class="nav-icon">
              <lucide-icon [name]="Settings" class="size-4"></lucide-icon>
            </span>
            <span class="nav-label">General Settings</span>
          </a>
        </nav>

        <!-- User Footer Section -->
        <div class="admin-sidebar-footer p-3">
          <div class="admin-profile flex items-center gap-3 rounded-2xl px-3 py-2.5">
            <div class="admin-avatar h-10 w-10 rounded-full"></div>
            <div class="flex flex-col text-left min-w-0">
              <span class="text-sm font-semibold app-text-main leading-tight truncate">
                {{ sessionService.currentUser()?.firstName || 'System' }}
              </span>
              <span class="text-[11px] font-bold uppercase tracking-widest text-blue-300/90">
                {{ sessionService.currentUser()?.role || 'Admin' }}
              </span>
            </div>
            <button class="admin-logout ml-auto h-8 w-8 rounded-full flex items-center justify-center app-text-soft hover:text-white transition-colors hover:bg-white/5">
              <lucide-icon [name]="LogOut" class="size-4"></lucide-icon>
            </button>
          </div>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .admin-sidebar {
      background: linear-gradient(180deg, color-mix(in oklab, var(--color-bg-surface) 95%, #0b1220) 0%, var(--color-bg-surface) 100%);
      border-right: 1px solid var(--color-border);
      box-shadow: 12px 0 30px rgba(0,0,0,0.25);
    }

    .admin-sidebar-inner {
      padding: 12px 10px;
    }

    .admin-sidebar-header {
      position: relative;
      border-bottom: 1px solid var(--color-border);
    }

    .admin-sidebar-footer {
      border-top: 1px solid var(--color-border);
      padding-top: 10px;
    }

    .admin-close {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }

    .admin-profile {
      background: transparent;
    }

    .admin-avatar {
      background: linear-gradient(135deg, #1f2937 0%, #0f172a 100%);
      border: 1px solid var(--color-border);
      box-shadow: inset 0 0 0 2px rgba(255,255,255,0.02);
    }

    .admin-logout {
      margin-left: auto;
    }

    .admin-sidebar-nav {
      margin-top: 16px;
    }

    .admin-nav-link {
      position: relative;
    }

    .admin-nav-link + .admin-nav-link {
      margin-top: 12px;
    }

    .admin-nav-link .nav-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 10px;
      background: color-mix(in oklab, var(--color-bg-surface-alt) 80%, transparent);
      border: 1px solid var(--color-border);
      color: var(--color-text-muted);
    }

    .admin-nav-link .nav-label {
      letter-spacing: 0.01em;
    }

    .admin-nav-link:hover {
      background: color-mix(in oklab, var(--color-bg-surface-alt) 85%, transparent);
      color: var(--color-text-main);
    }

    .admin-nav-link:hover .nav-icon {
      color: var(--color-text-main);
      border-color: color-mix(in oklab, var(--color-border) 60%, var(--color-brand));
    }

    .admin-nav-link.app-active {
      background: color-mix(in oklab, var(--color-brand) 22%, var(--color-bg-surface));
      color: var(--color-text-main);
      border: 1px solid color-mix(in oklab, var(--color-brand) 35%, var(--color-border));
      box-shadow: 0 8px 16px rgba(0,0,0,0.25);
    }

    .admin-nav-link.app-active .nav-icon {
      background: color-mix(in oklab, var(--color-brand) 25%, var(--color-bg-surface-alt));
      color: #fff;
      border-color: color-mix(in oklab, var(--color-brand) 50%, var(--color-border));
    }

    .settings-label {
      margin-top: 18px;
    }

    .nav-after-settings {
      margin-top: 10px;
    }
  `]
})
export class AdminSidebar {
  protected sessionService = inject(SessionService);
  isOpen = input(true);
  onClose = output<void>();

  // Icons
  protected LayoutDashboard = LayoutDashboard;
  protected ShoppingBag = ShoppingBag;
  protected Users = Users;
  protected BarChart3 = BarChart3;
  protected Settings = Settings;
  protected LogOut = LogOut;
  protected X = X;
}
