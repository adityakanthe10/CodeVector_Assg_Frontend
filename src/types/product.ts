export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Cursor {
  created_at: string;
  _id: string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  nextCursor: Cursor | null;
}

export interface ProductsQueryParams {
  category?: string;
  limit?: number;
  lastCreatedAt?: string;
  lastId?: string;
}

export interface ProductsState {
  products: Product[];
  nextCursor: Cursor | null;
  selectedCategory: string;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}
