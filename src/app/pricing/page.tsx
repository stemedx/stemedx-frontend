"use client";

import { useState, useEffect } from "react";

export default function Offers() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  // Currency configuration
  const currencies: Record<string, { symbol: string; name: string; rate: number }> = {
    USD: { symbol: "$", name: "USD", rate: 1 },
    LKR: { symbol: "Rs.", name: "LKR", rate: 295 }
  };

  // Fetch live exchange rates (like Amazon!)
  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (selectedCurrency === "USD") {
        setExchangeRate(1);
        setLastUpdated(new Date());
        return;
      }

      setIsLoadingRates(true);

      try {
        // Using a free exchange rate API (like real e-commerce sites)
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
        const data = await response.json();
        
        if (selectedCurrency === "LKR") {
          setExchangeRate(data.rates.LKR || 295); // Fallback to hardcoded if API fails
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        // Fallback to hardcoded rates if API fails
        setExchangeRate(295);
        setLastUpdated(new Date());
      } finally {
        setIsLoadingRates(false);
      }
    };

    fetchExchangeRate();
  }, [selectedCurrency]);

  // Convert price function
  const convertPrice = (usdPrice: string): string => {
    const numericPrice = parseInt(usdPrice.replace('$', ''));
    const convertedPrice = Math.round(numericPrice * exchangeRate);
    return `${currencies[selectedCurrency].symbol}${convertedPrice.toLocaleString()}`;
  };

  const offers = [
    {
      id: 1,
      name: "STEM Starter Bundle",
      originalPrice: "$199",
      offerPrice: "$99",
      discount: "50% OFF",
      period: "One-time payment",
      description: "Perfect bundle for beginners - 3 essential courses",
      courses: [
        "Introduction to Programming",
        "Basic Mathematics for STEM",
        "Scientific Method Fundamentals"
      ],
      features: [
        "3 Complete Courses",
        "Certificate of completion",
        "6 months access",
        "Basic lab simulations",
        "Community support"
      ],
      popular: false,
      badge: "BEST VALUE"
    },
    {
      id: 2,
      name: "Advanced STEM Pro Pack",
      originalPrice: "$499",
      offerPrice: "$249",
      discount: "50% OFF",
      period: "One-time payment",
      description: "Most popular bundle for serious STEM students",
      courses: [
        "Advanced Physics & Quantum Mechanics",
        "Data Science & Machine Learning",
        "Engineering Design Principles",
        "Advanced Mathematics",
        "Research Methodology"
      ],
      features: [
        "5 Advanced Courses",
        "Professional Certificates",
        "12 months access",
        "Premium lab simulations",
        "1-on-1 mentoring sessions",
        "Priority support"
      ],
      popular: true,
      badge: "MOST POPULAR"
    },
    {
      id: 3,
      name: "Complete STEM Master Suite",
      originalPrice: "$999",
      offerPrice: "$399",
      discount: "60% OFF",
      period: "One-time payment", 
      description: "Ultimate bundle - Everything you need for STEM mastery",
      courses: [
        "All 15+ Premium Courses",
        "Specialized Lab Modules",
        "Industry Projects",
        "Capstone Research Project"
      ],
      features: [
        "15+ Premium Courses",
        "All Certificates & Specializations",
        "Lifetime Access",
        "Full Lab Suite Access",
        "Personal Learning Coach",
        "Industry Mentorship Program",
        "Job Placement Support"
      ],
      popular: false,
      badge: "LIFETIME ACCESS"
    }
  ];

  return (
    <div>
      <div className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center pb-12 sm:pb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white pb-4">
              🔥 Limited Time Offers 🔥
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-6">
              Save big on our premium STEM course bundles - Special discounts available now!
            </p>
            
            {/* Currency Selector */}
            <div className="flex flex-col items-center gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">Currency:</span>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  disabled={isLoadingRates}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                >
                  {Object.entries(currencies).map(([code, currency]) => (
                    <option key={code} value={code} className="bg-gray-800 text-white">
                      {currency.name} ({currency.symbol})
                    </option>
                  ))}
                </select>
                {isLoadingRates && (
                  <div className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                )}
              </div>
              
              {selectedCurrency === "LKR" && lastUpdated && (
                <div className="text-xs text-gray-400">
                  Rate: 1 USD = {exchangeRate.toFixed(2)} LKR
                  <span className="ml-2">
                    Updated: {lastUpdated.toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:scale-105 transition-all duration-300 relative ${
                  offer.popular ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                {/* Badge */}
                <div className="absolute -top-3 -right-3">
                  <div className={`text-white text-xs font-bold px-3 py-1 rounded-full ${
                    offer.popular 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                      : offer.badge === 'LIFETIME ACCESS'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}>
                    {offer.badge}
                  </div>
                </div>

                {/* Discount Badge */}
                <div className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full text-center mb-4 w-fit mx-auto">
                  {offer.discount}
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-white pb-3">
                    {offer.name}
                  </h3>
                  
                  {/* Pricing */}
                  <div className="mb-3">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl line-through text-gray-400">{convertPrice(offer.originalPrice)}</span>
                      <span className="text-4xl font-bold text-green-400">{convertPrice(offer.offerPrice)}</span>
                    </div>
                    <span className="text-gray-300 text-sm">{offer.period}</span>
                    {selectedCurrency === "LKR" && (
                      <div className="text-xs text-gray-400 mt-1">
                        Converted from {offer.offerPrice} USD
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm sm:text-base text-gray-300">
                    {offer.description}
                  </p>
                </div>

                {/* Course List */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-2">📚 Included Courses:</h4>
                  <ul className="space-y-2">
                    {offer.courses.map((course, index) => (
                      <li key={index} className="text-xs text-gray-300 flex items-center">
                        <span className="text-purple-400 mr-2">▪</span>
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {offer.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-300">
                      <span className="text-green-400 mr-3">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => window.location.href = '/login'}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                    offer.popular 
                      ? 'bg-primary-gradient text-white shadow-lg shadow-purple-500/30' 
                      : 'bg-green-600 hover:bg-green-500 text-white'
                  }`}
                >
                  🛒 Claim This Offer
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gradient-separator"></div>

      <div className="py-10 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white pb-4">
              ⏰ Don't Miss Out!
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              These special offer prices are available for a limited time only. Join thousands of students who are already saving big on premium STEM education!
            </p>
            <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <p className="text-red-300 text-sm font-semibold">
                ⚡ Offer expires in: 7 days, 23 hours, 45 minutes
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/login'}
              className="bg-primary-gradient text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/30"
            >
              🚀 Claim Your Bundle Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}