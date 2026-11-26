import type { BrandRef, CategoryRef } from "@/types/shop";

export type ShippingAddress = {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
};

export type OrderProduct = {
  _id: string;
  id?: string;
  title: string;
  imageCover: string;
  category?: CategoryRef;
  brand?: BrandRef;
  subcategory?: Array<{
    _id: string;
    name: string;
    slug: string;
    category: string;
  }>;
  ratingsAverage?: number;
  ratingsQuantity?: number;
};

export type OrderItem = {
  _id: string;
  count: number;
  price: number;
  product: OrderProduct;
};

export type OrderUser = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
};

export type Order = {
  _id: string;
  id?: number;
  user: OrderUser;
  cartItems: OrderItem[];
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderPricing = {
  cartPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
};

export type CashOrderResponse = {
  status?: string;
  message?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  pricing?: OrderPricing;
  data: Order;
};

export type CheckoutSessionResponse = {
  status?: string;
  session?: {
    url?: string;
    success_url?: string;
    cancel_url?: string;
  };
};
