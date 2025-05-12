"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { UserPlusIcon, MessageCircleIcon, Edit3Icon, BookmarkIcon, UsersIcon, BriefcaseIcon, GraduationCapIcon, MapPinIcon, HeartIcon, ShareIcon } from 'lucide-react';

// Mock data for a user profile
const userProfile = {
  fullName: "Dr. Fatima Ahmed",
  username: "dr_fatima_ahmed",
  avatar: "/avatars/fatima.jpg", // Placeholder, replace with actual path or remove if not available
  coverPhoto: "/covers/medical_banner.jpg", // Placeholder
  bio: "Passionate cardiologist dedicated to advancing heart health through research and patient care. Senior Consultant at City Hospital.",
  specialty: "Cardiology",
  university: "Ain Shams University",
  role: "Senior Consultant",
  stats: {
    posts: 125,
    followers: 5600,
    following: 320,
  },
  isCurrentUser: true, // To show/hide edit button
};

// Mock data for user's posts (similar to Home page posts)
const userPosts = [
  {
    id: 1,
    username: userProfile.username,
    avatar: userProfile.avatar,
    time: "3 days ago",
    content: "Excited to share insights from my latest study on arrhythmia management. Full paper link in bio.",
    image: "/posts/arrhythmia_study.jpg",
    likes: 150,
    comments: 25,
    category: "cardiology"
  },
  {
    id: 2,
    username: userProfile.username,
    avatar: userProfile.avatar,
    time: "1 week ago",
    content: "Reflecting on a challenging but rewarding week at the clinic. Patient outcomes are what drive us!",
    likes: 95,
    comments: 12,
    category: "general"
  },
];

// Mock data for saved items
const savedItems = [
  { id: 1, type: 'post', title: 'New Guidelines for Diabetes Management', source: 'Dr. John Doe', image: '/posts/diabetes_guidelines.jpg' },
  { id: 2, type: 'file', title: 'Pediatric Vaccination Schedule 2025.pdf', source: 'Ministry of Health', fileType: 'PDF' },
  { id: 3, type: 'post', title: 'Understanding AI in Medical Imaging', source: 'TechMed Journal', image: '/posts/ai_imaging.jpg' },
];

// Mock data for groups user is part of
const userGroups = [
    { id: "g1", name: "Cardiology Innovators", members: 250, avatar: "/avatars/group-cardio.png"},
    { id: "g2", name: "Medical Research Network", members: 1200, avatar: "/avatars/group-research.png"},
];

