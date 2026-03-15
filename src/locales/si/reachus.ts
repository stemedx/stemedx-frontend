export const reachusContent = {
  header: {
    title: "අපව සම්බන්ධ කරන්න",
    subtitle: `සහාය ලබා ගන්න, ප්‍රශ්න අසන්න, හෝ වේදිකාවට අදාළ ගැටළු වාර්තා කරන්න. පාඨමාලා-විශේෂිත විමසීම් සඳහා, 
    අදාළ පාඨමාලා යටතේ දී ලබා දී ඇති මාර්ග භාවිතා කරන්න.`,
  },
  form: {
    title: "අපට පණිවිඩයක් යවන්න",
    fields: {
      name: {
        label: "සම්පූර්ණ නම",
        placeholder: "ඔබේ සම්පූර්ණ නම"
      },
      email: {
        label: "විද්‍යුත් ලිපිනය",
        placeholder: "ඔබේ.විද්‍යුත්@උදාහරණය.com"
      },
      subject: {
        label: "විෂයය",
        placeholder: "විෂයයක් තෝරන්න",
        options: [
          { value: "general", label: "සාමාන්‍ය විමසුම" },
          { value: "technical", label: "තාක්ෂණික සහාය" },
          { value: "course", label: "පාඨමාලා ප්‍රශ්න" },
          { value: "billing", label: "ගෙවීම් සහ ගිණුම" },
          { value: "feedback", label: "වේදිකා ප්‍රතිපෝෂණ" },
          { value: "partnership", label: "හවුල්කාරිත්ව අවස්ථාව" }
        ]
      },
      message: {
        label: "පණිවිඩය",
        placeholder: "අපට ඔබට උදව් කරන ආකාරය කියන්න..."
      }
    },
    submitButton: "පණිවිඩය යවන්න"
  },
  contactInfo: {
    title: "අපව සම්බන්ධ කරන්න",
    methods: [
      {
        id: "live-chat",
        icon: "💬",
        title: "සජීව කතාබස් සහාය",
        content: "ඔබේ දැෂ්ප්රබෝර්ඩුව හරහා 24/7 ලබා ගත හැකි",
        action: null,
        enabled: true,
      },
      {
        id: "email",
        icon: "✉️",
        title: "විද්‍යුත් තැපැල් සහාය",
        content: "support@ict101.com",
        action: "mailto:support@ict101.com",
        enabled: true,
      },
      {
        id: "address",
        icon: "📍",
        title: "ලිපිනය",
        content: "ICT101 LLC\n1234 Innovation Drive\nSilicon Valley, CA 94085\nUnited States",
        action: null,
        enabled: true,
      },
      {
        id: "hotline",
        icon: "📞",
        title: "හොට්ලයින්",
        content: "+94372268601",
        action: "tel:+94372268601",
        enabled: true,
      },
    ],
  },
  community: {
    title: "අපේ ප්‍රජාවට එක්වන්න",
    description: "නව පාඨමාලා යාවත්කාලීන කිරීම්, වේදිකා වැඩිදියුණු කිරීම් සහ තීක්ෂණතා පිළිබඳ නවතම යාවත්කාලීන කිරීම් ලබා ගැනීමට අප සමඟ සම්බන්ධ වන්න.",
    socialLinks: [
      { name: "Facebook", icon: "Facebook", color: "blue", url: "https://facebook.com/ict101" },
      { name: "X (Twitter)", icon: "X", color: "gray", url: "https://x.com/ict101" },
      { name: "WhatsApp", icon: "MessageCircle", color: "green", url: "https://wa.me/ict101" },
      { name: "Telegram", icon: "Send", color: "blue", url: "https://t.me/ict101" },
    ],
  }
};