"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import confettiAnimation from "@/lottie/confetti.json";

export default function SuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "user@example.com" }), // Dynamically replace if user email is available
      });

      const data = await res.json();
      if (data?.url) {
        window.location.assign(data.url); // Ensures immediate redirect
      } else {
        console.error("Stripe Checkout URL not returned.");
      }
    } catch (error) {
      alert("An error occurred while redirecting to checkout.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-16 flex flex-col items-center justify-center relative">
      {/* Confetti Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Lottie
          animationData={confettiAnimation}
          loop
          autoplay
          className="w-full h-full"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center max-w-2xl mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-green-700 mb-3"
        >
          Your Business Is Now Live on Swipe Savvy
        </motion.h1>
        <p className="text-gray-700 text-sm md:text-base">
          You’ve successfully joined our merchant network. Upgrade to boost your
          visibility and get exclusive features.
        </p>
      </div>

      {/* Plans Section */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Free Plan - Current Plan Box */}
        <div className="bg-green-50 border-2 border-green-600 p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold text-green-800 mb-4">
            Current Plan
          </h2>
          <ul className="text-sm text-green-900 space-y-2 mb-4">
            <li>Business listing included</li>
            <li>Swipe Savvy window sticker</li>
            <li>POS rewards signage</li>
          </ul>
          <button className="w-full py-2 bg-green-600 text-white rounded-lg font-medium cursor-default">
            Active
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-blue-50 border-2 border-blue-600 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold text-blue-800 mb-4">
            Upgrade to Shop Savvy
          </h2>
          <ul className="text-sm text-gray-800 space-y-2 mb-4">
            <li>Priority placement in Swipe Savvy app</li>
            <li>Double visibility on promotions</li>
            <li>Sync listings with Google, Yelp, and Facebook</li>
            <li>Access analytics and reporting dashboard</li>
          </ul>
          <p className="text-sm text-gray-600 mb-4">
            Try free for 30 days, then{" "}
            <strong>$34.50/mo (locked in for life)</strong>
          </p>
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
          >
            {loading ? "Redirecting..." : "Upgrade My Listing"}
          </button>
          <button
            onClick={() => router.replace("/")}
            className="w-full mt-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
          >
            Stay on Free Plan
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative z-10 mt-12 max-w-2xl text-center">
        <h3 className="text-base font-semibold text-gray-700 mb-4">
          Merchant Testimonials
        </h3>
        <div className="bg-white p-5 rounded-xl shadow text-sm text-gray-600 leading-relaxed">
          “Swipe Savvy increased our store visits by 30% in just a few weeks.
          Upgrading unlocked even more visibility.”
          <br />
          <span className="block mt-2 font-medium text-gray-800">
            — Jane, Owner of FreshMart Café
          </span>
        </div>
      </div>
    </div>
  );
}
