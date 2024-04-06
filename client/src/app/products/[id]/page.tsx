import productApiRequest from "@/apiRequests/product";
import ProductAddForm from "@/app/products/_components/product-add-form";
import Image from "next/image";

export default async function ProductDetail({
  params
}: {
  params: { id: string };
}) {
  let product = undefined;
  try {
    const { payload } = await productApiRequest.getDetail(Number(params.id));
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