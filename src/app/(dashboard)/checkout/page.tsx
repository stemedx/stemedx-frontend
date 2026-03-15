"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import CheckoutComponent from "@/components/checkout";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get('client_secret');

  if (!clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-400 rounded-lg p-6 max-w-md">
          <p className="text-red-200">Invalid checkout session. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <CheckoutComponent clientSecret={clientSecret} />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading checkout...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
