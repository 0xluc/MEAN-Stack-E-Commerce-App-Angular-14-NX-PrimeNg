import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductsItemsComponent } from './components/products-items/products-items.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from '@mean/ui';

const routes: Routes = [
  {
    path: 'products', component: ProductListComponent,
  },
  {
    path: 'category/:categoryId', component: ProductListComponent
  },
  {
    path: 'products/:productId', component: ProductPageComponent
  }
]


@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ButtonModule, CheckboxModule, FormsModule, RatingModule, InputNumberModule, UiModule],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductsItemsComponent,
    FeaturedProductsComponent,
    ProductListComponent,
    ProductPageComponent,
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductsItemsComponent,
    FeaturedProductsComponent,
    ProductListComponent,
    ProductPageComponent
  ]
})
export class ProductsModule {}
