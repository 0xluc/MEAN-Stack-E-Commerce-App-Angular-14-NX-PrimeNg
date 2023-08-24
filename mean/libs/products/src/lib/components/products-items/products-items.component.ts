import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'products-product-item',
  templateUrl: './products-items.component.html',
  styles: [
  ]
})
export class ProductsItemsComponent implements OnInit{
  @Input() product:Product;

  constructor() {

  }

  ngOnInit(): void {
  }
}
