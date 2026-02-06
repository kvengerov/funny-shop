import { Component, signal, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { SessionService } from '@entities/session';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@shared/ui';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

/**
 * Root component of the application.
 * Manages the top-level layout, global navigation visibility, and reactive session state.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  /** Service providing reactive access to user session data */
  protected readonly sessionService = inject(SessionService);

  /** Reactive router instance */
  private readonly router = inject(Router);

  /** Title of the application */
  protected readonly title = signal('Funny Shop');

  /** 
   * Signal tracking the current URL path.
   * Why: Allows components to reactively show/hide UI elements based on the current route.
   */
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  /** 
   * Computed signal indicating if the current route belongs to the admin section.
   * Why: Used in the template to hide the main storefront header when in admin view.
   */
  protected readonly isAdminRoute = computed(() =>
    this.currentUrl().startsWith('/admin')
  );

  /**
   * Performs user logout and redirects to the home page.
   * Why: Ensures the session is cleared before the user is navigated away.
   */
  logout() {
    this.sessionService.logout();
    this.router.navigate(['/']);
  }
}
