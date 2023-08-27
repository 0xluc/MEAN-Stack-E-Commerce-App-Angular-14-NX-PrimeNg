import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { NavComponent } from './shared/nav/nav.component';

import { ProductsModule } from 'libs/products/src/lib/products.module';
import { UiModule } from '@mean/ui';
import { HttpClientModule } from '@angular/common/http';
import { OrdersModule } from '@mean/orders';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    BrowserAnimationsModule,
    ButtonModule,
    UiModule,
    ProductsModule,
    HttpClientModule,
    OrdersModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