const ProfilePage = () => {
  const { t } = useTranslation('common');

  return (
    <div className="container mx-auto px-0 md:px-4 py-8">
      {/* Profile Header */}
      <Card className="mb-8 shadow-lg overflow-hidden">
        <div className="relative h-48 md:h-64 bg-gray-300">
          {userProfile.coverPhoto ? (
            <img src={userProfile.coverPhoto} alt="Cover Photo" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/50 to-transparent flex flex-col md:flex-row items-end">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white -mb-12 md:-mb-16 shadow-md">
              <AvatarImage src={userProfile.avatar} alt={userProfile.fullName} />
              <AvatarFallback>{userProfile.fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="md:ml-6 mt-4 md:mt-0 text-white">
              <h1 className="text-2xl md:text-3xl font-bold">{userProfile.fullName}</h1>
              <p className="text-sm md:text-base">@{userProfile.username}</p>
            </div>
          </div>
        </div>
        
        <div className="pt-16 md:pt-20 px-4 md:px-6 pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                <div className="max-w-xl">
                    <p className="text-gray-700 mb-2 text-sm md:text-base">{userProfile.bio}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm text-gray-500 mb-4">
                        <span className="flex items-center"><BriefcaseIcon className="h-4 w-4 mr-1" /> {userProfile.specialty}</span>
                        <span className="flex items-center"><GraduationCapIcon className="h-4 w-4 mr-1" /> {userProfile.university}</span>
                        <span className="flex items-center"><Badge variant="secondary">{userProfile.role}</Badge></span>
                    </div>
                </div>
                <div className="flex space-x-2 mt-4 md:mt-0">
                {userProfile.isCurrentUser ? (
                    <Button variant="outline"><Edit3Icon className="h-4 w-4 mr-2" />{t('edit_profile')}</Button>
                ) : (
                    <>
                    <Button><UserPlusIcon className="h-4 w-4 mr-2" />{t('follow')}</Button>
                    <Button variant="outline"><MessageCircleIcon className="h-4 w-4 mr-2" />{t('message')}</Button>
                    </>
                )}
                </div>
            </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-center border-t pt-4">
            <div>
              <p className="font-semibold text-lg">{userProfile.stats.posts}</p>
              <p className="text-xs text-gray-500">{t('posts')}</p>
            </div>
            <div>
              <p className="font-semibold text-lg">{userProfile.stats.followers}</p>
              <p className="text-xs text-gray-500">{t('followers')}</p>
            </div>
            <div>
              <p className="font-semibold text-lg">{userProfile.stats.following}</p>
              <p className="text-xs text-gray-500">{t('following')}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="posts">{t('posts')}</TabsTrigger>
          <TabsTrigger value="saved">{t('saved_items')}</TabsTrigger>
          <TabsTrigger value="groups">{t('groups')}</TabsTrigger>
          <TabsTrigger value="about">{t('about')}</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          {userPosts.map(post => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={post.avatar} alt={post.username} />
                    <AvatarFallback>{post.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{userProfile.fullName}</h3>
                    <p className="text-sm text-gray-500">{post.time}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{post.content}</p>
                {post.image && (
                  <div className="rounded-md overflow-hidden mb-4">
                    <div className="h-64 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Image: {post.image}</span>
                    </div>
                  </div>
                )}
                <Badge variant="outline">{post.category}</Badge>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex justify-start space-x-4 w-full">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <HeartIcon className="h-4 w-4" /> {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <MessageCircleIcon className="h-4 w-4" /> {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ShareIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <BookmarkIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
          {userPosts.length === 0 && <p className="text-center text-gray-500 py-8">{t('no_posts_yet')}</p>}
        </TabsContent>

        <TabsContent value="saved">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.map(item => (
              <Card key={item.id}>
                <CardHeader>
                  {item.image && <div className="h-40 bg-gray-200 rounded-t-md flex items-center justify-center mb-2"><span className="text-gray-400">Image: {item.image}</span></div>}
                  <h3 className="font-semibold">{item.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">{t('source')}: {item.source}</p>
                  {item.fileType && <Badge variant="secondary" className="mt-2">{item.fileType}</Badge>}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">{item.type === 'file' ? t('download') : t('view_post')}</Button>
                </CardFooter>
              </Card>
            ))}
            {savedItems.length === 0 && <p className="col-span-full text-center text-gray-500 py-8">{t('no_saved_items')}</p>}
          </div>
        </TabsContent>

        <TabsContent value="groups">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userGroups.map(group => (
                    <Card key={group.id}>
                        <CardHeader className="flex flex-row items-center space-x-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={group.avatar} alt={group.name} />
                                <AvatarFallback>{group.name.substring(0,1)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold">{group.name}</h3>
                                <p className="text-sm text-gray-500">{group.members} {t('members').toLowerCase()}</p>
                            </div>
                        </CardHeader>
                        <CardFooter>
                            <Button variant="outline" size="sm">{t('view_group')}</Button>
                        </CardFooter>
                    </Card>
                ))}
                {userGroups.length === 0 && <p className="col-span-full text-center text-gray-500 py-8">{t('not_member_of_any_groups')}</p>}
            </div>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">{t('about')} {userProfile.fullName}</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">{t('specialty')}</h4>
                <p className="text-gray-600">{userProfile.specialty}</p>
              </div>
              <div>
                <h4 className="font-medium">{t('education')}</h4>
                <p className="text-gray-600">{userProfile.university}</p>
              </div>
              <div>
                <h4 className="font-medium">{t('current_role')}</h4>
                <p className="text-gray-600">{userProfile.role}</p>
              </div>
              <div>
                <h4 className="font-medium">{t('interests')}</h4>
                <p className="text-gray-600">Medical Technology, Cardiovascular Research, Public Health Awareness, Medical Education.</p>
              </div>
               <div>
                <h4 className="font-medium">{t('contact_information')}</h4>
                <p className="text-gray-600">Email: {userProfile.username}@medzone.com (Placeholder)</p>
                <p className="text-gray-600">Location: City Hospital, Main City (Placeholder)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;

