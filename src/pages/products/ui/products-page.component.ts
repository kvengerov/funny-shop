import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '@widgets/product-list';

@Component({
    selector: 'app-products-page',
    standalone: true,
    imports: [CommonModule, ProductListComponent],
    template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="mb-8 text-3xl font-bold text-gray-900">Our Products</h1>
      <app-product-list />
    </div>
  `
})
export class ProductsPageComponent { }
