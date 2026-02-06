import { Component, inject, signal, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, User, Lock, ArrowRight, Loader2 } from 'lucide-angular';
import { ButtonComponent, InputComponent, CardComponent } from '@shared/ui';
import { AuthApiService } from '@entities/session';

@Component({
  selector: 'app-login-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    LucideAngularModule,
    ButtonComponent,
    InputComponent,
    CardComponent
  ],
  template: `
    <div class="auth-page relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
      <!-- Premium Animated Background -->
      <div class="background-grid fixed inset-0 z-0"></div>
      <div class="gradient-blob gradient-1 fixed top-1/4 left-1/4 size-[600px] rounded-full blur-[160px] opacity-40"></div>
      <div class="gradient-blob gradient-2 fixed bottom-1/4 right-1/4 size-[600px] rounded-full blur-[160px] opacity-30"></div>

      <div class="relative z-10 w-full max-w-md">
        <div class="mb-10 text-center">
          <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-4xl app-surface shadow-2xl">
             <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
               <lucide-icon [name]="User" class="size-7"></lucide-icon>
             </div>
          </div>
          <h1 class="text-3xl font-black tracking-tight leading-tight app-text-main">Welcome back</h1>
          <p class="mt-2 font-medium app-text-muted">Access your Funny Shop dashboard</p>
        </div>

        <app-card className="app-surface-glass border-0 p-8 shadow-2xl">
          <form class="space-y-6" [formGroup]="loginForm" (submit)="handleSubmit($event)">
            <div class="space-y-4">
              <app-input
                label="Username"
                formControlName="username"
                placeholder="Manager ID or email"
                [icon]="userIcon"
                [error]="getErrorMessage('username')"
              ></app-input>

              <app-input
                label="Password"
                formControlName="password"
                type="password"
                placeholder="••••••••"
                [icon]="lockIcon"
                [error]="getErrorMessage('password')"
              ></app-input>
            </div>

            @if (error()) {
              <div class="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600 ring-1 ring-red-500/10">
                <div class="size-1.5 rounded-full bg-red-600 animate-pulse"></div>
                {{ error() }}
              </div>
            }

            <app-button
              type="submit"
              [loading]="isLoading()"
              [disabled]="loginForm.invalid || isLoading()"
              className="login-btn w-full py-7 text-md font-black tracking-wide uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
               <span>Sign in to console</span>
               <lucide-icon [name]="ArrowRight" class="size-4 ml-2"></lucide-icon>
            </app-button>
          </form>

          <p class="mt-8 text-center text-sm font-bold app-text-soft">
            Internal Management Authorization v2.1
          </p>
        </app-card>

        <p class="mt-10 text-center text-sm font-medium app-text-muted">
          New system administrator? 
          <a routerLink="/register" class="font-black text-blue-400 hover:text-blue-300 underline decoration-2 underline-offset-4 decoration-blue-400/20">Create account</a>
        </p>
      </div>

      <!-- Icon Templates -->
      <ng-template #userIcon>
        <lucide-icon [name]="User" class="size-4"></lucide-icon>
      </ng-template>
      <ng-template #lockIcon>
        <lucide-icon [name]="Lock" class="size-4"></lucide-icon>
      </ng-template>
    </div>
  `,
  styles: [`
    .auth-page {
      background: var(--color-bg-body);
      font-family: var(--font-sans);
    }
    
    .background-grid {
      background-image: radial-gradient(color-mix(in oklab, var(--color-border) 70%, transparent) 1px, transparent 1px);
      background-size: 40px 40px;
      opacity: 0.35;
    }

    .gradient-blob {
      background: linear-gradient(135deg, var(--color-brand) 0%, var(--color-accent) 100%);
    }

    .gradient-2 {
      background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
    }

    .login-btn {
      background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%) !important;
      color: white !important;
      box-shadow: 0 10px 25px -10px rgba(37, 99, 235, 0.5) !important;
      border: none !important;
    }

    .login-btn:hover {
      transform: translateY(-2px) scale(1.02) !important;
      box-shadow: 0 20px 30px -10px rgba(37, 99, 235, 0.6) !important;
    }

    :host ::ng-deep .card-base {
       border-radius: 2.5rem !important;
    }
  `]
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  private authApi = inject(AuthApiService);

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isLoading = signal(false);
  error = signal<string | null>(null);

  onSuccess = output<any>();

  // Icons
  protected User = User;
  protected Lock = Lock;
  protected ArrowRight = ArrowRight;
  protected Loader2 = Loader2;

  getErrorMessage(controlName: string): string | null {
    const control = this.loginForm.get(controlName);
    if (!control || !control.errors || !(control.dirty || control.touched)) {
      return null;
    }

    if (control.errors['required']) return 'This field is required';
    if (control.errors['minlength']) {
      return `Minimum ${control.errors['minlength'].requiredLength} characters required`;
    }

    return 'Invalid field';
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    const credentials = this.loginForm.getRawValue() as { username: string; password?: string };
    this.authApi.login(credentials).subscribe({
      next: (user) => {
        this.isLoading.set(false);
        this.onSuccess.emit(user);
      },
      error: () => {
        this.isLoading.set(false);
        this.error.set('Invalid authentication tokens. Access denied.');
      }
    });
  }
}
