"use client";
import { useState } from "react";
import { signupWithEmail } from "@/utils/auth-actions";
import { GoogleIcon } from "@/app/components/icons";
import { getTranslations, CURRENT_LANGUAGE } from "@/locales";
import { useRouter } from "next/navigation";

interface AuthContent {
  modal: {
    titles: { signup: string };
    subtitles: { signup: string };
    fields: { name: string; email: string; password: string; confirmPassword: string };
    buttons: { signup: string; googleLogin: string };
    loading: { signup: string };
    errors: { passwordMismatch: string; unexpected: string };
  };
}

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+94');
  const [nic, setNic] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  
  const AUTH_CONTENT = getTranslations('auth', CURRENT_LANGUAGE) as AuthContent;

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (password !== confirmPassword) {
        setError(AUTH_CONTENT?.modal?.errors?.passwordMismatch || "Passwords do not match");
        setLoading(false);
        return;
      }

      // Validate full phone number with country code
      const fullPhoneNumber = `${countryCode}${phone}`;
      const fullPhoneRegex = /^\+\d{10,15}$/; // Country code + phone digits should be 10-15 total
      if (!fullPhoneRegex.test(fullPhoneNumber)) {
        setError("Invalid phone number format");
        setLoading(false);
        return;
      }
      
      const result = await signupWithEmail(
        email,
        password,
        firstName,
        lastName,
        fullPhoneNumber,
        nic,
        dob,
        address
      );
      if (result.error) {
        setError(result.error);
      } else {
        router.push('/'); 
      }
    } catch {
      setError(AUTH_CONTENT?.modal?.errors?.unexpected || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          {AUTH_CONTENT?.modal?.titles?.signup || "Join StemXio"}
        </h1>
        <p className="text-gray-300 text-sm">
          {AUTH_CONTENT?.modal?.subtitles?.signup || "Create your account"}
        </p>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-400/30 text-red-300 p-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              First Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Last Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              type="email"
              placeholder={AUTH_CONTENT?.modal?.fields?.email || "Email Address"}
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
                <option value="+94" className="bg-gray-900">🇱🇰 +94</option>
                <option value="+1" className="bg-gray-900">🇺🇸 +1</option>
                <option value="+44" className="bg-gray-900">🇬🇧 +44</option>
                <option value="+91" className="bg-gray-900">🇮🇳 +91</option>
                <option value="+61" className="bg-gray-900">🇦🇺 +61</option>
                <option value="+971" className="bg-gray-900">🇦🇪 +971</option>
                <option value="+33" className="bg-gray-900">🇫🇷 +33</option>
                <option value="+49" className="bg-gray-900">🇩🇪 +49</option>
                <option value="+81" className="bg-gray-900">🇯🇵 +81</option>
                <option value="+82" className="bg-gray-900">🇰🇷 +82</option>
                <option value="+86" className="bg-gray-900">🇨🇳 +86</option>
                <option value="+65" className="bg-gray-900">🇸🇬 +65</option>
                <option value="+60" className="bg-gray-900">🇲🇾 +60</option>
                <option value="+66" className="bg-gray-900">🇹🇭 +66</option>
                <option value="+84" className="bg-gray-900">🇻🇳 +84</option>
              </select>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                  if (value.length <= 15) { // Allow up to 15 digits for international numbers
                    setPhone(value);
                  }
                }}
                maxLength={15}
                className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              NIC Number <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="NIC Number"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Date of Birth <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0]}
              min={new Date(new Date().setFullYear(new Date().getFullYear() - 120)).toISOString().split('T')[0]}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent [color-scheme:dark] cursor-pointer"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              placeholder={AUTH_CONTENT?.modal?.fields?.password || "Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Confirm Password <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              placeholder={
                AUTH_CONTENT?.modal?.fields?.confirmPassword || "Confirm Password"
              }
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Address <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-gradient text-white p-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading
            ? AUTH_CONTENT?.modal?.loading?.signup || "Creating Account..."
            : AUTH_CONTENT?.modal?.buttons?.signup || "Create Account"}
        </button>

        <div className="text-center">
          <div className="border-t border-white/20 my-4"></div>
          <button
            type="button"
            className="w-full bg-white/5 border border-white/20 text-white p-3 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-3"
          >
            <GoogleIcon size={20} />
            {AUTH_CONTENT?.modal?.buttons?.googleLogin ||
              "Continue with Google"}
          </button>
        </div>
      </form>
    </>
  );
}