"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CreateAccountPage() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    website: "",
    isAuthorized: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/terms");
      } else {
        alert("Account creation failed. Please try again.");
      }
    } catch (err) {
      console.error("API error:", err);
      alert("An unexpected error occurred.");
    }
    setLoading(false);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-16 font-sans">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl max-w-3xl w-full p-10"
        noValidate
      >
        {/* Progress Bar */}
        <div className="mb-6 w-full" aria-label="Step 3 of 5">
          <div className="text-sm font-semibold text-gray-500 tracking-wide uppercase mb-1">
            Step 3 of 5
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "60%" }} // 3/5 = 60%
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10 leading-tight">
          Create Your Swipe Savvy Account
        </h1>

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Jane Doe"
              required
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              autoComplete="name"
              spellCheck={false}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              autoComplete="email"
              spellCheck={false}
            />
          </div>

          {/* Mobile */}
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Mobile Number
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="(123) 456-7890"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              autoComplete="tel"
              spellCheck={false}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              autoComplete="new-password"
            />
          </div>

          {/* Website - Full Width */}
          <div className="md:col-span-2">
            <label
              htmlFor="website"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Website or Social Link{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourbusiness.com"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Authorization Checkbox */}
        <div className="flex items-start mb-10">
          <input
            id="isAuthorized"
            name="isAuthorized"
            type="checkbox"
            checked={formData.isAuthorized}
            onChange={handleChange}
            required
            className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            aria-describedby="auth-desc"
          />
          <label
            htmlFor="isAuthorized"
            className="ml-3 block text-sm font-semibold text-gray-800"
            id="auth-desc"
          >
            I confirm that I am the business owner or an authorized
            representative.
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50"
          aria-busy={loading}
        >
          {loading ? "Saving..." : "Continue to Terms"}
        </button>
      </motion.form>
    </div>
  );
}
