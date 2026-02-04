import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfile } from '../../model/user-profile.model';
import { cn } from '@shared/lib/cn';

@Component({
  selector: 'app-user-profile-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cn('flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900', className())">
      <div class="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-indigo-500 to-purple-600 shadow-inner">
        @if (profile().avatarUrl) {
          <img
            [src]="profile().avatarUrl"
            [alt]="profile().username"
            class="h-full w-full object-cover"
          />
        } @else {
          <span class="text-xl font-bold text-white">
            {{ profile().firstName[0] }}{{ profile().lastName[0] }}
          </span>
        }
        
        @if (profile().role === 'admin') {
          <div 
            class="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-amber-400 text-[10px] text-white dark:border-gray-900"
            title="Admin"
          >
            ★
          </div>
        }
      </div>
      
      <div class="flex flex-col min-w-0">
        <h4 class="truncate text-lg font-semibold text-gray-900 dark:text-gray-100">
          {{ profile().firstName }} {{ profile().lastName }}
        </h4>
        <p class="truncate text-sm text-gray-500 dark:text-gray-400">
          &#64;{{ profile().username }}
        </p>
        <p class="mt-1 truncate text-xs font-medium text-indigo-600 dark:text-indigo-400">
          {{ profile().email }}
        </p>
      </div>
    </div>
  `
})
export class UserProfileCardComponent {
  profile = input.required<UserProfile>();
  className = input<string>('');

  protected cn = cn;
}
