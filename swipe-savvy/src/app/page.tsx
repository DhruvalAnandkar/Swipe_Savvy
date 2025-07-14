"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const containerControls = useAnimation();

  useEffect(() => {
    setIsMounted(true);
    containerControls.start({ opacity: 1, y: 0 });
  }, [containerControls]);

  const handlePlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const name = place.name || "";
        const address = place.formatted_address || "";
        const lat = place.geometry?.location?.lat();
        const lng = place.geometry?.location?.lng();

        const queryParams = new URLSearchParams({
          name,
          address,
          lat: lat?.toString() || "",
          lng: lng?.toString() || "",
        });

        router.push(`/verify?${queryParams.toString()}`);
      }
    }
  };

  if (!isMounted) return null;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative select-none font-sans"
      style={{
        backgroundImage: "url('/assets/herobg.jpg')",
        backgroundColor: "#1e293b",
      }}
      aria-label="Swipe Savvy Home page"
    >
      {/* Overlay with smooth fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-b from-black to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">
        {/* Progress Bar - Step 1 of 4 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4 w-full max-w-xl"
          aria-label="Step 1 of 4"
        >
          <div className="text-sm font-semibold text-gray-300 tracking-wide uppercase">
            Step 1 of 4
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full mt-1 overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "25%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-xl w-full"
        >
          <motion.img
            src="/assets/logosevvy.png"
            alt="Swipe Savvy Logo"
            className="h-14 mb-6 mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />

          <motion.h1
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            You've Been Selected for a Loyalty Listing
          </motion.h1>

          <motion.p
            className="text-gray-700 text-sm md:text-base mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Your business has been recognized for outstanding reputation. Join
            the Swipe Savvy Rewards Network — free of charge.
          </motion.p>

          {/* Search Box container with animated focus effect */}
          <motion.div
            animate={{
              boxShadow: isFocused
                ? "0 8px 20px rgba(59, 130, 246, 0.4)"
                : "0 2px 8px rgba(0,0,0,0.1)",
              scale: isFocused ? 1.02 : 1,
              borderColor: isFocused ? "#3b82f6" : "#d1d5db",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex items-center border rounded-xl px-5 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 cursor-text"
          >
            <FaSearch
              className={`text-gray-400 mr-3 transition-colors duration-300 ${
                isFocused ? "text-blue-500" : ""
              }`}
              aria-hidden="true"
            />
            <StandaloneSearchBox
              onLoad={(ref) => setSearchBox(ref)}
              onPlacesChanged={handlePlacesChanged}
            >
              <motion.input
                type="text"
                placeholder="Search your business..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full bg-transparent outline-none placeholder-gray-400 text-gray-900 text-lg font-medium"
                aria-label="Business search"
                autoComplete="off"
                spellCheck={false}
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              />
            </StandaloneSearchBox>
          </motion.div>

          <motion.p
            className="text-xs text-gray-500 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            We'll help locate your business. Confirm it on the next step.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
