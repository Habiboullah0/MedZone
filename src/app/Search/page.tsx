"use client";

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, XIcon, FileTextIcon, UsersIcon, MessageSquareIcon, FolderIcon, HeartIcon, ShareIcon, BookmarkIcon, UserPlusIcon } from 'lucide-react';

// Mock data (can be expanded and moved to a separate file)
const mockPosts = [
  { id: 'p1', title: 'New Advancements in Cardiology', content: 'A comprehensive review of recent breakthroughs in heart disease treatment...', user: 'Dr. Evelyn Reed', avatar: '/avatars/evelyn.jpg', category: 'Cardiology', likes: 120, comments: 15, time: '2 days ago' },
  { id: 'p2', title: 'Pediatric Oncology: A Case Study', content: 'Presenting a challenging case of neuroblastoma in a 5-year-old...', user: 'Dr. Ben Carter', avatar: '/avatars/ben.jpg', category: 'Pediatrics', likes: 85, comments: 22, time: '5 days ago' },
  { id: 'p3', title: 'Understanding Medical Ethics in AI', content: 'Exploring the ethical dilemmas posed by AI in diagnostics and treatment planning.', user: 'Dr. Aisha Khan', avatar: '/avatars/aisha.jpg', category: 'Medical Ethics', likes: 210, comments: 45, time: '1 week ago' },
];

const mockUsers = [
  { id: 'u1', name: 'Dr. Evelyn Reed', specialty: 'Cardiology', avatar: '/avatars/evelyn.jpg', bio: 'Leading cardiologist with 15 years of experience.' },
  { id: 'u2', name: 'Dr. Ben Carter', specialty: 'Pediatric Oncology', avatar: '/avatars/ben.jpg', bio: 'Focused on pediatric cancer research and care.' },
  { id: 'u3', name: 'Dr. Samuel Green', specialty: 'Neurology', avatar: '/avatars/samuel.jpg', bio: 'Expert in neurological disorders and stroke recovery.' },
];

const mockFiles = [
  { id: 'f1', name: 'Cardiology_Guidelines_2025.pdf', type: 'PDF', uploader: 'Dr. Evelyn Reed', date: '2025-03-10', size: '2.5 MB' },
  { id: 'f2', name: 'Pediatric_Oncology_Presentation.pptx', type: 'PPTX', uploader: 'Dr. Ben Carter', date: '2025-04-22', size: '5.1 MB' },
  { id: 'f3', name: 'SurgicalTechniques_Video.mp4', type: 'MP4', uploader: 'Dr. Maria Rodriguez', date: '2025-01-15', size: '120 MB' },
];

const mockGroups = [
  { id: 'g1', name: 'Cardiology Hub', description: 'A group for cardiologists to discuss cases and research.', members: 250, avatar: '/avatars/group-cardio.png' },
  { id: 'g2', name: 'Pediatric Care Network', description: 'Connecting pediatricians worldwide.', members: 480, avatar: '/avatars/group-peds.png' },
  { id: 'g3', name: 'Medical AI Innovators', description: 'Exploring the future of AI in medicine.', members: 150, avatar: '/avatars/group-ai.png' },
];

