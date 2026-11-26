export type CategoryRef = {
  _id: string;
  name: string;
  slug: string;
  image?: string;
};

export type BrandRef = {
  _id: string;
  name: string;
  slug: string;
  image?: string;
};

export type SubcategoryRef = {
  _id: string;
  name: string;
  slug: string;
  category: string;
};

export type Product = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  category: CategoryRef;
  brand: BrandRef;
  subcategory: SubcategoryRef[];
  ratingsAverage: number;
  ratingsQuantity: number;
  sold: number;
  createdAt: string;
  updatedAt: string;
};

export type Review = {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type ProductDetail = Product & {
  reviews: Review[];
};

export type Category = CategoryRef & {
  createdAt: string;
  updatedAt: string;
};

export type Brand = BrandRef & {
  createdAt: string;
  updatedAt: string;
};

export type Subcategory = SubcategoryRef & {
  createdAt: string;
  updatedAt: string;
};

export type Pagination = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
};

export type ListResponse<T> = {
  results: number;
  metadata: Pagination;
  data: T[];
};

export type ItemResponse<T> = {
  data: T;
};

export type ProductQuery = {
  page?: number;
  limit?: number;
  sort?: string;
  keyword?: string;
  category?: string;
  brand?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type ShopCounts = {
  cart: number;
  wishlist: number;
};

export type CartProduct = {
  _id: string;
  id?: string;
  title: string;
  imageCover: string;
  quantity: number;
  category: CategoryRef;
  brand?: BrandRef;
  subcategory?: SubcategoryRef[];
  ratingsAverage?: number;
};

export type CartItem = {
  _id: string;
  count: number;
  price: number;
  product: CartProduct;
};

export type CartApiItem = Omit<CartItem, "product"> & {
  product: CartProduct | string;
};

export type CartSnapshot = {
  id?: string;
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
};

export type CartApiResponse = {
  status?: string;
  numOfCartItems?: number;
  cartId?: string;
  data?: {
    _id?: string;
    products?: CartApiItem[];
    totalCartPrice?: number;
  };
};

export type WishlistApiResponse = {
  status?: string;
  count?: number;
  data?: Product[];
};
