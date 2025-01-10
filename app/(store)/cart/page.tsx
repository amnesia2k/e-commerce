"use client";

import AddToBasket from "@/components/ui/AddToBasket";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { imageUrl } from "@/lib/imageUrl";
import { useBasket } from "@/store/store";
import { SignInButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Flutterwave from "@/lib/flutterwave";

export default function BasketPage() {
  const groupedItems = useBasket((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  // wait for client to mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>
        <p className="text-gray-600 text-lg">Your cart is empty</p>
      </div>
    );
  }
  // console.log("Basket Items:", groupedItems);


  // const metadata: Metadata = {
  //   orderNumber: crypto.randomUUID(),
  //   customerName: user?.firstName ?? "Unknown",
  //   customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
  //   // clerkUserId: user?.id
  // }



  return (
    <div className="container mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {groupedItems?.map((item) => (
            <div
              key={item?.product?._id}
              className="mb-4 p-4 border rounded flex items-center justify-between"
            >
              <div
                className="flex items-center cursor-pointer flex-1 min-w-0"
                onClick={() =>
                  router.push(`/product/${item?.product?.slug?.current}`)
                }
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                  {item?.product?.image && (
                    <Image
                      src={imageUrl(item?.product?.image).url()}
                      alt={item?.product?.name ?? "Product Image"}
                      width={96}
                      height={96}
                      className="object-cover rounded w-full h-full"
                    />
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold truncate">
                    {item?.product?.name}
                  </h2>
                  <p className="text-sm sm:text-base">
                    Price: ₦{(item?.product?.price ?? 0) * item?.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center ml-4 flex-shrink-0">
                <AddToBasket product={item?.product} />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div className="mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Items:</span>
              <span>
                {groupedItems?.reduce(
                  (total, item) => total + item?.quantity,
                  0
                )}
              </span>
            </p>
            <p className="flex justify-between text-2xl font-bold border-t pt-2">
              <span>Total:</span>
              <span>₦{useBasket?.getState()?.getTotalPrice()}</span>
            </p>
          </div>

          {/* check if user is signed in */}
          {isSignedIn ? (
            <Flutterwave />
          ) : (
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="mt-4 w-full bg-[#7c3aed] text-white hover:text-white hover:bg-[#5d27bb]"
              >
                Sign in to Checkout
              </Button>
            </SignInButton>
          )}
        </div>
        <div className="h-64 lg:h-0"></div>
      </div>
    </div>
  );
}
