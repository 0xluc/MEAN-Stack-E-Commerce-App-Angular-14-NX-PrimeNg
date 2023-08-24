import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule } from '@angular/router';
import { ProductsItemsComponent } from './components/products-items/products-items.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
@NgModule({
  imports: [CommonModule, RouterModule, ButtonModule],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductsItemsComponent,
    FeaturedProductsComponent

  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductsItemsComponent,
    FeaturedProductsComponent
  ]
})
export class ProductsModule {}
