import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCardComponent, ProductService } from '@entities/product';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [ProductCardComponent],
    template: `
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      @if (products(); as list) {
        @for (product of list; track product.id) {
          <app-product-card 
            [product]="product"
            class="h-full"
          />
        }
      } @else {
        <p class="col-span-full text-center app-text-muted">Loading products...</p>
      }
    </div>
  `
})
export class ProductListComponent {
    private productService = inject(ProductService);

    products = toSignal(this.productService.getProducts());
}
