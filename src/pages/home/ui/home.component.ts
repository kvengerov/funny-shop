import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@shared/ui';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [RouterLink, ButtonComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomePageComponent { }
