"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { HeartIcon, MessageCircleIcon, ShareIcon, BookmarkIcon } from 'lucide-react';

const HomePage = () => {
  const { t } = useTranslation('common');
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data for stories
  const stories = [
    { id: 1, username: 'dr_ahmed', avatar: '/avatars/ahmed.jpg', hasUnread: true },
    { id: 2, username: 'dr_sara', avatar: '/avatars/sara.jpg', hasUnread: true },
    { id: 3, username: 'dr_mohamed', avatar: '/avatars/mohamed.jpg', hasUnread: false },
    { id: 4, username: 'dr_layla', avatar: '/avatars/layla.jpg', hasUnread: false },
    { id: 5, username: 'dr_omar', avatar: '/avatars/omar.jpg', hasUnread: true },
    { id: 6, username: 'dr_nour', avatar: '/avatars/nour.jpg', hasUnread: false },
  ];

  // Mock data for posts
  const posts = [
    {
      id: 1,
      username: 'dr_ahmed',
      avatar: '/avatars/ahmed.jpg',
      time: t('2_hours_ago'), // Example of a time string that might need translation
      content: t('research_paper_cardio_content'),
      image: '/posts/research-paper.jpg',
      likes: 42,
      comments: 8,
      category: 'cardiology'
    },
    {
      id: 2,
      username: 'dr_sara',
      avatar: '/avatars/sara.jpg',
      time: t('5_hours_ago'),
      content: t('case_study_genetics_content'),
      likes: 28,
      comments: 15,
      category: 'genetics'
    },
    {
      id: 3,
      username: 'dr_mohamed',
      avatar: '/avatars/mohamed.jpg',
      time: t('yesterday'),
      content: t('conference_notes_infectious_content'),
      image: '/posts/conference-notes.jpg',
      likes: 76,
      comments: 23,
      category: 'infectious'
    },
  ];

  // Mock data for suggested content
  const suggestedContent = [
    { id: 1, type: 'user', name: 'Dr. Fatima', specialty: 'Neurology' },
    { id: 2, type: 'group', name: 'Pediatric Specialists', members: 1240 },
    { id: 3, type: 'post', title: t('suggested_post_covid_updates') },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('home')}</h1>
      
      {/* Stories Bar */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t('stories')}</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {stories.map(story => (
            <div key={story.id} className="flex flex-col items-center">
              <div className={`relative cursor-pointer ${story.hasUnread ? 'ring-2 ring-blue-500' : ''} rounded-full`}>
                <Avatar className="h-16 w-16">
                  <AvatarImage src={story.avatar} alt={story.username} />
                  <AvatarFallback>{story.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                {story.hasUnread && (
                  <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-blue-500"></span>
                )}
              </div>
              <span className="text-sm mt-1">{story.username}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Content Filters */}
      <div className="mb-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all" onClick={() => setActiveFilter('all')}>{t('all')}</TabsTrigger>
            <TabsTrigger value="cardiology" onClick={() => setActiveFilter('cardiology')}>{t('cardiology')}</TabsTrigger>
            <TabsTrigger value="pediatrics" onClick={() => setActiveFilter('pediatrics')}>{t('pediatrics')}</TabsTrigger>
            <TabsTrigger value="neurology" onClick={() => setActiveFilter('neurology')}>{t('neurology')}</TabsTrigger>
            <TabsTrigger value="infectious" onClick={() => setActiveFilter('infectious')}>{t('infectious')}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Posts Feed */}
        <div className="md:col-span-2 space-y-6">
          {posts
            .filter(post => activeFilter === 'all' || post.category === activeFilter)
            .map(post => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={post.avatar} alt={post.username} />
                      <AvatarFallback>{post.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{post.username}</h3>
                      <p className="text-sm text-gray-500">{post.time}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{post.content}</p>
                  {post.image && (
                    <div className="rounded-md overflow-hidden mb-4">
                      <div className="h-64 bg-gray-200 flex items-center justify-center">
                        {/* This is a placeholder for an actual image component */}
                        <span className="text-gray-500">{t('image_placeholder')}: {post.image}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{t(post.category)}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex justify-between w-full">
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
          <Button variant="outline" className="w-full">{t('load_more')}</Button>
        </div>
        
        {/* Suggested Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">{t('suggested_for_you')}</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestedContent.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.name || item.title}</p>
                    {item.specialty && <p className="text-sm text-gray-500">{t(item.specialty.toLowerCase())}</p>}
                    {item.members && <p className="text-sm text-gray-500">{item.members} {t('members').toLowerCase()}</p>}
                  </div>
                  <Button variant="outline" size="sm">
                    {item.type === 'user' ? t('follow') : item.type === 'group' ? t('join') : t('view')}
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">{t('see_more')}</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="font-semibold">{t('trending_topics')}</h3>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge className="mr-2">#COVID19</Badge>
              <Badge className="mr-2">#MedicalEducation</Badge>
              <Badge className="mr-2">#ResidencyLife</Badge>
              <Badge className="mr-2">#MedicalResearch</Badge>
              <Badge className="mr-2">#PatientCare</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

