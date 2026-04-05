"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { User, BookOpen, Settings, Edit3, Save, X } from "lucide-react";
import { createClient } from "@/lib/services/auth/client";
import { apiRequest } from "@/lib/services/api/client";
import { useLanguage } from "@/context/language-context";
import { getTranslations } from "@/locales";
import { profileContent } from "@/locales/en/profile";

type ProfileContent = typeof profileContent;

interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  district?: string;
  dob?: string;
  nic?: string;
}

interface Module {
  id: string;
  title: string;
  duration: number;
  source: string;
  course_unit: { id: string; name: string };
  instructor: { first_name: string; last_name: string };
  product: { id: string; name: string; price: string };
  granted_at: string;
}

interface ModulesResponse {
  has_active_subscription: boolean;
  subscription_expires_at: string | null;
  modules: Module[];
}

interface ProfileProps {
  initialUser: UserProfile;
}

export function Profile({ initialUser }: ProfileProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const { language } = useLanguage();
  const CONTENT = getTranslations('profile', language) as ProfileContent;
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [modules, setModules] = useState<Module[]>([]);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [subscriptionExpiry, setSubscriptionExpiry] = useState<string | null>(null);
  const [modulesLoading, setModulesLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [resetStatus, setResetStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    first_name: initialUser.first_name || "",
    last_name: initialUser.last_name || "",
    email: initialUser.email,
    phone: initialUser.phone || "",
    addressLine1: initialUser.addressLine1 || "",
    addressLine2: initialUser.addressLine2 || "",
    city: initialUser.city || "",
    district: initialUser.district || "",
    dob: initialUser.dob || "",
    nic: initialUser.nic || "",
  });

  useEffect(() => {
    fetchModules();
  }, []);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['profile', 'courses', 'settings'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const fetchModules = async () => {
    try {
      const data = await apiRequest<ModulesResponse>("/v1/students/modules");
      setHasSubscription(data.has_active_subscription);
      setSubscriptionExpiry(data.subscription_expires_at);
      setModules(data.modules || []);
    } catch {
      setModules([]);
    } finally {
      setModulesLoading(false);
    }
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
          addressLine1: authUser.user_metadata?.addressLine1 || "",
          addressLine2: authUser.user_metadata?.addressLine2 || "",
          city: authUser.user_metadata?.city || "",
          district: authUser.user_metadata?.district || "",
          dob: authUser.user_metadata?.dob || "",
          nic: authUser.user_metadata?.nic || "",
        };
        setUser(userData);
        setFormData({
          first_name: userData.first_name || "",
          last_name: userData.last_name || "",
          email: userData.email,
          phone: userData.phone || "",
          addressLine1: userData.addressLine1 || "",
          addressLine2: userData.addressLine2 || "",
          city: userData.city || "",
          district: userData.district || "",
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
      // Update Supabase auth metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          district: formData.district,
          dob: formData.dob,
          nic: formData.nic,
        }
      });

      if (error) throw error;

      // Refresh session so updated metadata is available
      await supabase.auth.refreshSession();

      // Sync with backend DB
      await apiRequest("/v1/students", {
        method: "PATCH",
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          nic: formData.nic,
          dob: formData.dob,
          address_line_1: formData.addressLine1,
          address_line_2: formData.addressLine2,
          city: formData.city,
          district: formData.district,
          phone_number: formData.phone,
          email: formData.email,
        }),
      });

      await fetchUserData();
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleResetPassword = async () => {
    setResetStatus("idle");
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user?.email || "", {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      setResetStatus("success");
      setTimeout(() => setResetStatus("idle"), 5000);
    } catch {
      setResetStatus("error");
      setTimeout(() => setResetStatus("idle"), 5000);
    }
  };

  const resetFormData = () => {
    setEditing(false);
    setFormData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email,
      phone: user.phone || "",
      addressLine1: user.addressLine1 || "",
      addressLine2: user.addressLine2 || "",
      city: user.city || "",
      district: user.district || "",
      dob: user.dob || "",
      nic: user.nic || "",
    });
  };

  const tabs = [
    { id: "profile", label: CONTENT.tabs.profile, icon: User },
    { id: "courses", label: CONTENT.tabs.courses, icon: BookOpen },
    { id: "settings", label: CONTENT.tabs.settings, icon: Settings },
  ];

  return (
    <div className="min-h-screen pt-24 pb-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{CONTENT.header.title}</h1>
          <p className="text-xl text-gray-300">{CONTENT.header.subtitle}</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-8">
          <div className="flex flex-col sm:flex-row">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  router.push(`/profile?tab=${tab.id}`, { scroll: false });
                }}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 text-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-primary-gradient text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                } ${
                  index === 0 ? "rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none" :
                  index === tabs.length - 1 ? "rounded-b-2xl sm:rounded-r-2xl sm:rounded-bl-none" :
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
                <h2 className="text-2xl font-bold text-white">{CONTENT.profileSection.title}</h2>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 bg-primary-gradient text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <Edit3 size={16} />
                    {CONTENT.profileSection.editButton}
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={16} />
                      {CONTENT.profileSection.saveButton}
                    </button>
                    <button
                      onClick={resetFormData}
                      className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X size={16} />
                      {CONTENT.profileSection.cancelButton}
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">{CONTENT.profileSection.fields.firstName.label}</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      className="w-full p-3 bg-white/5 border border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                      {user.first_name || CONTENT.profileSection.notSet}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">{CONTENT.profileSection.fields.lastName.label}</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      className="w-full p-3 bg-white/5 border border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                      {user.last_name || CONTENT.profileSection.notSet}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-500 text-sm font-medium mb-2">{CONTENT.profileSection.fields.email.label} {CONTENT.profileSection.fields.email.readonly}</label>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-500">
                    {user.email}
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">{CONTENT.profileSection.fields.phone.label}</label>
                  {editing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 bg-white/5 border border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                      {user.phone || CONTENT.profileSection.notSet}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">{CONTENT.profileSection.fields.nic.label}</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.nic}
                      onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
                      className="w-full p-3 bg-white/5 border border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                      {user.nic || CONTENT.profileSection.notSet}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">{CONTENT.profileSection.fields.dob.label}</label>
                  {editing ? (
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full p-3 bg-white/5 border border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                      {user.dob ? new Date(user.dob).toLocaleDateString() : CONTENT.profileSection.notSet}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">{CONTENT.profileSection.fields.addressLine1.label}</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.addressLine1}
                      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      className="w-full p-3 bg-white/5 border border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                      {user.addressLine1 || CONTENT.profileSection.notSet}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">{CONTENT.profileSection.fields.addressLine2.label}</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.addressLine2}
                      onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                      className="w-full p-3 bg-white/5 border border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                      {user.addressLine2 || CONTENT.profileSection.notSet}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">{CONTENT.profileSection.fields.city.label}</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-3 bg-white/5 border border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                      {user.city || CONTENT.profileSection.notSet}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">{CONTENT.profileSection.fields.district.label}</label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full p-3 bg-white/5 border border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                      {user.district || CONTENT.profileSection.notSet}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">{CONTENT.coursesSection.title}</h2>

              {modulesLoading ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">{CONTENT.messages.loading}</p>
                </div>
              ) : hasSubscription ? (
                <div className="bg-primary-gradient rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4">🎓</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{CONTENT.coursesSection.fullAccess.title}</h3>
                  <p className="text-white/80 mb-4">{CONTENT.coursesSection.fullAccess.subtitle}</p>
                  {subscriptionExpiry && (
                    <p className="text-white/60 text-sm mb-6">
                      {CONTENT.coursesSection.fullAccess.expiresOn}: {new Date(subscriptionExpiry).toLocaleDateString()}
                    </p>
                  )}
                  <button
                    onClick={() => router.push("/courses")}
                    className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-opacity"
                  >
                    {CONTENT.coursesSection.fullAccess.button}
                  </button>
                </div>
              ) : modules.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{CONTENT.coursesSection.empty.title}</h3>
                  <p className="text-gray-400 mb-6">{CONTENT.coursesSection.empty.subtitle}</p>
                  <button
                    onClick={() => router.push("/courses")}
                    className="bg-primary-gradient text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {CONTENT.coursesSection.empty.button}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {modules.map((mod) => (
                    <div
                      key={mod.id}
                      className="bg-white/5 border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-colors"
                    >
                      <div className="text-sm text-purple-400 mb-1">
                        {CONTENT.coursesSection.module.unit}: {mod.course_unit.name}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-3">{mod.title}</h3>
                      <div className="space-y-1 text-sm text-gray-400">
                        <p>{CONTENT.coursesSection.module.instructor}: {mod.instructor.first_name} {mod.instructor.last_name}</p>
                        <p>{CONTENT.coursesSection.module.duration}: {mod.duration} {CONTENT.coursesSection.module.durationUnit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">{CONTENT.settingsSection.title}</h2>

              <div className="space-y-4">
                {/* Security / Reset Password */}
                <div className="bg-white/5 border border-white/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">{CONTENT.settingsSection.security.title}</h3>
                  <button
                    onClick={handleResetPassword}
                    disabled={resetStatus === "success"}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {CONTENT.settingsSection.security.resetPassword}
                  </button>
                  <p className="text-gray-400 text-sm mt-2">
                    {CONTENT.settingsSection.security.resetDescription}
                  </p>

                  {/* Inline notification */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${resetStatus !== "idle" ? "max-h-20 opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                    {resetStatus === "success" && (
                      <div className="bg-green-500/20 border border-green-400/30 text-green-300 p-3 rounded-lg text-sm">
                        {CONTENT.settingsSection.security.resetSent}
                      </div>
                    )}
                    {resetStatus === "error" && (
                      <div className="bg-red-500/20 border border-red-400/30 text-red-300 p-3 rounded-lg text-sm">
                        {CONTENT.settingsSection.security.resetError}
                      </div>
                    )}
                  </div>
                </div>

                {/* Danger Zone / Delete Account — hidden until server-side admin delete is implemented */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
