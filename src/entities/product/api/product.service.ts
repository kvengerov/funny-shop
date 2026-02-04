import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private http = inject(HttpClient);
    private readonly API_URL = '/api/products';

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.API_URL);
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.API_URL}/${id}`);
    }
}
