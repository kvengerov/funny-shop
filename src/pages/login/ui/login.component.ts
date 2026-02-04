import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginFormComponent } from '@features/auth';

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
  private router = inject(Router);

  handleLoginSuccess(user: any) {
    if (user.role === 'admin' || user.role === 'manager') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
