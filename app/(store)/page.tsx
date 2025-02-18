import DiscountsBanner from "@/components/common/DiscountsBanner";
import ProductsView from "@/components/common/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div>
      {/* DIscount Banner */}
      {/* <DiscountsBanner /> */}

      {/* Rest of Product */}
      <div className="flex flex-col items-center min-h-screen py-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
