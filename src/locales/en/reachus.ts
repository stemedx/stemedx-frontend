export const reachusContent = {
  header: {
    title: "Reach Us",
    subtitle: `Get help, ask questions, give feedback or report platform issues. 
    For course-specific inquiries, Please use the dedicated channels under Courses section`,
  },
  form: {
    title: "Send us a message",
    fields: {
      name: {
        label: "Full Name",
        placeholder: "Your full name",
      },
      email: {
        label: "Email Address",
        placeholder: "your.email@example.com",
      },
      subject: {
        label: "Subject",
        placeholder: "Select a subject",
        options: [
          { value: "general", label: "General Inquiry" },
          { value: "technical", label: "Technical Support" },
          { value: "course", label: "Course Questions" },
          { value: "billing", label: "Billing & Account" },
          { value: "feedback", label: "Platform Feedback" },
          { value: "partnership", label: "Partnership Opportunity" },
        ],
      },
      message: {
        label: "Message",
        placeholder: "Tell us how we can help you...",
      },
    },
    submitButton: "Send Message",
  },
  contactInfo: {
    title: "Get in touch",
    methods: [
      {
        id: "live-chat",
        icon: "💬",
        title: "Live Chat Support",
        content: "Available 24/7 through your dashboard",
        action: null,
        enabled: true,
      },
      {
        id: "address-usa",
        icon: "🇺🇸",
        title: "USA Address",
        content: "Accivion LLC\n 30N Gould St Ste 100\nSheridan, WY 82801",
        action: null,
        enabled: true,
      },
      {
        id: "address-sl",
        icon: "🇱🇰",
        title: "Sri Lanka Address",
        content: "428/4, Galagedara,\nWariyapola",
        action: null,
        enabled: true,
      },
      {
        id: "hotline",
        icon: "📞",
        title: "Hotline",
        content: "+94372268601",
        action: "tel:+94372268601",
        enabled: true,
      },
      {
        id: "email",
        icon: "✉️",
        title: "Email Support",
        content: "support@ict101.com",
        action: "mailto:support@ict101.com",
        enabled: true,
      },
    ],
  },
  community: {
    title: "Connect with Us",
    description:
      "Connect with us to get the latest updates on new course updates, platform improvements and insights.",
    socialLinks: [
      { name: "Facebook", icon: "Facebook", color: "blue", url: "https://facebook.com/ict101" },
      { name: "X (Twitter)", icon: "X", color: "gray", url: "https://x.com/ict101" },
      { name: "WhatsApp", icon: "MessageCircle", color: "green", url: "https://wa.me/ict101" },
      { name: "Telegram", icon: "Send", color: "blue", url: "https://t.me/ict101" },
    ],
  },
};