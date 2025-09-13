export const reachusContent = {
  header: {
    title: "Reach Us",
    subtitle: `Get help, ask questions, give feedback or report platform issues. 
    For course-specific inquiries, please use the dedicated channels under Courses Section`,
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
        icon: "💬",
        title: "Live Chat Support",
        description:
          "Available 24/7 through your student dashboard for instant help with courses and platform",
      },
      {
        icon: "✉️",
        title: "Email Support",
        description: "support@stemxio.com\nResponse within 24 hours",
      },
      {
        icon: "📚",
        title: "Help Center",
        description:
          "Comprehensive FAQs, tutorials, and troubleshooting guides available in your account",
      },
      {
        icon: "🎓",
        title: "Academic Support",
        description:
          "Connect with instructors and study groups through our online community forums",
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