"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { Menu, PackageIcon, ShoppingCart, X } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    // setOpen((prev) => !prev);
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (
      e: MouseEvent | (MouseEvent & { target: Node })
    ) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      {/* Desktop/Tablet Navigation */}
      <header className="hidden md:flex flex-wrap justify-between items-center sm:px-4 py-2">
        <div className="flex w-full flex-wrap justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-primary cursor-pointer mx-auto sm:mx-0"
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
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary border w-full max-w-4xl"
            />
          </Form>

          <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
            <Link
              href="/cart"
              className="flex-1 relative flex justify-center sm:flex-none items-center space-x-2 bg-primary text-base text-white font-bold p-[10px] lg:px-4 lg:pt-2 rounded-full lg:rounded lg:w-[150px]"
            >
              {/* w-[150px] */}
              <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
              {/* span item count */}
              <span className="hidden lg:block">My Cart</span>
            </Link>

            {/* User Area */}
            <ClerkLoaded>
              <SignedIn>
                <Link
                  href="/orders"
                  className="flex-1 relative flex justify-center sm:flex-none items-center space-x-2 bg-primary text-base text-white font-bold p-[10px] lg:px-4 lg:pt-2 rounded-full lg:rounded lg:w-[150px]"
                >
                  {/* w-[150px] */}
                  <PackageIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span className="hidden lg:block">My Orders</span>
                </Link>
              </SignedIn>

              {user ? (
                <div className="flex items-center space-x-2">
                  <UserButton />

                  <div className="hidden sm:block text-xs">
                    <p className="text-gray-400">Welcome Back</p>
                    <p className="font-bold">{user?.fullName}</p>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  asChild
                  className="text-base font-bold py-2 px-4 w-[150px]"
                >
                  <SignInButton mode="modal" />
                </Button>
              )}
            </ClerkLoaded>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <header className="md:hidden py-3">
        <div className="flex w-full justify-center items-center gap-5">
          <Link
            href="/"
            className="text-xl font-semibold text-primary cursor-pointer"
          >
            Shoppr
          </Link>

          <Form action="/search" className="w-full">
            <input
              type="text"
              name="query"
              placeholder="Search products..."
              className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary border w-full"
            />
          </Form>
          <div onClick={toggleMenu} className="cursor-pointer">
            <Menu />
          </div>

          {/* Sidebar */}
          <aside
            ref={sidebarRef}
            className={`fixed top-0 right-0 h-full w-[250px] bg-white transform ${open ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50`}
          >
            <div className="p-4">
              <div onClick={toggleMenu} className="cursor-pointer">
                <X className="w-6 h-6" />
              </div>
            </div>

            <div className="flex flex-col items-start p-6 space-y-4">
              <ClerkLoaded>
                {user ? (
                  <div className="flex items-center space-x-2">
                    <UserButton />
                    <div className="text-sm">
                      <p className="text-gray-400">Welcome Back</p>
                      <p className="font-bold">{user?.fullName}</p>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    asChild
                    className="text-base font-bold py-2 px-4 w-full"
                  >
                    <SignInButton mode="modal" />
                  </Button>
                )}
                <hr className="h-[1px] w-[calc(100%+3rem)] -mx-6" />
                <SignedIn>
                  <Link
                    href="/orders"
                    onClick={toggleMenu}
                    className="flex items-center space-x-2"
                  >
                    <PackageIcon className="w-5 h-5" />
                    <span>My Orders</span>
                  </Link>
                </SignedIn>
              </ClerkLoaded>
              <hr className="h-[1px] w-[calc(100%+3rem)] -mx-6" />

              <Link
                href="/cart"
                onClick={toggleMenu}
                className="flex items-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {/* span item count */}
                <span>My Cart</span>
              </Link>
            </div>
          </aside>
        </div>
      </header>
    </>
  );
};

export default Navbar;
