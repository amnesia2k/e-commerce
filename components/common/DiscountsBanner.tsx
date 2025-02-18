import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { salesByCouponCode } from "@/sanity/lib/sales/salesByCouponCode";

const DiscountsBanner = async () => {
  const sale = await salesByCouponCode(COUPON_CODES?.XMAS24);

  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-red-600 to-green-600 text-white p-6 mt-2 rounded-lg shadow-lg">
      <div className="container mx-auto flex items-center justify-between cursor-no-drop">
        <div className="flex-1">
          <h2 className="text-3xl sm:text-5xl font-bold sm:font-extrabold text-left mb-4">
            {sale?.title}
          </h2>
          <p className="text-left text-xl sm:text-3xl font-semibold mb-6">
            {sale?.description}
          </p>

          <div className="flex">
            <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300">
              <span className="font-bold md:font-extrabold text-sm md:text-xl">
                Use Code:{" "}
                <span className="text-red-600">{sale?.couponCode}</span>
                <span className="ml-2 font-bold text-sm md:text-xl">
                  for {sale?.discountAmount}% OFF
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="hidden md:block transform hover:scale-105 transition duration-300">
          <h3 className="text-[150px]">🎄</h3>
        </div>
      </div>
    </div>
  );
};

export default DiscountsBanner;
