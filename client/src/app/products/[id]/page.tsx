import productApiRequest from "@/apiRequests/product";
import ProductAddForm from "@/app/products/_components/product-add-form";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { cache } from "react";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const getDetail = cache(productApiRequest.getDetail);

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const { payload } = await getDetail(Number(params.id));
  const product = payload.data;

  return {
    title: product.name,
    description: product.description
  };
}

export default async function ProductDetail({ params, searchParams }: Props) {
  let product = undefined;
  try {
    const { payload } = await getDetail(Number(params.id));
    product = payload.data;
  } catch (error) {
    console.log("error111", error);
  }
  return (
    <div>
      {!product && <div>Không tìm thấy sản phẩm</div>}
      {product && (
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={180}
            height={180}
            className="w-32 h-32 object-cover"
          />

          <h3>{product.name}</h3>
          <div>{product.price}</div>
        </div>
      )}
    </div>
  );
}
