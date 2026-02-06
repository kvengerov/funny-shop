import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@shared/ui';

/**
 * Landing page of the storefront.
 * Displays a hero section and introductory content to welcome users.
 */
@Component({
    selector: 'app-home-page',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, ButtonComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomePageComponent { }
