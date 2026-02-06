import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { SessionService } from '@entities/session';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('shop');
  protected readonly sessionService = inject(SessionService);
  protected readonly router = inject(Router);

  logout() {
    this.sessionService.logout();
    this.router.navigate(['/']);
  }

  get isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }
}
