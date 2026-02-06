import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCardComponent, ProductService } from '@entities/product';

/**
 * Widget displaying a responsive grid of products.
 * Automatically fetches the product catalog upon initialization using Signal reactivity.
 */
@Component({
  selector: 'app-product-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        <!-- Fallback state during initial data load -->
        <p class="col-span-full text-center app-text-muted">Loading products...</p>
      }
    </div>
  `
})
export class ProductListComponent {
  /** Service for accessing product catalog data */
  private readonly productService = inject(ProductService);

  /** 
   * Reactive signal holding the current list of products.
   * Why: Automatically updates the view when the catalog data is retrieved.
   */
  protected readonly products = toSignal(this.productService.getProducts());
}
