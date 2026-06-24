import axios from "axios";
import { ProductsResponse, ProductsQueryParams } from "../types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProducts(
  params: ProductsQueryParams,
): Promise<ProductsResponse> {
  const { category, limit = 20, lastCreatedAt, lastId } = params;

  const queryParams: Record<string, string> = {
    limit: limit.toString(),
  };

  if (category) queryParams.category = category;
  if (lastCreatedAt) queryParams.lastCreatedAt = lastCreatedAt;
  if (lastId) queryParams.lastId = lastId;

  const response = await axios.get<ProductsResponse>(`${API_URL}/products`, {
    params: queryParams,
  });

  return response.data;
}
