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
      email: {
        label: "Email",
        readonly: "(Cannot be changed)"
      },
      phone: {
        label: "Phone Number",
        placeholder: "Enter your phone number"
      },
      nic: {
        label: "NIC Number",
        placeholder: "Enter your NIC number"
      },
      dob: {
        label: "Date of Birth"
      },
      addressLine1: {
        label: "Address Line 1",
        placeholder: "Enter your address"
      },
      addressLine2: {
        label: "Address Line 2",
        placeholder: "Enter additional address info"
      },
      city: {
        label: "City",
        placeholder: "Enter your city"
      },
      district: {
        label: "District",
        placeholder: "Enter your district"
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
    fullAccess: {
      title: "Full Access",
      subtitle: "You have full access to all courses and modules",
      expiresOn: "Expires on",
      button: "Browse All Courses"
    },
    module: {
      unit: "Unit",
      instructor: "Instructor",
      duration: "Duration",
      durationUnit: "hrs",
    },
  },
  settingsSection: {
    title: "Account Settings",
    security: {
      title: "Security",
      resetPassword: "Reset Password",
      resetDescription: "Send a password reset email to your registered email address",
      resetSent: "Password reset link sent to your email!",
      resetError: "Failed to send reset email. Please try again."
    }
  },
  messages: {
    loading: "Loading...",
    accessDenied: "Access denied. Please log in."
  }
};