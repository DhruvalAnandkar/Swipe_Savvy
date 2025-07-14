"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function TermsPage() {
  const [accepted, setAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accepted) {
      alert("Please agree to the terms before continuing.");
      return;
    }
    router.push("/success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-10 p-10"
      >
        {/* Left Section */}
        <div className="md:col-span-2">
          {/* Progress */}
          <div className="mb-4" aria-label="Step 4 of 5">
            <p className="text-sm text-gray-500 font-medium mb-2">
              Step 4 of 5
            </p>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "80%" }} // 4/5 = 80%
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Terms of Participation
          </h1>

          {/* Collapsible Terms */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setShowTerms(!showTerms)}
              className="text-blue-600 text-sm font-medium underline hover:text-blue-800 transition"
              aria-expanded={showTerms}
            >
              {showTerms ? "Hide Terms" : "Read Terms & Privacy Policy"}
            </button>

            <AnimatePresence>
              {showTerms && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-5 text-sm text-gray-700 space-y-4 max-h-64 overflow-y-auto leading-relaxed"
                >
                  <div>
                    <strong className="block text-gray-900 mb-1">
                      Swipe Savvy Merchant Agreement
                    </strong>
                    By listing your business, you agree to participate in the
                    Swipe Savvy Rewards Network and enable loyalty rewards at
                    your location. You can opt out at any time.
                  </div>
                  <div>
                    <strong className="block text-gray-900 mb-1">
                      Privacy Policy
                    </strong>
                    Your business information will be securely stored and never
                    shared with third parties without your explicit consent.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start mb-6">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 mr-3 border-gray-300 text-blue-600 focus:ring-blue-500"
              required
              id="accept-terms"
            />
            <label htmlFor="accept-terms" className="text-sm text-gray-800">
              I have reviewed and agree to the Swipe Savvy Terms and Privacy
              Policy.
            </label>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Activate My Free Listing
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Your Swipe Savvy window sticker and POS signage will be shipped
            within 5–7 business days.
          </p>
        </div>

        {/* Sidebar Benefits */}
        <div className="bg-gray-100 border border-gray-200 p-6 rounded-xl text-sm text-gray-800">
          <h2 className="font-semibold text-base mb-3">What You’ll Receive</h2>
          <ul className="space-y-2 list-disc list-inside text-gray-700">
            <li>Active loyalty listing</li>
            <li>Swipe Savvy storefront sticker</li>
            <li>POS signage with reward prompts</li>
            <li>Checkout integration support</li>
          </ul>
        </div>
      </motion.form>
    </div>
  );
}
