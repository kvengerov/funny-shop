import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterFormComponent } from '@features/auth';

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
  private router = inject(Router);

  handleRegisterSuccess(response: any) {
    // Redirect to home or login after successful registration
    this.router.navigate(['/']);
  }
}
