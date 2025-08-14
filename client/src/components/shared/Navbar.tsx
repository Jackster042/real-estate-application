import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { NAVBAR_HEIGHT } from "@/lib/constants";

const Navbar = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex justify-between items-center w-full py-3 px-8 bg-foreground text-white">
        <div className="flex items-center gap-6 md:gap-4">
          <Link
            href="/"
            className="cursor-pointer hover:!text-primary-300"
            scroll={false}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Rentiful Logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="text-xl font-bold">
                RENT
                <span className="text-red-300 font-light hover:!text-gray-300">
                  IFUL
                </span>
              </div>
            </div>
          </Link>
        </div>
        <p className="text-primary-foreground hidden md:block">
          Discover your dream home in the heart of the city.
        </p>
        <div className="flex items-center gap-5">
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="text-white border-white bg-transparent hover:bg-white hover:text-gray-800 cursor-pointer rounded-lg"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              variant="secondary"
              className="text-white bg-destructive border-white  hover:bg-white hover:text-gray-800 cursor-pointer rounded-lg"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
