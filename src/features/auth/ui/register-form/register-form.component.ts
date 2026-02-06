import { Component, inject, signal, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, User, Mail, UserPlus, ArrowRight, Loader2, Key } from 'lucide-angular';
import { ButtonComponent, InputComponent, CardComponent } from '@shared/ui';
import { AuthApiService } from '@entities/session';

@Component({
  selector: 'app-register-form',
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
      <!-- Premium Animated Background (Shared with Login) -->
      <div class="background-grid fixed inset-0 z-0"></div>
      <div class="gradient-blob gradient-1 fixed top-1/4 left-1/4 size-[600px] rounded-full blur-[160px] opacity-40"></div>
      <div class="gradient-blob gradient-2 fixed bottom-1/4 right-1/4 size-[600px] rounded-full blur-[160px] opacity-30"></div>

      <div class="relative z-10 w-full max-w-lg">
        <div class="mb-8 text-center">
          <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-4xl app-surface shadow-2xl">
             <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
               <lucide-icon [name]="UserPlus" class="size-7"></lucide-icon>
             </div>
          </div>
          <h1 class="text-3xl font-black tracking-tight leading-tight app-text-main">Create Account</h1>
          <p class="mt-2 font-medium app-text-muted">Join the Funny Shop administrative network</p>
        </div>

        <app-card className="app-surface-glass border-0 p-8 shadow-2xl">
          <form class="space-y-5" [formGroup]="registerForm" (submit)="handleSubmit($event)">
            <div class="grid grid-cols-2 gap-4">
              <app-input
                label="First Name"
                formControlName="firstName"
                placeholder="John"
                [error]="getErrorMessage('firstName')"
              ></app-input>
              <app-input
                label="Last Name"
                formControlName="lastName"
                placeholder="Doe"
                [error]="getErrorMessage('lastName')"
              ></app-input>
            </div>
            
            <app-input
              label="Email Address"
              formControlName="email"
              type="email"
              placeholder="email@example.com"
              [icon]="mailIcon"
              [error]="getErrorMessage('email')"
            ></app-input>

            <app-input
              label="Username"
              formControlName="username"
              placeholder="johndoe"
              [icon]="userIcon"
              [error]="getErrorMessage('username')"
            ></app-input>

            @if (error()) {
              <div class="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600 ring-1 ring-red-500/10">
                <div class="size-1.5 rounded-full bg-red-600 animate-pulse"></div>
                {{ error() }}
              </div>
            }

            <app-button
              type="submit"
              [loading]="isLoading()"
              [disabled]="registerForm.invalid || isLoading()"
              className="register-btn w-full py-7 text-md font-black tracking-wide uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
               <span>Initialize Account</span>
               <lucide-icon [name]="ArrowRight" class="size-4 ml-2"></lucide-icon>
            </app-button>
          </form>

          <div class="mt-8 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest app-text-soft">
            <lucide-icon [name]="Key" class="size-3"></lucide-icon>
            <span>Secure Encryption Enabled</span>
          </div>
        </app-card>

        <p class="mt-8 text-center text-sm font-medium app-text-muted">
          Already have an operational ID? 
          <a routerLink="/login" class="font-black text-indigo-400 hover:text-indigo-300 underline decoration-2 underline-offset-4 decoration-indigo-400/20">Sign in</a>
        </p>
      </div>

      <!-- Icon Templates -->
      <ng-template #mailIcon>
        <lucide-icon [name]="Mail" class="size-4"></lucide-icon>
      </ng-template>
      <ng-template #userIcon>
        <lucide-icon [name]="User" class="size-4"></lucide-icon>
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

    .register-btn {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%) !important;
      color: white !important;
      box-shadow: 0 10px 25px -10px rgba(79, 70, 229, 0.5) !important;
      border: none !important;
    }

    .register-btn:hover {
      transform: translateY(-2px) scale(1.02) !important;
      box-shadow: 0 20px 30px -10px rgba(79, 70, 229, 0.6) !important;
    }

    :host ::ng-deep .card-base {
       border-radius: 2.5rem !important;
    }
  `]
})
export class RegisterFormComponent {
  private fb = inject(FormBuilder);
  private authApi = inject(AuthApiService);

  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]]
  });

  isLoading = signal(false);
  error = signal<string | null>(null);

  onSuccess = output<any>();

  // Icons
  protected User = User;
  protected Mail = Mail;
  protected UserPlus = UserPlus;
  protected ArrowRight = ArrowRight;
  protected Loader2 = Loader2;
  protected Key = Key;

  getErrorMessage(controlName: string): string | null {
    const control = this.registerForm.get(controlName);
    if (!control || !control.errors || !(control.dirty || control.touched)) {
      return null;
    }

    if (control.errors['required']) return 'This field is required';
    if (control.errors['email']) return 'Invalid email address';
    if (control.errors['minlength']) {
      return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
    }

    return 'Invalid field';
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    const userData = this.registerForm.getRawValue() as any;
    this.authApi.register(userData).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.onSuccess.emit(response);
      },
      error: () => {
        this.isLoading.set(false);
        this.error.set('Account creation protocols failed. Please verify data.');
      }
    });
  }
}
