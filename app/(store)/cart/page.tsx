"use client";

// import { Metadata } from "@/actions/createCheckoutSession";
import AddToBasket from "@/components/ui/AddToBasket";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { imageUrl } from "@/lib/imageUrl";
import { useBasket } from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";

export default function BasketPage() {
  const groupedItems = useBasket((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

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

  console.log("Basket Items:", groupedItems);

  // const public_key = process.env.NEXT_PUBLIC_PAYSTACK_TEST_PUBLIC_KEY;
  const email = user?.emailAddresses[0]?.emailAddress;
  const name = `${user?.firstName} ${user?.lastName}`;

  const componentProps = {
    email,
    amount: useBasket?.getState()?.getTotalPrice() * 100,
    metadata: {
      name,
    },
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    text: "Pay Now",
    onSuccess: () => {
      alert("Payment successful!");
      router.push("/cart");
    },
    onExit: () => {
      alert("Payment Cancelled");
    },
  };

  // const handleCheckout = async () => {
  //   if (!isSignedIn) {
  //     return;
  //   }
  //   setIsLoading(true);
  //   try {
  //     const metadata: Metadata = {
  //       orderNumber: crypto.randomUUID(),
  //       customerName: user?.fullName ?? "Unknown",
  //       customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
  //       clerkUserId: user!.id,
  //     };

  //     const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

  //     if (checkoutUrl) {
  //       window.location.href = checkoutUrl;
  //     }
  //   } catch (error) {
  //     console.error("Error Message:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="container mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="flex flex-col md:flex-row gap-8">
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

        <div className="w-full md:w-80 md:sticky md:top-4 h-fit bg-white p-6 border rounded order-first md:order-last fixed bottom-0 left-0 md:left-auto">
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
            <Button
              asChild
              variant="outline"
              // onClick={handleCheckout}
              className="mt-4 w-full bg-[#7c3aed] text-white hover:bg-[#5d27bb] hover:text-white disabled:bg-gray-400"
            >
              {/* {isLoading ? "Processing..." : "Checkout"} */}
              <PaystackButton {...componentProps} />
            </Button>
          ) : (
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="mt-4 w-full bg-[#7c3aed] text-white hover:bg-[#5d27bb]"
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
