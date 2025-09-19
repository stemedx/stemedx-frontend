"use client";
import { useState } from "react";
import { Eye, EyeOff, Mail, Phone, User, Lock } from "lucide-react";
import { loginWithEmail, signupWithEmail } from "@/utils/auth-actions";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: '',
    otp: '',
    name: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (loginMethod === 'mobile' && isLogin) {
        // TODO: Implement mobile OTP login
        setError('Mobile login not yet implemented');
        setLoading(false);
        return;
      }

      if (isLogin) {
        const result = await loginWithEmail(formData.email, formData.password);
        if (result.error) {
          setError(result.error);
        } else {
          onClose();
          window.location.reload();
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        const result = await signupWithEmail(formData.email, formData.password, formData.name);
        if (result.error) {
          setError(result.error);
        } else {
          onClose();
          window.location.reload();
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const socialProviders = [
    { name: 'Google', icon: '🔍', color: 'red' },
    { name: 'GitHub', icon: '🐙', color: 'gray' },
    { name: 'LinkedIn', icon: '💼', color: 'teal' },
    { name: 'X', icon: '🐦', color: 'black' }
  ];

  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-colors border border-white/20"
        >
          ✕
        </button>
        
        {/* Login Box Content */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex min-h-[600px]">
          {/* Left Pane - Image and Text */}
          <div className="hidden h-full rounded-l-2xl bg-[#001929] lg:flex lg:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
              <div className="max-w-md text-center">
                <div className="mb-8">
                  <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-4xl">🚀</span>
                  </div>
                  <h2 className="text-4xl font-bold mb-4">Welcome to StemXio</h2>
                  <p className="text-xl opacity-90 mb-8">
                    Empowering the next generation of innovators through cutting-edge STEM education
                  </p>
                </div>
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Interactive Learning Experiences</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Expert-Led Courses</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Real-World Projects</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation on Left Pane */}
            <div className="absolute top-8 left-8 right-8">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex p-1 rounded-lg">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                    isLogin
                      ? 'bg-white/20 text-white shadow-sm backdrop-blur-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                    !isLogin
                      ? 'bg-white/20 text-white shadow-sm backdrop-blur-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Right Pane - Login/Signup Form */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-8 lg:px-12 bg-white">
            {/* Logo */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-3xl">🧬</span>
                <span className="text-2xl font-bold text-gray-800">StemXio</span>
              </div>
            </div>

            {/* Salutation */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h1>
              <p className="text-gray-600">
                {isLogin 
                  ? 'Sign in to continue your learning journey'
                  : 'Join thousands of learners advancing their STEM skills'
                }
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    required={!isLogin}
                  />
                </div>
              )}

              {/* Login Method Toggle */}
              {isLogin && (
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('email')}
                    className={`flex-1 px-4 py-2 text-sm rounded-lg backdrop-blur-md border border-white/20 shadow-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl ${
                      loginMethod === 'email'
                        ? 'bg-teal-500/20 text-teal-600 hover:bg-teal-500/30 border-teal-400/30'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMethod('mobile')}
                    className={`flex-1 px-4 py-2 text-sm rounded-lg backdrop-blur-md border border-white/20 shadow-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl ${
                      loginMethod === 'mobile'
                        ? 'bg-teal-500/20 text-teal-600 hover:bg-teal-500/30 border-teal-400/30'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    Mobile
                  </button>
                </div>
              )}

              {/* Email/Mobile Input */}
              {(loginMethod === 'email' || !isLogin) && (
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              )}

              {isLogin && loginMethod === 'mobile' && (
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              )}

              {/* Password Input */}
              {(loginMethod === 'email' || !isLogin) && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              )}

              {/* Confirm Password for Signup */}
              {!isLogin && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    required={!isLogin}
                  />
                </div>
              )}

              {/* OTP Input for Mobile Login */}
              {isLogin && loginMethod === 'mobile' && (
                <div className="relative">
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-center tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
              )}

              {/* Forgot Password Link */}
              {isLogin && loginMethod === 'email' && (
                <div className="text-right">
                  <button type="button" className="text-teal-600 hover:text-teal-800 text-sm font-medium">
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 text-lg rounded-xl backdrop-blur-md border border-teal-400/30 shadow-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl bg-teal-500/20 text-white hover:bg-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </div>
                ) : (
                  isLogin 
                    ? (loginMethod === 'mobile' ? 'Verify OTP' : 'Sign In')
                    : 'Create Account'
                )}
              </button>

              {/* Divider */}
              <div className="relative flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm">Or continue with</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Social Sign-in Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {socialProviders.map((provider) => (
                  <button
                    key={provider.name}
                    type="button"
                    className={`px-4 py-2 text-sm rounded-lg backdrop-blur-md border border-white/20 shadow-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl flex items-center justify-center gap-2 ${
                      provider.color === 'teal' 
                        ? 'bg-teal-500/20 border-teal-400/30' 
                        : provider.color === 'red' 
                        ? 'bg-red-500/20 border-red-400/30' 
                        : 'bg-gray-500/20 border-gray-400/30'
                    } text-white hover:bg-white/20`}
                  >
                    <span className="text-lg">{provider.icon}</span>
                    <span className="text-sm">{provider.name}</span>
                  </button>
                ))}
              </div>

              {/* Terms and Privacy */}
              {!isLogin && (
                <p className="text-xs text-gray-500 text-center mt-4">
                  By creating an account, you agree to our{' '}
                  <button type="button" className="text-teal-600 hover:underline">Terms of Service</button>
                  {' '}and{' '}
                  <button type="button" className="text-teal-600 hover:underline">Privacy Policy</button>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}