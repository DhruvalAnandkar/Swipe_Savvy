"use client";

import React from "react";
import { LoadScript } from "@react-google-maps/api";

// Specify the Google Maps libraries to load
const libraries = ["places"] as "places"[];

// Provider component to wrap your app with Google Maps JS API loaded
export function GoogleMapsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={libraries}
      preventGoogleFontsLoading={true} // Avoid Google Fonts auto-loading for performance
    >
      {children}
    </LoadScript>
  );
}
