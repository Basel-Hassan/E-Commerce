"use server";

import { apiFetch, buildQuery } from "@/lib/api";
import { getServerAuthSession } from "@/lib/auth";
import type {
  Brand,
  Category,
  ItemResponse,
  ListResponse,
  Product,
  ProductDetail,
  ProductQuery,
  ShopCounts,
  Subcategory,
} from "@/types/shop";

const LIST_REVALIDATE = 300;

export async function getProducts(query: ProductQuery = {}) {
  const response = await apiFetch<ListResponse<Product>>(
    `api/v1/products${buildQuery({
      page: query.page,
      limit: query.limit ?? 40,
      sort: query.sort,
      keyword: query.keyword,
      category: query.category,
      brand: query.brand,
      subcategory: query.subcategory,
      "price[gte]": query.minPrice,
      "price[lte]": query.maxPrice,
    })}`,
    { next: { revalidate: LIST_REVALIDATE } },
  );

  return {
    products: response.data ?? [],
    total: response.results ?? response.data?.length ?? 0,
    pagination: response.metadata,
  };
}

export async function getProduct(id: string) {
  const response = await apiFetch<ItemResponse<ProductDetail>>(
    `api/v1/products/${id}`,
    { next: { revalidate: LIST_REVALIDATE } },
  );

  return response.data;
}

export async function getCategories() {
  const response = await apiFetch<ListResponse<Category>>(
    `api/v1/categories${buildQuery({ limit: 100 })}`,
    { next: { revalidate: LIST_REVALIDATE } },
  );

  return response.data ?? [];
}

export async function getCategory(id: string) {
  const response = await apiFetch<ItemResponse<Category>>(
    `api/v1/categories/${id}`,
    { next: { revalidate: LIST_REVALIDATE } },
  );

  return response.data;
}

export async function getBrands() {
  const response = await apiFetch<ListResponse<Brand>>(
    `api/v1/brands${buildQuery({ limit: 100 })}`,
    { next: { revalidate: LIST_REVALIDATE } },
  );

  return response.data ?? [];
}

export async function getSubcategories(categoryId: string) {
  const response = await apiFetch<ListResponse<Subcategory>>(
    `api/v1/subcategories${buildQuery({
      category: categoryId,
      limit: 100,
    })}`,
    { next: { revalidate: LIST_REVALIDATE } },
  );

  return response.data ?? [];
}

export async function getAllSubcategories() {
  const response = await apiFetch<ListResponse<Subcategory>>(
    `api/v1/subcategories${buildQuery({ limit: 100 })}`,
    { next: { revalidate: LIST_REVALIDATE } },
  );

  return response.data ?? [];
}

export async function getRelatedProducts(categoryId: string, productId: string) {
  const { products } = await getProducts({ category: categoryId, limit: 20 });
  return products.filter((product) => product._id !== productId).slice(0, 8);
}

export async function getShopCounts(): Promise<ShopCounts> {
  const session = await getServerAuthSession();
  const token = session?.apiToken;

  if (!token) return { cart: 0, wishlist: 0 };

  const [cart, wishlist] = await Promise.allSettled([
    apiFetch<{
      numOfCartItems?: number;
      data?: { products?: unknown[] };
    }>("api/v1/cart", { token, next: { revalidate: 0 } }),
    apiFetch<{ count?: number; data?: unknown[] }>("api/v1/wishlist", {
      token,
      next: { revalidate: 0 },
    }),
  ]);

  const cartCount =
    cart.status === "fulfilled"
      ? (cart.value.numOfCartItems ?? cart.value.data?.products?.length ?? 0)
      : 0;

  const wishlistCount =
    wishlist.status === "fulfilled"
      ? (wishlist.value.count ?? wishlist.value.data?.length ?? 0)
      : 0;

  return { cart: cartCount, wishlist: wishlistCount };
}


