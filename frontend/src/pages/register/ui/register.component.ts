import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterFormComponent } from '@features/auth';

/**
 * Page component hosting the user registration interface.
 * Coordinates system navigation after successful account initialization.
 */
@Component({
  selector: 'app-register-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RegisterFormComponent],
  template: `
    <app-register-form (onSuccess)="handleRegisterSuccess($event)"></app-register-form>
  `
})
export class RegisterPageComponent {
  /** Reactive router for post-registration redirection */
  private readonly router = inject(Router);

  /**
   * Finalizes the registration phase and routes the user to the storefront.
   * Why: Provides a seamless transition from account setup to the shopping experience.
   * @param response The data returned from the registration API
   */
  handleRegisterSuccess(response: any) {
    this.router.navigate(['/']);
  }
}
