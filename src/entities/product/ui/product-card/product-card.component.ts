import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../model/product.model';
import { cn } from '@shared/lib/cn';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div [class]="cn('group relative block overflow-hidden rounded-lg app-card app-card-hover transition-all', className)">
      <div class="aspect-square w-full overflow-hidden app-surface-alt p-4">
        <img
          [src]="product.image"
          [alt]="product.title"
          class="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div class="p-4">
        <h3 class="mb-1 text-lg font-medium app-text-main line-clamp-1" [title]="product.title">
          {{ product.title }}
        </h3>
        <p class="mb-2 text-sm app-text-muted capitalize">
          {{ product.category }}
        </p>
        <div class="flex items-center justify-between">
          <p class="text-xl font-bold app-text-main">
            {{ product.price | currency }}
          </p>
          <div class="flex items-center gap-1 text-amber-400">
            <span class="text-sm font-medium">{{ product.rating.rate }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
              <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
            </svg>
            <span class="text-xs app-text-soft">({{ product.rating.count }})</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductCardComponent {
    @Input({ required: true }) product!: Product;
    @Input() className?: string;

    protected cn = cn;
}
