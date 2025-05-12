"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BellIcon, UserPlusIcon, MessageSquareIcon, HeartIcon, SettingsIcon, CheckCheckIcon } from 'lucide-react';

const mockNotifications = [
  {
    id: '1',
    type: 'new_follower',
    user: { name: 'Dr. Omar Fathy', avatar: '/avatars/omar.jpg' },
    text: 'started following you.',
    time: '2 hours ago',
    unread: true,
    link: '/profile/dr_omar_fathy'
  },
  {
    id: '2',
    type: 'new_message',
    user: { name: 'Layla Ahmed (Nurse)', avatar: '/avatars/layla-n.jpg' },
    text: 'sent you a new message.',
    time: '5 hours ago',
    unread: true,
    link: '/Chat?conversationId=3'
  },
  {
    id: '3',
    type: 'post_like',
    user: { name: 'Dr. Sara Ali', avatar: '/avatars/sara.jpg' },
    text: 'liked your post: "Interesting case study today...".',
    time: 'Yesterday',
    unread: false,
    link: '/posts/2'
  },
  {
    id: '4',
    type: 'group_invite',
    user: { name: 'Cardiology Team Admin', avatar: '/avatars/group-cardio.png' },
    text: 'invited you to join the group "Cardiology Team".',
    time: '2 days ago',
    unread: false,
    link: '/groups/cardiology-team'
  },
  {
    id: '5',
    type: 'system_update',
    user: { name: 'MedZone Admin', avatar: '/avatars/admin.png' },
    text: 'New features have been added to the platform. Check them out!',
    time: '3 days ago',
    unread: false,
    link: '/whats-new'
  },
];

const NotificationIcon = ({ type }) => {
  switch (type) {
    case 'new_follower':
      return <UserPlusIcon className="h-5 w-5 text-blue-500" />;
    case 'new_message':
      return <MessageSquareIcon className="h-5 w-5 text-green-500" />;
    case 'post_like':
      return <HeartIcon className="h-5 w-5 text-red-500" />;
    case 'group_invite':
      return <UserPlusIcon className="h-5 w-5 text-purple-500" />;
    case 'system_update':
      return <SettingsIcon className="h-5 w-5 text-gray-500" />;
    default:
      return <BellIcon className="h-5 w-5 text-gray-400" />;
  }
};

const NotificationsPage = () => {
  const { t } = useTranslation("common");
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return n.unread;
    // Add more specific filters if needed, e.g., by type
    return true; 
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center">
              <BellIcon className="h-6 w-6 mr-2" />
              {t("notifications")}
            </h1>
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} disabled={!notifications.some(n => n.unread)}>
              <CheckCheckIcon className="h-4 w-4 mr-1" />
              {t("mark_all_as_read")}
            </Button>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList>
              <TabsTrigger value="all">{t("all")}</TabsTrigger>
              <TabsTrigger value="unread">{t("unread")}</TabsTrigger>
              {/* Add more TabsTriggers for other filters like 'mentions', 'system' etc. */}
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          {filteredNotifications.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredNotifications.map(notification => (
                <li 
                  key={notification.id} 
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${notification.unread ? 'bg-blue-50' : ''}`}
                  onClick={() => {
                    handleMarkAsRead(notification.id);
                    // In a real app, you would navigate to notification.link
                    console.log("Navigate to:", notification.link);
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 pt-1">
                      <NotificationIcon type={notification.type} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">
                          <span className="font-semibold">{notification.user.name}</span> {notification.text}
                        </p>
                        {notification.unread && (
                          <span className="h-2 w-2 rounded-full bg-blue-500 ml-2 flex-shrink-0"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{notification.time}</p>
                    </div>
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                      <AvatarFallback>{notification.user.name.substring(0,1)}</AvatarFallback>
                    </Avatar>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <BellIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>{t("no_new_notifications")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;

