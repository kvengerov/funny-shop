import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfile } from '@entities/user-profile';
import { cn } from '@shared/lib/cn';

/**
 * Visual card representing a user's profile information.
 * Displays avatar, name, username, and role-based badges.
 */
@Component({
  selector: 'app-user-profile-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div [class]="cn('flex items-center gap-4 rounded-xl app-card p-4 transition-all app-card-hover', className())">
      <div class="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-indigo-500 to-purple-600 shadow-inner">
        @if (profile().avatarUrl) {
          <img
            [src]="profile().avatarUrl"
            [alt]="profile().username"
            class="h-full w-full object-cover"
          />
        } @else {
          <!-- Fallback initials when no avatar is available -->
          <span class="text-xl font-bold text-white">
            {{ profile().firstName[0] }}{{ profile().lastName[0] }}
          </span>
        }
        
        @if (profile().role === 'admin') {
          <!-- Administrator indicator badge -->
          <div 
            class="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-black/40 bg-amber-400 text-[10px] text-white"
            title="System Admin"
          >
            ★
          </div>
        }
      </div>
      
      <div class="flex flex-col min-w-0">
        <h4 class="truncate text-lg font-semibold app-text-main">
          {{ profile().firstName }} {{ profile().lastName }}
        </h4>
        <p class="truncate text-sm app-text-muted">
          &#64;{{ profile().username }}
        </p>
        <p class="mt-1 truncate text-xs font-medium text-indigo-300">
          {{ profile().email }}
        </p>
      </div>
    </div>
  `
})
export class UserProfileCardComponent {
  /** The user profile entity to display */
  profile = input.required<UserProfile>();

  /** External CSS classes for layout adjustment */
  className = input<string>('');

  /** Utility reference for class merging */
  protected readonly cn = cn;
}
