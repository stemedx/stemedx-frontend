"use client";

import { useSearchParams } from "next/navigation";
import { Mail, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="glass rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-gradient rounded-full mb-4">
              <Mail size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Check Your Email
            </h1>
            <p className="text-gray-300 text-sm">
              We've sent a verification link to
            </p>
            {email && (
              <p className="text-purple-400 font-semibold mt-1">
                {email}
              </p>
            )}
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
              <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-white font-medium text-sm">Click the verification link</p>
                <p className="text-gray-400 text-xs mt-1">
                  Open the email and click the verification link to activate your account
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
              <Clock className="text-yellow-400 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-white font-medium text-sm">Link expires in 24 hours</p>
                <p className="text-gray-400 text-xs mt-1">
                  Make sure to verify your email within 24 hours
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 mb-6">
            <p className="text-blue-300 text-sm">
              <span className="font-semibold">Didn't receive the email?</span>
              <br />
              Check your spam folder or contact support if you need help.
            </p>
          </div>

          <Link
            href="/login"
            className="w-full bg-primary-gradient text-white p-3 rounded-lg font-medium hover:opacity-90 transition-opacity block text-center"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
