import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '@entities/product';

/**
 * Service responsible for product-related data operations.
 * Fetches product lists and individual product details from the API.
 */
@Injectable({
    providedIn: 'root'
})
export class ProductService {
    /** Reactive HTTP client for making API requests */
    private http = inject(HttpClient);

    /** Base API endpoint for products */
    private readonly API_URL = '/api/products';

    /**
     * Fetches all available products from the catalog.
     * @returns An Observable array of Product items
     */
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.API_URL);
    }

    /**
     * Fetches details for a specific product by its ID.
     * @param id The unique identifier of the product
     * @returns An Observable of a single Product item
     */
    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.API_URL}/${id}`);
    }
}
