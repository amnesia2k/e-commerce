/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Metadata } from "@/actions/createCheckoutSession";
// import { backendClient } from "@/sanity/lib/backendClient";
// import { headers } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   // const body = await req.text()
//   // const headersList = await headers()
//   try {
//     const secretHash = process.env.NEXT_PUBLIC_FLUTTERWAVE_SECRET_HASH;

//     const sig = req.headers.get("verif-hash");
//     if (!sig || sig !== secretHash) {
//       return NextResponse.json(
//         { message: "Invalid signature" },
//         { status: 401 }
//       );
//     }

//     const body = await req.json();

//     console.log("Webhook payload:", body);

//     if (body.status === "successful") {
//       const { tx_ref, customer, amount, currency } = body;

//       // Log transaction details
//       console.log(`Transaction Ref: ${tx_ref}`);
//       console.log(`Customer Email: ${customer.email}`);
//       console.log(`Amount Paid: ${amount}`);
//       console.log("Cart cleared for user:", customer.email);

//       // Sanity Push
//       const order = await backendClient.create({
//         _type: "order",
//         orderNumber: tx_ref,
//         customerName: customer.name,
//         email: customer.email,
//         amountPaid: amount,
//         currency,
//         // items: [], // Add fetched items from Paystack
//         // metadata: {
//         //   // Add metadata from Sanity
//         //   // For example, create a new document with the order details
//         // },
//       })
//     }
//     return NextResponse.json(
//       { message: "Webhook processed successfully" },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("Error processing webhook:", err);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { backendClient } from "@/sanity/lib/backendClient";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

// export async function POST(req: NextRequest) {
//   try {
//     const secretHash = process.env.NEXT_PUBLIC_FLUTTERWAVE_SECRET_HASH;

//     const sig = req.headers.get("verif-hash");
//     if (!sig || sig !== secretHash) {
//       return NextResponse.json(
//         { message: "Invalid signature" },
//         { status: 401 }
//       );
//     }

//     const body = await req.json();

//     console.log("Webhook payload:", body);

//     if (body.status === "successful") {
//       const { tx_ref, customer, amount, currency, created_at, products } = body;

//       // Map products to match Sanity schema
//       const mappedProducts = products.map((product: any) => ({
//         _type: "object",
//         product: { _ref: product.id, _type: "reference" },
//         quantity: product.quantity,
//       }));

//       // Save to Sanity
//       const order = await backendClient.create({
//         _type: "order",
//         orderNumber: tx_ref,
//         customerName: customer.name,
//         email: customer.email,
//         totalPrice: amount,
//         currency,
//         products: mappedProducts,
//         status: "Paid",
//         orderDate: new Date(created_at).toISOString(),
//       });

//       console.log("Order saved to Sanity:", order);

//       return NextResponse.json(
//         { message: "Webhook processed successfully" },
//         { status: 200 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Webhook ignored. Transaction not successful." },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("Error processing webhook:", err);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
export async function POST(req: NextRequest) {
  const headersList = await headers();
  const sig = headersList.get("verify-hash");

  if (!sig) {
    return NextResponse.json({ message: "No signature" }, { status: 400 });
  }

  const secretHash = process.env.FLW_SECRET_HASH;

  if (!secretHash) {
    console.log("Flutterwave webhook secret is not set");
    return NextResponse.json(
      { message: "Flutterwave Webhook secret is not set" },
      { status: 400 }
    );
  }
  try {
    const body = await req.json();

    console.log("Webhook payload:", body);

    if (body.status === "successful") {
      const { tx_ref, customer, amount, currency, created_at, products } = body;

      // Map products to match Sanity schema
      const sanityProducts = products.map((product: any) => ({
        _key: crypto.randomUUID(),
        product: {
          _ref: product.id,
          _type: "reference",
        },
        quantity: product.quantity,
      }));

      // Save to Sanity
      const order = await backendClient.create({
        _type: "order",
        orderNumber: tx_ref,
        customerName: customer.name,
        email: customer.email,
        totalPrice: amount,
        currency,
        products: sanityProducts,
        status: "Paid",
        orderDate: new Date(created_at).toISOString(),
      });

      console.log("Order saved to Sanity:", order);
    }

    return NextResponse.json(
      { message: "Webhook ignored. Transaction not successful." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error processing webhook:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
