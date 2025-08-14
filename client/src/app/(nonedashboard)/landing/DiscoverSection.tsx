"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface DiscoverCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

export const features = [
  {
    imageSrc: "/landing-icon-wand.png",
    title: "Search for Properties",
    description:
      "Browse through our extensive collection of rental properties in your desired location.",
  },
  {
    imageSrc: "/landing-icon-calendar.png",
    title: "Book Your Rental",
    description:
      "Once you've found the perfect rental property, easily book it online with just a few clicks.",
  },
  {
    imageSrc: "/landing-icon-heart.png",
    title: "Enjoy your New Home",
    description:
      "Move into your new rental property and start enjoying your dream home.",
  },
];

const DiscoverCard = ({ imageSrc, title, description }: DiscoverCardProps) => {
  return (
    <div className="px-4 py-12 shadow-lg rounded-lg md:h-72">
      <div className="bg-black p-[0.6rem] rounded-full mb-4 h-10 w-10 mx-auto">
        <Image
          src={imageSrc}
          width={30}
          height={30}
          className="w-full h-full"
          alt={title}
        />
      </div>
      <h3 className="mt-4 text-xl font-medium text-gray-800">{title}</h3>
      <p className="mt-2 text-base text-gray-500">{description}</p>
    </div>
  );
};

const DiscoverSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="py-24 px-6 sm:px-8 lg:px-8 xl:px-16 bg-white"
    >
      <div className="max-w-66xl mx-auto xl:max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div variants={itemVariants} className="my-12 text-center">
          Discover
          <p className="mt-2 text-lg text-gray-600">
            Find your Dream Rental Property Today!
          </p>
          <p className="max-w-3xl mx-auto mt-2 text-gray-500">
            Searching for your dream rental property has never been easier. With
            our user-friendly search feature, you can quickly find the perfect
            home that meets all your needs. Start your search today and discover
            your dream rental property!
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 text-center">
          {features.map((card, index) => (
            <motion.div key={index} variants={itemVariants}>
              <DiscoverCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DiscoverSection;
