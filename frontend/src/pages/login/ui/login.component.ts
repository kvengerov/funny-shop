import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginFormComponent } from '@features/auth';

/**
 * Page component hosting the login interface.
 * Handles navigation logic after successful authentication.
 */
@Component({
  selector: 'app-login-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LoginFormComponent],
  template: `
    <app-login-form (onSuccess)="handleLoginSuccess($event)"></app-login-form>
  `
})
export class LoginPageComponent {
  /** Reactive router instance for post-login navigation */
  private router = inject(Router);

  /**
   * Routes the user to the appropriate section of the app based on their role.
   * Why: Ensures admins are sent to the dashboard while customers stay in the shop.
   * @param user The authenticated user profile object
   */
  handleLoginSuccess(user: any) {
    if (user.role === 'admin' || user.role === 'manager') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
