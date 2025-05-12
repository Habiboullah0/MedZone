"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import {
  SettingsIcon,
  UserCogIcon,
  BellIcon,
  ShieldCheckIcon,
  PaletteIcon,
  InfoIcon,
  Trash2Icon,
  GlobeIcon,
  SunIcon,
  MoonIcon,
  ChevronRightIcon
} from 'lucide-react';
import Link from 'next/link';

const SettingsPage = () => {
  const { t, i18n } = useTranslation("common");
  const [activeTab, setActiveTab] = useState("account");

  // Mock state for settings - in a real app, this would come from user data/API
  const [accountSettings, setAccountSettings] = useState({
    email: "user@medzone.com",
    twoFactorEnabled: false,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newMessages: true,
    postInteractions: true,
    groupUpdates: true,
    systemAlerts: true,
    emailNotifications: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "all", // all, followers, none
    messagePermissions: "all", // all, followers
    showLastSeen: true,
    searchableProfile: true,
  });

  const [displaySettings, setDisplaySettings] = useState({
    language: i18n.language || 'en', // 'en', 'ar'
    theme: "system", // 'light', 'dark', 'system'
  });

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setDisplaySettings(prev => ({ ...prev, language: lang }));
  };
  
  const handleThemeChange = (theme) => {
    setDisplaySettings(prev => ({ ...prev, theme: theme }));
    // Implement actual theme switching logic (e.g., using next-themes)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else { // system
      // Remove explicit theme and let system preference take over
      // This might require more sophisticated logic with next-themes
      document.documentElement.classList.remove('dark'); 
    }
  };

  const appVersion = "1.0.0"; // Mock app version

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <SettingsIcon className="h-10 w-10 mr-3 text-gray-700" />
        <h1 className="text-4xl font-bold tracking-tight">{t("settings")}</h1>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Sidebar for navigation */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                <Button variant={activeTab === "account" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("account")}>
                  <UserCogIcon className="mr-2 h-4 w-4" /> {t("account_settings")}
                </Button>
                <Button variant={activeTab === "notifications" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("notifications")}>
                  <BellIcon className="mr-2 h-4 w-4" /> {t("notification_settings")}
                </Button>
                <Button variant={activeTab === "privacy" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("privacy")}>
                  <ShieldCheckIcon className="mr-2 h-4 w-4" /> {t("privacy_settings")}
                </Button>
                <Button variant={activeTab === "display" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("display")}>
                  <PaletteIcon className="mr-2 h-4 w-4" /> {t("display_language_settings")}
                </Button>
                <Button variant={activeTab === "about" ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActiveTab("about")}>
                  <InfoIcon className="mr-2 h-4 w-4" /> {t("about_medzone")}
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          {activeTab === "account" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><UserCogIcon className="mr-2 h-5 w-5" />{t("account_settings")}</CardTitle>
                <CardDescription>{t("manage_your_personal_information_and_account_security")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">{t("personal_information")}</h3>
                  <Link href="/Profile/edit"> {/* Assuming a profile edit page */} 
                    <Button variant="outline" className="w-full md:w-auto justify-between">
                        {t("edit_profile_information_name_bio_specialty")}
                        <ChevronRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <Separator />
                <div>
                  <Label htmlFor="email" className="text-md font-medium">{t("email_address")}</Label>
                  <div className="flex items-center mt-1">
                    <Input id="email" type="email" value={accountSettings.email} disabled className="flex-grow" />
                    <Button variant="outline" className="ml-2">{t("change_email")}</Button>
                  </div>
                </div>
                <div>
                  <Label className="text-md font-medium">{t("password")}</Label>
                  <Button variant="outline" className="mt-1 w-full md:w-auto">{t("change_password")}</Button>
                </div>
                <Separator />
                 <div>
                  <h3 className="text-lg font-medium mb-2">{t("security")}</h3>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <Label htmlFor="twoFactor" className="text-sm font-medium">{t("two_factor_authentication")}</Label>
                    <Switch id="twoFactor" checked={accountSettings.twoFactorEnabled} onCheckedChange={(checked) => setAccountSettings(prev => ({...prev, twoFactorEnabled: checked}))} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{t("enhance_your_account_security_with_2fa")}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-medium mb-2 text-red-600">{t("delete_account")}</h3>
                   <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive" className="w-full md:w-auto"><Trash2Icon className="mr-2 h-4 w-4" />{t("delete_my_account")}</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{t("are_you_sure_you_want_to_delete_account")}</DialogTitle>
                                <DialogDescription>
                                    {t("this_action_cannot_be_undone_all_data_will_be_permanently_deleted")}
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild><Button variant="outline">{t("cancel")}</Button></DialogClose>
                                <Button variant="destructive">{t("confirm_delete_account")}</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                  <p className="text-xs text-gray-500 mt-1">{t("permanently_delete_your_account_and_all_associated_data")}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><BellIcon className="mr-2 h-5 w-5" />{t("notification_settings")}</CardTitle>
                <CardDescription>{t("choose_what_notifications_you_want_to_receive")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[ 
                  { id: "newMessages", labelKey: "new_messages_in_chat" },
                  { id: "postInteractions", labelKey: "likes_comments_on_your_posts" },
                  { id: "groupUpdates", labelKey: "updates_from_groups_you_joined" },
                  { id: "systemAlerts", labelKey: "important_system_alerts_and_announcements" },
                ].map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-md">
                        <Label htmlFor={item.id} className="text-sm font-medium">{t(item.labelKey)}</Label>
                        <Switch id={item.id} checked={notificationSettings[item.id]} onCheckedChange={(checked) => setNotificationSettings(prev => ({...prev, [item.id]: checked}))} />
                    </div>
                ))}
                <Separator />
                <div className="flex items-center justify-between p-3 border rounded-md">
                    <Label htmlFor="emailNotifications" className="text-sm font-medium">{t("email_notifications_summary")}</Label>
                    <Switch id="emailNotifications" checked={notificationSettings.emailNotifications} onCheckedChange={(checked) => setNotificationSettings(prev => ({...prev, emailNotifications: checked}))} />
                </div>
                 <p className="text-xs text-gray-500 mt-1">{t("receive_periodic_summaries_or_important_notifications_via_email")}</p>
              </CardContent>
            </Card>
          )}

          {activeTab === "privacy" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><ShieldCheckIcon className="mr-2 h-5 w-5" />{t("privacy_settings")}</CardTitle>
                <CardDescription>{t("control_how_your_information_is_shared_and_who_can_interact_with_you")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="profileVisibility" className="text-md font-medium">{t("who_can_see_my_profile")}</Label>
                  <Select value={privacySettings.profileVisibility} onValueChange={(value) => setPrivacySettings(prev => ({...prev, profileVisibility: value}))}>
                    <SelectTrigger id="profileVisibility" className="mt-1">
                      <SelectValue placeholder={t("select_visibility")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("everyone")}</SelectItem>
                      <SelectItem value="followers">{t("followers_only")}</SelectItem>
                      <SelectItem value="none">{t("no_one_private")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="messagePermissions" className="text-md font-medium">{t("who_can_send_me_messages")}</Label>
                  <Select value={privacySettings.messagePermissions} onValueChange={(value) => setPrivacySettings(prev => ({...prev, messagePermissions: value}))}>
                    <SelectTrigger id="messagePermissions" className="mt-1">
                      <SelectValue placeholder={t("select_permission")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("everyone")}</SelectItem>
                      <SelectItem value="followers">{t("followers_only")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between p-3 border rounded-md">
                    <Label htmlFor="showLastSeen" className="text-sm font-medium">{t("show_my_last_seen_status_in_chat")}</Label>
                    <Switch id="showLastSeen" checked={privacySettings.showLastSeen} onCheckedChange={(checked) => setPrivacySettings(prev => ({...prev, showLastSeen: checked}))} />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                    <Label htmlFor="searchableProfile" className="text-sm font-medium">{t("allow_my_profile_to_be_found_in_search")}</Label>
                    <Switch id="searchableProfile" checked={privacySettings.searchableProfile} onCheckedChange={(checked) => setPrivacySettings(prev => ({...prev, searchableProfile: checked}))} />
                </div>
                {/* Placeholder for blocked users management */}
                <div>
                    <Button variant="outline">{t("manage_blocked_users")}</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "display" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><PaletteIcon className="mr-2 h-5 w-5" />{t("display_language_settings")}</CardTitle>
                <CardDescription>{t("customize_the_look_and_language_of_the_app")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="language" className="text-md font-medium">{t("application_language")}</Label>
                  <Select value={displaySettings.language} onValueChange={handleLanguageChange}>
                    <SelectTrigger id="language" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English (US)</SelectItem>
                      <SelectItem value="ar">العربية (Arabic)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="theme" className="text-md font-medium">{t("application_theme")}</Label>
                  <Select value={displaySettings.theme} onValueChange={handleThemeChange}>
                    <SelectTrigger id="theme" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light"><SunIcon className="inline-block mr-2 h-4 w-4"/>{t("light_mode")}</SelectItem>
                      <SelectItem value="dark"><MoonIcon className="inline-block mr-2 h-4 w-4"/>{t("dark_mode")}</SelectItem>
                      <SelectItem value="system"><SettingsIcon className="inline-block mr-2 h-4 w-4"/>{t("system_preference")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "about" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><InfoIcon className="mr-2 h-5 w-5" />{t("about_medzone")}</CardTitle>
                <CardDescription>{t("information_about_the_application_and_legal_documents")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-md">
                  <p className="text-sm font-medium">{t("application_version")}</p>
                  <p className="text-sm text-gray-600">{appVersion}</p>
                </div>
                <Link href="/terms-of-service" passHref>
                    <Button variant="outline" className="w-full justify-between">
                        {t("terms_of_service")}
                        <ChevronRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
                <Link href="/privacy-policy" passHref>
                     <Button variant="outline" className="w-full justify-between">
                        {t("privacy_policy")}
                        <ChevronRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
                <div className="text-center text-xs text-gray-500 pt-4">
                  © {new Date().getFullYear()} MedZone. {t("all_rights_reserved")}.
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

