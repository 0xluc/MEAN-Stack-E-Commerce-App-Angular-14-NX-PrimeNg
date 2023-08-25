import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule } from '@angular/router';
import { ProductsItemsComponent } from './components/products-items/products-items.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { ProductListComponent } from './pages/product-list/product-list.component';
@NgModule({
  imports: [CommonModule, RouterModule, ButtonModule],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductsItemsComponent,
    FeaturedProductsComponent,
    ProductListComponent

  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductsItemsComponent,
    FeaturedProductsComponent,
    ProductListComponent
  ]
})
export class ProductsModule {}
