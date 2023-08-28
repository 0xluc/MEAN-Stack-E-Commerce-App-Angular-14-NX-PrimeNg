import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ORDER_STATUS, Order, OrdersService, UsersService, orderItems } from '@mean/products';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [],
})
export class CheckoutPageComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: orderItems[] = [];
  userId: number = 3
  countries:any={} 

  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrdersService
  ) {}
  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCountries();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCountries() {
    this.countries = {
      'US': 'United States',
      'CA': 'Canada',
      'AF': 'Afghanistan',
      'AL': 'Albania',
      'DZ': 'Algeria',
      'DS': 'American Samoa',
      'AD': 'Andorra',
      'AO': 'Angola',
      'AI': 'Anguilla',
      'AQ': 'Antarctica',
      'AG': 'Antigua and Barbuda',
      'AR': 'Argentina',
      'AM': 'Armenia',
      'AW': 'Aruba',
      'AU': 'Australia',
      'AT': 'Austria',
      'AZ': 'Azerbaijan',
      'BS': 'Bahamas',
      'BH': 'Bahrain',
      'BD': 'Bangladesh',
    }
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order:Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value,
      status: '0',
      userInfo: this.userId,
      dataOrdered: new Date()
    }
    this.orderService.createOrder(order).subscribe(
      () => {
        this.cartService.emptyCart()
        this.router.navigate(['/success']);
      }, (error) => {
        console.log(error) 
      }
    )
  }
  private _getCartItems() {
    const cart:Cart = this.cartService.getCart()
    this.orderItems = cart.items!.map(item => {
      return {
        productId: item.productId,
        quantity: item.quantity
      }
    })
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

}

