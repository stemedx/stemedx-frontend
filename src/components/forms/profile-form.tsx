"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { User, BookOpen, Settings, Edit3, Save, X } from "lucide-react";
import { createClient } from "@/lib/services/auth/client";

interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  dob?: string;
  nic?: string;
  email_verified?: boolean;
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  thumbnail: string;
  duration: string;
}

interface ProfileProps {
  initialUser: UserProfile;
}

export function Profile({ initialUser }: ProfileProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [courses, setCourses] = useState<Course[]>([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: initialUser.first_name || "",
    last_name: initialUser.last_name || "",
    email: initialUser.email,
    phone: initialUser.phone || "",
    address: initialUser.address || "",
    dob: initialUser.dob || "",
    nic: initialUser.nic || "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  // Read tab from URL parameters
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['profile', 'courses', 'settings'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const fetchCourses = async () => {
    // Mock courses data - replace with actual API call
    const mockCourses: Course[] = [
      {
        id: "1",
        title: "Advanced Physics Online",
        instructor: "Dr. Sarah Johnson",
        progress: 65,
        thumbnail: "🔬",
        duration: "12 weeks"
      },
      {
        id: "2",
        title: "Chemistry Fundamentals",
        instructor: "Prof. Mike Chen",
        progress: 30,
        thumbnail: "🧪",
        duration: "8 weeks"
      },
    ];
    setCourses(mockCourses);
  };

  const fetchUserData = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const userData: UserProfile = {
          id: authUser.id,
          email: authUser.email || "",
          first_name: authUser.user_metadata?.first_name || "",
          last_name: authUser.user_metadata?.last_name || "",
          phone: authUser.user_metadata?.phone || "",
          address: authUser.user_metadata?.address || "",
          dob: authUser.user_metadata?.dob || "",
          nic: authUser.user_metadata?.nic || "",
          email_verified: authUser.user_metadata?.email_verified || false,
        };
        setUser(userData);
        setFormData({
          first_name: userData.first_name || "",
          last_name: userData.last_name || "",
          email: userData.email,
          phone: userData.phone || "",
          address: userData.address || "",
          dob: userData.dob || "",
          nic: userData.nic || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          address: formData.address,
          dob: formData.dob,
          nic: formData.nic,
        }
      });

      if (error) throw error;

      await fetchUserData();
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        // Note: Supabase doesn't have a direct delete user method for client-side
        // This would typically require a server-side function
        console.log("Delete account functionality needs server-side implementation");
        alert("Account deletion requires administrator approval. Please contact support.");
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  const handleResetPassword = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user?.email || "", {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      alert("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error("Error sending reset email:", error);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen pt-24 pb-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Profile</h1>
          <p className="text-xl text-gray-300">Manage your account and preferences</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-8">
          <div className="flex flex-col sm:flex-row">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  router.push(`/profile?tab=${tab.id}`, { scroll: false });
                }}
                className={`flex items-center gap-3 px-6 py-4 text-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-primary-gradient text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                } ${
                  tab.id === tabs[0].id ? "rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none" :
                  tab.id === tabs[tabs.length - 1].id ? "rounded-b-2xl sm:rounded-r-2xl sm:rounded-bl-none" :
                  ""
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 bg-primary-gradient text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <Edit3 size={16} />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={16} />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setFormData({
                          first_name: user.first_name || "",
                          last_name: user.last_name || "",
                          email: user.email,
                          phone: user.phone || "",
                          address: user.address || "",
                          dob: user.dob || "",
                          nic: user.nic || "",
                        });
                      }}
                      className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">First Name</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <div className="p-3 bg-white/5 border border-white/20 rounded-lg text-white">
                      {user.first_name || "Not set"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Last Name</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <div className="p-3 bg-white/5 border border-white/20 rounded-lg text-white">
                      {user.last_name || "Not set"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Email</label>
                  <div className="p-3 bg-white/5 border border-white/20 rounded-lg text-gray-400">
                    {user.email} (Cannot be changed)
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Phone Number</label>
                  {editing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <div className="p-3 bg-white/5 border border-white/20 rounded-lg text-white">
                      {user.phone || "Not set"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">NIC Number</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.nic}
                      onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <div className="p-3 bg-white/5 border border-white/20 rounded-lg text-white">
                      {user.nic || "Not set"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Date of Birth</label>
                  {editing ? (
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <div className="p-3 bg-white/5 border border-white/20 rounded-lg text-white">
                      {user.dob ? new Date(user.dob).toLocaleDateString() : "Not set"}
                    </div>
                  )}
                </div>


                <div className="md:col-span-2">
                  <label className="block text-white text-sm font-medium mb-2">Address</label>
                  {editing ? (
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  ) : (
                    <div className="p-3 bg-white/5 border border-white/20 rounded-lg text-white min-h-20">
                      {user.address || "Not set"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">My Courses</h2>
              {courses.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No courses yet</h3>
                  <p className="text-gray-400 mb-6">Start learning by browsing our course catalog</p>
                  <button
                    onClick={() => router.push("/courses")}
                    className="bg-primary-gradient text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Browse Courses
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white/5 border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-colors cursor-pointer"
                      onClick={() => router.push(`/courses/${course.id}`)}
                    >
                      <div className="text-4xl mb-4">{course.thumbnail}</div>
                      <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                      <p className="text-gray-300 mb-4">by {course.instructor}</p>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-300 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-primary-gradient h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">{course.duration}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Account Settings</h2>
              
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
                  <button
                    onClick={handleResetPassword}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Reset Password
                  </button>
                  <p className="text-gray-400 text-sm mt-2">
                    Send a password reset email to your registered email address
                  </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Danger Zone</h3>
                  <button
                    onClick={handleDeleteAccount}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Account
                  </button>
                  <p className="text-red-300 text-sm mt-2">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}