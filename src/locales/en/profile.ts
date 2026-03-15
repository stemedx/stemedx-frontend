export const profileContent = {
  header: {
    title: "Profile",
    subtitle: "Manage your account and preferences"
  },
  tabs: {
    profile: "Profile",
    courses: "My Courses",
    settings: "Account Settings"
  },
  profileSection: {
    title: "Profile Information",
    editButton: "Edit Profile",
    saveButton: "Save",
    cancelButton: "Cancel",
    fields: {
      firstName: {
        label: "First Name",
        placeholder: "Enter your first name"
      },
      lastName: {
        label: "Last Name", 
        placeholder: "Enter your last name"
      },
      username: {
        label: "Username",
        placeholder: "Enter your username"
      },
      email: {
        label: "Email",
        readonly: "(Cannot be changed)"
      },
      phone: {
        label: "Phone Number",
        placeholder: "Enter your phone number"
      }
    },
    notSet: "Not set"
  },
  coursesSection: {
    title: "My Courses",
    empty: {
      title: "No courses yet",
      subtitle: "Start learning by browsing our course catalog",
      button: "Browse Courses"
    },
    progress: "Progress",
    instructor: "by"
  },
  settingsSection: {
    title: "Account Settings",
    security: {
      title: "Security",
      resetPassword: "Reset Password",
      resetDescription: "Send a password reset email to your registered email address"
    },
    dangerZone: {
      title: "Danger Zone",
      deleteAccount: "Delete Account",
      deleteDescription: "Permanently delete your account and all associated data. This action cannot be undone."
    }
  },
  messages: {
    loading: "Loading...",
    accessDenied: "Access denied. Please log in.",
    passwordResetSent: "Password reset email sent! Check your inbox.",
    deleteConfirm: "Are you sure you want to delete your account? This action cannot be undone.",
    deleteNotice: "Account deletion requires administrator approval. Please contact support."
  }
};