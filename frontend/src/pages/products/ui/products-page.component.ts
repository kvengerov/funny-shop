import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '@widgets/product-list';

/**
 * Page component for the shop's product listing.
 * Serves as a container for the product list widget and handles layout.
 */
@Component({
  selector: 'app-products-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ProductListComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="mb-8 text-3xl font-bold app-text-main">Our Products</h1>
      <app-product-list />
    </div>
  `
})
export class ProductsPageComponent { }
