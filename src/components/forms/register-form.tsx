"use client";

import { useState, useActionState, useEffect } from "react";
import { signupWithEmail } from "@/lib/actions/auth-server";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { getTranslations } from "@/locales";

interface AuthContent {
  modal: {
    titles: { signup: string };
    subtitles: { signup: string };
    fields: { name: string; email: string; password: string; confirmPassword: string };
    buttons: { signup: string };
    loading: { signup: string };
    errors: { passwordMismatch: string; unexpected: string };
  };
}

export function RegisterForm() {
  const { language } = useLanguage();
  const content = getTranslations('auth', language) as AuthContent;
  const [state, formAction, isPending] = useActionState(signupWithEmail, undefined);
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+94');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  // Redirect on successful signup (no error returned)
  useEffect(() => {
    if (state && !state.error) {
      router.push(`/confirm-email?email=${encodeURIComponent(email)}`);
    }
  }, [state, email, router]);

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          {content?.modal?.titles?.signup || "Join ICT101"}
        </h1>
        <p className="text-gray-300 text-sm">
          {content?.modal?.subtitles?.signup || "Create your account"}
        </p>
      </div>

      {state?.error && (
        <div className="bg-red-500/20 border border-red-400/30 text-red-300 p-3 rounded-lg mb-4 text-sm">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              First Name <span className="text-red-400">*</span>
            </label>
            <input
              name="first_name"
              type="text"
              placeholder="First Name"
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Last Name <span className="text-red-400">*</span>
            </label>
            <input
              name="last_name"
              type="text"
              placeholder="Last Name"
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder={content?.modal?.fields?.email || "Email Address"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                required
              >
                <option value="+94" className="bg-gray-900">+94</option>
                <option value="+1" className="bg-gray-900">+1</option>
                <option value="+44" className="bg-gray-900">+44</option>
                <option value="+91" className="bg-gray-900">+91</option>
                <option value="+61" className="bg-gray-900">+61</option>
                <option value="+971" className="bg-gray-900">+971</option>
                <option value="+33" className="bg-gray-900">+33</option>
                <option value="+49" className="bg-gray-900">+49</option>
                <option value="+81" className="bg-gray-900">+81</option>
                <option value="+82" className="bg-gray-900">+82</option>
                <option value="+86" className="bg-gray-900">+86</option>
                <option value="+65" className="bg-gray-900">+65</option>
                <option value="+60" className="bg-gray-900">+60</option>
                <option value="+66" className="bg-gray-900">+66</option>
                <option value="+84" className="bg-gray-900">+84</option>
              </select>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 15) {
                    setPhone(value);
                  }
                }}
                maxLength={15}
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            {/* Hidden field combining country code + phone for server action */}
            <input type="hidden" name="phone" value={`${countryCode}${phone}`} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={content?.modal?.fields?.password || "Password"}
                className="w-full p-3 pr-11 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Confirm Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder={content?.modal?.fields?.confirmPassword || "Confirm Password"}
                className="w-full p-3 pr-11 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              NIC Number
            </label>
            <input
              name="nic"
              type="text"
              placeholder="NIC Number"
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Date of Birth
            </label>
            <input
              name="dob"
              type="date"
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0]}
              min={new Date(new Date().setFullYear(new Date().getFullYear() - 120)).toISOString().split('T')[0]}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent [color-scheme:dark] cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Address Line 1
            </label>
            <input
              name="addressLine1"
              type="text"
              placeholder="Address Line 1"
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Address Line 2
            </label>
            <input
              name="addressLine2"
              type="text"
              placeholder="Address Line 2"
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              City
            </label>
            <input
              name="city"
              type="text"
              placeholder="City"
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              District
            </label>
            <input
              name="district"
              type="text"
              placeholder="District"
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary-gradient text-white p-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {isPending
            ? content?.modal?.loading?.signup || "Creating Account..."
            : content?.modal?.buttons?.signup || "Create Account"}
        </button>

      </form>
    </>
  );
}
