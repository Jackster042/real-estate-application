"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const CallToActionSection = () => {
  return (
    <div className="relative py-24">
      <Image
        src="/landing-call-to-action.jpg"
        alt="Call to Action Background"
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/60"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-4xl xl:max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12"
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-10">
            <h2 className="text-2xl font-bold text-white">
              Find your Dream Rental Property
            </h2>
          </div>
          <div>
            <p className="text-white mb-3">
              Discover a wide range of rental properties in your desired
              location.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <button
                className="inline-block text-black bg-white rounded-lg px-6 py-3 font-semibold cursor-pointer hover:bg-gray-200
              hover:text-black"
              >
                Search
              </button>
              <Link
                href="/signup"
                scroll={false}
                className="inline-block text-white bg-red-400 hover:bg-red-500 rounded-lg px-6 py-3 font-semibold"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CallToActionSection;
