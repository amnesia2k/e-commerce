export const COUPON_CODES = {
  XMAS24: "XMAS24",
  NY2024: "NY2024",
} as const;

export type CouponCode = keyof typeof COUPON_CODES;
