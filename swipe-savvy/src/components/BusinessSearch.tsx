"use client";

import React, { useState, useCallback } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

export default function BusinessSearch() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const [query, setQuery] = useState("");

  const onLoad = useCallback((autoC: google.maps.places.Autocomplete) => {
    setAutocomplete(autoC);
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setQuery(place.name || "");
      // You can save more place details here
    }
  };

  if (loadError)
    return (
      <div className="text-red-600 font-semibold p-4 bg-red-100 rounded-md max-w-md mx-auto">
        Error loading Google Maps. Please try again later.
      </div>
    );

  if (!isLoaded)
    return (
      <div className="text-gray-600 italic p-4 max-w-md mx-auto text-center">
        Loading Google Maps...
      </div>
    );

  return (
    <div className="max-w-md mx-auto">
      <label
        htmlFor="business-search"
        className="block mb-2 text-gray-900 font-semibold text-lg"
      >
        Find Your Business
      </label>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          id="business-search"
          type="text"
          placeholder="Start typing business name or phone number..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full
            rounded-lg
            border
            border-gray-300
            bg-white
            px-5
            py-3
            text-gray-900
            text-base
            font-medium
            placeholder-gray-400
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-blue-600
            focus:border-transparent
            transition
            duration-300
            ease-in-out
            caret-blue-600
            relative
            z-10
          "
          style={{
            boxShadow:
              "inset 0 1px 3px rgb(0 0 0 / 0.06), inset 0 -1px 0 rgb(0 0 0 / 0.02)",
          }}
        />
      </Autocomplete>

      {/* Fancy animated underline */}
      <style jsx>{`
        input:focus {
          border-color: transparent !important;
          box-shadow: 0 2px 0 0 #2563eb, inset 0 1px 3px rgb(0 0 0 / 0.06),
            inset 0 -1px 0 rgb(0 0 0 / 0.02);
        }
        input::placeholder {
          font-style: italic;
          font-weight: 500;
          letter-spacing: 0.02em;
        }
      `}</style>
    </div>
  );
}