const SearchPage = () => {
  const { t } = useTranslation("common");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
        setHasSearched(true);
    } else {
        setHasSearched(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setHasSearched(false);
  };

  const filteredPosts = useMemo(() => {
    if (!hasSearched || searchTerm.trim() === "") return [];
    return mockPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, hasSearched]);

  const filteredUsers = useMemo(() => {
    if (!hasSearched || searchTerm.trim() === "") return [];
    return mockUsers.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, hasSearched]);

  const filteredFiles = useMemo(() => {
    if (!hasSearched || searchTerm.trim() === "") return [];
    return mockFiles.filter(file => 
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.uploader.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, hasSearched]);

  const filteredGroups = useMemo(() => {
    if (!hasSearched || searchTerm.trim() === "") return [];
    return mockGroups.filter(group => 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, hasSearched]);

  const renderNoResults = (tabName) => (
    <div className="text-center py-10 text-gray-500">
      <SearchIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
      <p>{t("no_results_found_for")} "<span className="font-semibold">{searchTerm}</span>" {t("in")} {t(tabName)}.</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <SearchIcon className="h-8 w-8 mr-3" />
        {t("search")}
      </h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8 flex items-center gap-2">
        <div className="relative flex-grow">
            <Input 
                type="search" 
                placeholder={t("search_for_posts_users_files") + "..."} 
                className="text-lg p-6 pl-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
            {searchTerm && (
                <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8" onClick={clearSearch}>
                    <XIcon className="h-5 w-5" />
                </Button>
            )}
        </div>
        <Button type="submit" size="lg" className="px-8 py-6 text-lg">{t("search")}</Button>
      </form>

      {/* Search Filters and Results */}
      {hasSearched && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
            <TabsTrigger value="all">{t("all")}</TabsTrigger>
            <TabsTrigger value="posts">{t("posts")}</TabsTrigger>
            <TabsTrigger value="users">{t("users")}</TabsTrigger>
            <TabsTrigger value="files">{t("files")}</TabsTrigger>
            <TabsTrigger value="groups">{t("groups")}</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <h2 className="text-xl font-semibold mb-4">{t("all_results")}</h2>
            {filteredPosts.length === 0 && filteredUsers.length === 0 && filteredFiles.length === 0 && filteredGroups.length === 0 && renderNoResults("all_categories")}
            
            {filteredPosts.length > 0 && <h3 className="text-lg font-medium mt-6 mb-3">{t("posts")}</h3>}
            <div className="space-y-4">
              {filteredPosts.map(post => (
                <Card key={post.id}>
                  <CardHeader>
                    <h4 className="font-semibold">{post.title}</h4>
                    <div className="text-xs text-gray-500 flex items-center">
                        <Avatar className="h-5 w-5 mr-1.5">
                            <AvatarImage src={post.avatar} alt={post.user} />
                            <AvatarFallback>{post.user.substring(0,1)}</AvatarFallback>
                        </Avatar>
                        {post.user} - {post.time}
                    </div>
                  </CardHeader>
                  <CardContent><p className="text-sm text-gray-700 truncate">{post.content}</p></CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex space-x-2">
                        <Button variant="ghost" size="sm"><HeartIcon className="h-4 w-4 mr-1" />{post.likes}</Button>
                        <Button variant="ghost" size="sm"><MessageSquareIcon className="h-4 w-4 mr-1" />{post.comments}</Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredUsers.length > 0 && <h3 className="text-lg font-medium mt-6 mb-3">{t("users")}</h3>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map(user => (
                <Card key={user.id}>
                  <CardHeader className="flex flex-row items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.substring(0,1)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{user.name}</h4>
                      <p className="text-xs text-gray-500">{user.specialty}</p>
                    </div>
                  </CardHeader>
                  <CardContent><p className="text-sm text-gray-700 truncate">{user.bio}</p></CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm"><UserPlusIcon className="h-4 w-4 mr-1" /> {t("follow")}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredFiles.length > 0 && <h3 className="text-lg font-medium mt-6 mb-3">{t("files")}</h3>}
            <div className="space-y-3">
                {filteredFiles.map(file => (
                    <Card key={file.id} className="p-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <FileTextIcon className="h-6 w-6 text-blue-500" />
                                <div>
                                    <p className="font-medium text-sm">{file.name}</p>
                                    <p className="text-xs text-gray-500">{t("uploaded_by")} {file.uploader} - {file.date} - {file.size}</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">{t("download")}</Button>
                        </div>
                    </Card>
                ))}
            </div>

            {filteredGroups.length > 0 && <h3 className="text-lg font-medium mt-6 mb-3">{t("groups")}</h3>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredGroups.map(group => (
                    <Card key={group.id}>
                        <CardHeader className="flex flex-row items-center space-x-3">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={group.avatar} alt={group.name} />
                                <AvatarFallback>{group.name.substring(0,1)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-semibold">{group.name}</h4>
                                <p className="text-xs text-gray-500">{group.members} {t("members").toLowerCase()}</p>
                            </div>
                        </CardHeader>
                        <CardContent><p className="text-sm text-gray-700 truncate">{group.description}</p></CardContent>
                        <CardFooter>
                            <Button variant="outline" size="sm">{t("view_group")}</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="posts">
            {filteredPosts.length > 0 ? (
              <div className="space-y-4">
                {filteredPosts.map(post => (
                  <Card key={post.id}>
                    <CardHeader>
                      <h3 className="font-semibold">{post.title}</h3>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Avatar className="h-5 w-5 mr-1.5">
                            <AvatarImage src={post.avatar} alt={post.user} />
                            <AvatarFallback>{post.user.substring(0,1)}</AvatarFallback>
                        </Avatar>
                        {post.user} - {post.time}
                      </div>
                    </CardHeader>
                    <CardContent><p className="text-sm text-gray-700">{post.content}</p></CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <Badge variant="outline">{post.category}</Badge>
                        <div className="flex space-x-2">
                            <Button variant="ghost" size="sm"><HeartIcon className="h-4 w-4 mr-1" />{post.likes}</Button>
                            <Button variant="ghost" size="sm"><MessageSquareIcon className="h-4 w-4 mr-1" />{post.comments}</Button>
                        </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : renderNoResults("posts")}
          </TabsContent>

          <TabsContent value="users">
            {filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map(user => (
                  <Card key={user.id}>
                    <CardHeader className="flex flex-row items-center space-x-3">
                        <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0,1)}</AvatarFallback>
                        </Avatar>
                        <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-xs text-gray-500">{user.specialty}</p>
                        </div>
                    </CardHeader>
                    <CardContent><p className="text-sm text-gray-700 truncate">{user.bio}</p></CardContent>
                    <CardFooter>
                        <Button variant="outline" size="sm"><UserPlusIcon className="h-4 w-4 mr-1" /> {t("follow")}</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : renderNoResults("users")}
          </TabsContent>

          <TabsContent value="files">
            {filteredFiles.length > 0 ? (
                <div className="space-y-3">
                    {filteredFiles.map(file => (
                        <Card key={file.id} className="p-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <FileTextIcon className="h-6 w-6 text-blue-500" />
                                    <div>
                                        <p className="font-medium text-sm">{file.name}</p>
                                        <p className="text-xs text-gray-500">{t("uploaded_by")} {file.uploader} - {file.date} - {file.size}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">{t("download")}</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : renderNoResults("files")}
          </TabsContent>

          <TabsContent value="groups">
            {filteredGroups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredGroups.map(group => (
                        <Card key={group.id}>
                            <CardHeader className="flex flex-row items-center space-x-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={group.avatar} alt={group.name} />
                                    <AvatarFallback>{group.name.substring(0,1)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold">{group.name}</h3>
                                    <p className="text-xs text-gray-500">{group.members} {t("members").toLowerCase()}</p>
                                </div>
                            </CardHeader>
                            <CardContent><p className="text-sm text-gray-700 truncate">{group.description}</p></CardContent>
                            <CardFooter>
                                <Button variant="outline" size="sm">{t("view_group")}</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : renderNoResults("groups")}
          </TabsContent>
        </Tabs>
      )}

      {!hasSearched && (
        <div className="text-center py-20 text-gray-400">
          <SearchIcon className="h-16 w-16 mx-auto mb-4" />
          <p className="text-lg">{t("enter_search_term_to_find_content")}</p>
          <p className="text-sm">{t("you_can_search_for_posts_users_files_and_groups")}</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

