"use client";

import { ClerkLoaded, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const { user } = useUser();

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      <div>
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0 hover:scale-110 hover:transform transition-all uppercase"
        >
          Shoppr
        </Link>

        <Form
          action="/search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for products..."
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
          />
        </Form>

        <div>
          <Link
            href="/"
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[150px]"
          >
            <ShoppingCart className="w-6 h-6" />
            {/* span item count */}
            <span>My Basket</span>
          </Link>

          {/* User */}
          <ClerkLoaded>
            {user && (
              <Link
                href="/"
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[150px]"
              >
                <PackageIcon className="w-6 h-6" />
                {/* span item count */}
                <span>My Orders</span>
              </Link>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
