import { imageUrl } from "@/lib/imageUrl";
import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription } from "../ui/card";

const ProductThumb = ({ product }: { product: Product }) => {
  const outOfStock = product?.stock != null && product?.stock <= 0;
  return (
    <Card
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow hover:shadow-md transition-all duration-300 overflow-hidden p-3 ${outOfStock ? "opacity-50" : ""}`}
    >
      <CardContent>
        <Link href={`/product/${product?.slug?.current}`}>
          <div className="relative aspect-square overflow-hidden">
            {product?.image && (
              <Image
                className="object-contain rounded-md"
                src={imageUrl(product?.image).url()}
                alt={product?.name || "Product Image"}
                width={500}
                height={300}
              />
            )}

            {outOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                <span className="text-white font-bold text-lg">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          <CardDescription className="mt-1 flex flex-col gap-2">
            <h2 className="text-lg text-gray-800 font-semibold truncate">
              {product?.name}
            </h2>

            <p className="text-sm text-gray-600 line-clamp-2">
              {product?.description
                ?.map((block) =>
                  block?._type === "block"
                    ? block?.children?.map((child) => child?.text).join("")
                    : ""
                )
                .join("") || "No description available"}
            </p>

            <p className="font-bold text-gray-800">₦{product?.price}</p>
          </CardDescription>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductThumb;
