import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'products-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit, OnDestroy{
  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage: boolean
  endSubs$: Subject<void> = new Subject();
  constructor(
    private prodService: ProductsService,
    private catSer: CategoriesService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      params.categoryId ? this._getProducts([params.categoryId]) : this._getProducts()
      params.categoryId ? this.isCategoryPage = true : this.isCategoryPage = false
    })
    this._getCategories()
  }
  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
  categoryFilter(){
    const selectedCategories = this.categories.filter(cat => cat.checked).map((cat:Category) => cat.id)
    this._getProducts(selectedCategories)
  }
  private _getProducts(selectedCategories?: number[]){
    this.prodService.getProducts(selectedCategories).pipe(takeUntil(this.endSubs$)).subscribe(res => {
      this.products = res
      console.log(res)
    })
  }
  private _getCategories(){
    this.catSer.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(res => {
      this.categories = res
    })
  }
}
