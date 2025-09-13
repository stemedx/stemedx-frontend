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
        id: "email",
        icon: "✉️",
        title: "Email Support",
        content: "support@stemxio.com",
        action: "mailto:support@stemxio.com",
        enabled: true,
      },
      {
        id: "address",
        icon: "📍",
        title: "Address",
        content: "StemXio LLC\n1234 Innovation Drive\nSilicon Valley, CA 94085\nUnited States",
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
    ],
  },
  community: {
    title: "Connect with Us",
    description:
      "Connect with us to get the latest updates on new course updates, platform improvements and insights.",
    socialLinks: [
      { name: "Facebook", icon: "Facebook", color: "blue", url: "https://facebook.com/stemxio" },
      { name: "X (Twitter)", icon: "X", color: "gray", url: "https://x.com/stemxio" },
      { name: "WhatsApp", icon: "MessageCircle", color: "green", url: "https://wa.me/stemxio" },
      { name: "Telegram", icon: "Send", color: "blue", url: "https://t.me/stemxio" },
    ],
  },
};