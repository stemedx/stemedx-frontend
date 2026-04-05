export const reachusContent = {
  header: {
    title: "අප හා සම්බන්ධ වන්න",
    subtitle: "ඕනෑම සහායක් ලබා ගැනීමට, ප්‍රශ්න යොමු කිරීමට, ඔබේ අදහස් දැක්වීමට හෝ වෙබ් අඩවියේ ගැටලු දැනුම් දීමට අප හා සම්බන්ධ වන්න.",
    subtitleBefore: "පාඩම් සම්බන්ධ විමසීම් සඳහා, කරුණාකර",
    subtitleLinkText: "පාඩම් (Courses)",
    subtitleAfter: "පිටුවෙහි ඇති ක්‍රමවේදයන් භාවිතා කරන්න.",
  },
  form: {
    title: "අප වෙත පණිවිඩයක් එවන්න",
    fields: {
      name: {
        label: "සම්පූර්ණ නම",
        placeholder: "ඔබේ සම්පූර්ණ නම",
      },
      email: {
        label: "විද්‍යුත් තැපැල් ලිපිනය",
        placeholder: "your.email@example.com",
      },
      subject: {
        label: "විෂයය",
        placeholder: "විෂයයක් තෝරන්න",
        options: [
          { value: "general", label: "සාමාන්‍ය විමසීම්" },
          { value: "technical", label: "තාක්ෂණික සහාය" },
          { value: "course", label: "පාඩම් සම්බන්ධ ගැටලු" },
          { value: "billing", label: "ගෙවීම් සහ ගිණුම් තොරතුරු" },
          { value: "feedback", label: "වේදිකාව පිළිබඳ ප්‍රතිපෝෂණ" },
          { value: "partnership", label: "හවුල්කාරිත්ව අවස්ථා" },
        ],
      },
      message: {
        label: "පණිවිඩය",
        placeholder: "ඔබට සහාය විය හැකි ආකාරය අපට පවසන්න...",
      },
    },
    submitButton: "පණිවිඩය යොමු කරන්න",
  },
  contactInfo: {
    title: "සම්බන්ධ වීමට වෙනත් ක්‍රම",
    methods: [
      {
        id: "live-chat",
        icon: "💬",
        title: "සජීවී චැට් සහාය (Live Chat)",
        content: "ඔබේ උපකරණ පුවරුව (Dashboard) හරහා පැය 24 පුරාම ලබාගත හැක",
        action: null,
        enabled: true,
      },
      {
        id: "hotline",
        icon: "📞",
        title: "ක්ෂණික ඇමතුම් අංකය",
        content: "+94372268601",
        action: "tel:+94372268601",
        enabled: true,
      },
      {
        id: "email",
        icon: "✉️",
        title: "විද්‍යුත් තැපෑල",
        content: "support@ict101.com",
        action: "mailto:support@ict101.com",
        enabled: true,
      },
    ],
  },
  community: {
    title: "අප සමඟ එක්වන්න",
    description:
      "නව පාඩම්, වේදිකාවේ නවීකරණයන් සහ නවතම තොරතුරු දැනගැනීම සඳහා අපගේ සමාජ මාධ්‍ය ජාල සමඟ එක්වන්න.",
    socialLinks: [
      { name: "Facebook", icon: "Facebook", color: "blue", url: "https://facebook.com/ict101" },
      { name: "X (Twitter)", icon: "X", color: "gray", url: "https://x.com/ict101" },
      { name: "WhatsApp", icon: "MessageCircle", color: "green", url: "https://wa.me/ict101" },
      { name: "Telegram", icon: "Send", color: "blue", url: "https://t.me/ict101" },
    ],
  },
};