import ProductGrid from "@/components/common/ProductGrid";
import { searchProductByName } from "@/sanity/lib/products/searchProductByName";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const products = await searchProductByName(query);

  if (!products?.length) {
    return (
      <div className="flex flex-col items-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          No products found for: {query}
        </h1>
        <p className="text-gray-600 text-center">
          Try searching with different keywords
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center min-h-screen py-4">
      <div className="py-8 w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Search results for {query}
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
