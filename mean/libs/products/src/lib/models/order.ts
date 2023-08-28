import { Product } from "./product";

export class userInfo {
  id?: number;
  name?: string;
  email?: string;
}

export class orderItems {
  order_id?: number;
  product_id?: number;
  quantity?: number;
  product?: Product
}

export class Order {
  id?: number;
  orderItems?: orderItems[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: string;
  totalPrice?: number;
  userInfo?: any;
  dataOrdered?: Date;
}
