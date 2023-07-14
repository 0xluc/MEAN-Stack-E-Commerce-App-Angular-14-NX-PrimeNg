import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@mean/products';

@Component({
  selector: 'mean-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit{
  products:Product[] = []
  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._getProducts()
  }
  deleteProduct(arg0: any) {
  }
  updateProduct(id: string) {
    this.router.navigateByUrl('/categories/form/' + id)
  }
  private _getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products
    })
  }
}
