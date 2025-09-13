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
        icon: "💬",
        title: "සජීව කතාබස් සහාය",
        description: "පාඨමාලා සහ වේදිකාව සඳහා ක්ෂණික උදව් සඳහා ඔබේ ශිෂ්‍ය උපකරණ පුවරුව හරහා 24/7 ලබා ගත හැකිය"
      },
      {
        icon: "✉️",
        title: "විද්‍යුත් තැපැල් සහාය",
        description: "support@stemxio.com\nපැය 24ක් ඇතුළත ප්‍රතිචාරය"
      },
      {
        icon: "📚",
        title: "උදව් මධ්‍යස්ථානය",
        description: "ඔබේ ගිණුමේ විස්තීර්ණ නිතර අසන ප්‍රශ්න, නිබන්ධන සහ ගැටළු විසඳීමේ මාර්ගෝපදේශ"
      },
      {
        icon: "🎓",
        title: "ශාස්ත්‍රීය සහාය",
        description: "අපගේ සබැඳි ප්‍රජා සංසදයන් හරහා ගුරුවරුන් සහ අධ්‍යයන කණ්ඩායම් සමඟ සම්බන්ධ වන්න"
      }
    ]
  },
  community: {
    title: "අපේ ප්‍රජාවට එක්වන්න",
    description: "නව පාඨමාලා යාවත්කාලීන කිරීම්, වේදිකා වැඩිදියුණු කිරීම් සහ තීක්ෂණතා පිළිබඳ නවතම යාවත්කාලීන කිරීම් ලබා ගැනීමට අප සමඟ සම්බන්ධ වන්න.",
    socialLinks: [
      { name: "Facebook", icon: "Facebook", color: "blue", url: "https://facebook.com/stemxio" },
      { name: "X (Twitter)", icon: "X", color: "gray", url: "https://x.com/stemxio" },
      { name: "WhatsApp", icon: "MessageCircle", color: "green", url: "https://wa.me/stemxio" },
      { name: "Telegram", icon: "Send", color: "blue", url: "https://t.me/stemxio" },
    ],
  }
};