import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit, OnDestroy{

  product: Product
  endSubs$ = new Subject<void>()
  quantity: number
  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.productId) {
        this._getProduct(params.productId);
      }
    })
  }
  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
  addToCart() {

  }
  private _getProduct(id: string) {
    this.prodService.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe(prod => {
      this.product = prod
    });
  }

}
