"use client";

import { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";
import { createClient } from "@/lib/services/supabase/client";

export function EmailVerificationBanner() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && !user.user_metadata?.email_verified) {
          setShow(true);
        }
      } catch (error) {
        console.error("Error checking email verification:", error);
      }
    };

    checkEmailVerification();
  }, [supabase]);

  if (!show || dismissed) return null;

  return (
    <div className="bg-orange-500/20 border-b border-orange-500/30 px-4 py-3 relative">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-orange-200">
          <Mail size={20} />
          <span className="text-sm font-medium">
            Email is not verified. Please go to your inbox and verify your email.
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-orange-200 hover:text-white transition-colors"
          aria-label="Dismiss banner"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}