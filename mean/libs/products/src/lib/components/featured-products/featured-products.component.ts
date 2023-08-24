import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy{

  products: Product[] = [];
  endSubs$: Subject<void> = new Subject();

  constructor(private productService: ProductsService) { }
  ngOnInit(): void {
    this._getFeaturedProducts(3); // TODO: get this.
  }
  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
  private _getFeaturedProducts(count: number): void {
    this.productService.getFeaturedProducts(count).pipe(takeUntil(this.endSubs$)).subscribe((products)=> {
      this.products = products
    });
  }
}
