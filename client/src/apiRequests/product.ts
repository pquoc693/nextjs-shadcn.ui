import http from "@/lib/http";
import {
  CreateProductBodyType,
  ProductListResType,
  ProductResType,
  UpdateProductBodyType
} from "@/schemaValidations/product.schema";

const productApiRequest = {
  getList: () => http.get<ProductListResType>("/products"),
  getDetail: (id: number) =>
    http.get<ProductResType>(`/products/${id}`, {
      cache: "no-store"
    }),
  create: (body: CreateProductBodyType) =>
    http.post<ProductResType>("/products", body),
  uploadImage: (body: FormData) =>
    http.post<{
      message: string;
      data: string;
    }>("/media/upload", body),
  update: (id: number, body: UpdateProductBodyType) =>
    http.put<ProductResType>(`/products/${id}`, body)
};

export default productApiRequest;
