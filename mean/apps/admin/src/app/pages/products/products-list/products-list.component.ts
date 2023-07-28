import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@mean/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'mean-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy{
  products:Product[] = []
  endSub$ = new Subject<void>();
  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._getProducts()
  }
  ngOnDestroy(): void {
   this.endSub$.next()
   this.endSub$.complete()
  }
  deleteProduct(arg0: any) {
  }
  updateProduct(id: string) {
    this.router.navigateByUrl('/products/form/' + id)
  }
  private _getProducts() {
    this.productService.getProducts().pipe(takeUntil(this.endSub$)).subscribe(products => {
      this.products = products
    })
  }
}
