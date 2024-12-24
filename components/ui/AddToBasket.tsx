"use client";

import { Product } from "@/sanity.types";
import { useBasket } from "@/store/store";
import { useEffect, useState } from "react";

interface AddToBasketProps {
  product: Product;
  disabled?: boolean; // optional prop to disable the button when the product is out of stock or unavailable in the current location.
}

const AddToBasket = ({ product, disabled }: AddToBasketProps) => {
  const { addItem, removeItem, getItemsCount } = useBasket();
  const [isClient, setIsClient] = useState(false);
  const itemCount = getItemsCount(product?._id);

  // Check if the current component is being rendered on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Return early if the component is not being rendered on the client-side
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => removeItem(product?._id)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${itemCount === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
        disabled={itemCount === 0 || disabled}
      >
        <span
          className={`text-xl font-bold ${itemCount === 0 ? "text-black" : "text-gray-600"}`}
        >
          -
        </span>
      </button>
      <span className="w-8 text-center font-semibold">{itemCount}</span>
      <button
        onClick={() => addItem(product)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}`}
        disabled={disabled}
      >
        <span
          className={`text-xl font-bold ${disabled ? "text-black" : "text-white"}`}
        >
          +
        </span>
      </button>
    </div>
  );
};

export default AddToBasket;
