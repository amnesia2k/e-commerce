import AddToBasket from "@/components/ui/AddToBasket";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const outOfStock = product?.stock != null && product?.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row justify-center gap-10">
        <div
          className={`relative aspect-square overflow-hidden ${outOfStock ? "opacity-50" : ""}`}
        >
          {product?.image && (
            <Image
              src={imageUrl(product?.image).url()}
              alt={product?.name || "Product Image"}
              className="object-contain w-[400px] h-[400px] md:w-[700px] md:h-[700px] lg:w-[700px] lg:h-[700px]"
              width={300}
              height={300}
            />
          )}

          {outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
            <div className="text-xl font-semibold mb-4">₦{product?.price}</div>
            <div className="prose max-w-none mb-6">
              {Array.isArray(product?.description) && (
                <PortableText value={product?.description} />
              )}
            </div>
          </div>

          <div className="mt-6">
            <AddToBasket product={product} disabled={outOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
}
