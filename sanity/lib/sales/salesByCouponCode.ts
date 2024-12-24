import { defineQuery } from "next-sanity";
import { CouponCode } from "./couponCodes";
import { sanityFetch } from "../live";

export const salesByCouponCode = async (couponCode: CouponCode) => {
  const ACTIVE_SALES_COUPON_QUERY = defineQuery(`
    *[_type == "sales" && isActive == true && couponCode == couponCode] | order(validFrom desc)[0]
    `);

  try {
    const activeSale = await sanityFetch({
      query: ACTIVE_SALES_COUPON_QUERY,
      params: {
        couponCode,
      },
    });

    return activeSale ? activeSale?.data : null;
  } catch (error) {
    console.error("Error fetching active sales:", error);
    return null;
  }
};
