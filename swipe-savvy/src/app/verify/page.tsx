"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function VerifyPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "Unknown Business";
  const address = searchParams.get("address") || "Address not available";
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-10 rounded-3xl shadow-2xl max-w-xl w-full"
      >
        {/* Progress Bar - Step 2 of 5 */}
        <div className="mb-6 w-full" aria-label="Step 2 of 5">
          <div className="text-sm font-semibold text-gray-500 tracking-wide uppercase mb-1">
            Step 2 of 5
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "40%" }} // 2/5 = 40%
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Is This Your Business?
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          We found a match based on your input. Please confirm before
          continuing.
        </p>

        {/* Business Info Card */}
        <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-4 shadow-sm mb-6 bg-gray-50">
          <Image
            src="/assets/business.jpg"
            alt={name}
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
          <div>
            <p className="text-base font-semibold text-gray-800">{name}</p>
            <p className="text-sm text-gray-600">{address}</p>
            {lat && lng && (
              <p className="text-xs text-gray-500 mt-1">
                Coordinates: {lat}, {lng}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/create-account" passHref>
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium">
              Yes, This Is My Business
            </button>
          </Link>
          <Link href="/" passHref>
            <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-100 transition font-medium">
              No, Go Back
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
