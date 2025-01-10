// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button";
// import { useBasket } from "@/store/store";
// import { useUser } from "@clerk/nextjs";
// import { closePaymentModal, FlutterWaveButton } from "flutterwave-react-v3";

// export default function Flutterwave() {
//   const { user } = useUser();

//   const baseUrl =
//     process.env.NODE_ENV === "production"
//       ? `https://${process.env.URL}` // Use Netlify's primary deployment URL
//       : `${process.env.NEXT_PUBLIC_BASE_URL}`; // Use localhost for development

//   const publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY ?? "";
//   const email = user?.emailAddresses[0]?.emailAddress || "";
//   const name = `${user?.firstName || ""} ${user?.lastName || ""}`;
//   const price = useBasket?.getState()?.getTotalPrice();
//   const transactionRef = crypto.randomUUID()

//   const config = {
//     public_key: publicKey,
//     tx_ref: `txn-${transactionRef}`,
//     amount: price,
//     currency: "NGN",
//     payment_options: "card, mobilemoney, ussd",
//     redirect_url: `${baseUrl}/success`,
//     customer: {
//       email,
//       phone_number: "",
//       name,
//     },
//     customizations: {
//       title: "Shoprr",
//       description: "Payment for items in cart",
//       logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
//     },
//   };
//   const fwConfig = {
//     ...config,
//     text: "Proceed to Checkout",
//     callback: (response: any) => {
//       console.log(response);
//       closePaymentModal(); // this will close the modal programmatically
//     },
//     onClose: () => { },
//   };

//   return (
//     <Button
//       asChild
//       variant="outline"
//       className="mt-4 w-full bg-[#7c3aed] text-white hover:bg-[#5d27bb] hover:text-white disabled:bg-gray-400"
//     >
//       <FlutterWaveButton {...fwConfig} />
//     </Button>
//   )
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useBasket } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { closePaymentModal, FlutterWaveButton } from "flutterwave-react-v3";

export default function Flutterwave() {
  const { user } = useUser();

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.URL}` // Use Netlify's primary deployment URL
      : `${process.env.NEXT_PUBLIC_BASE_URL}`; // Use localhost for development

  const publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY ?? "";
  const email = user?.emailAddresses[0]?.emailAddress || "";
  const name = `${user?.firstName || ""} ${user?.lastName || ""}`;
  const price = useBasket?.getState()?.getTotalPrice();
  const transactionRef = crypto.randomUUID();

  const config = {
    public_key: publicKey,
    tx_ref: `txn-${transactionRef}`,
    amount: price,
    currency: "NGN", // You can change this to "USD" or other supported currencies
    payment_options: "card, mobilemoney, ussd, googlepay", // Add googlepay here
    redirect_url: `${baseUrl}/success`,
    customer: {
      email,
      phone_number: "",
      name,
    },
    customizations: {
      title: "Shoprr",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Proceed to Checkout",
    callback: (response: any) => {
      console.log(response);
      closePaymentModal();
    },

    onClose: () => {
      console.log("Payment modal closed");
    },
  };

  return (
    <Button
      asChild
      variant="outline"
      className="mt-4 w-full bg-[#7c3aed] text-white hover:bg-[#5d27bb] hover:text-white disabled:bg-gray-400"
    >
      <FlutterWaveButton {...fwConfig} />
    </Button>
  );
}

