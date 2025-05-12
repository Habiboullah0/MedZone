"use client";

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  UsersIcon,
  SearchIcon,
  PlusCircleIcon,
  UserCheckIcon,
  LogInIcon,
  Settings2Icon,
  EyeIcon
} from 'lucide-react';

const myMockGroups = [
  {
    id: 'myg1',
    name: 'Cardiology Innovators',
    avatar: '/avatars/group-cardio.png',
    members: 250,
    lastActivity: 'New post: "Latest in TAVI procedures"',
    specialty: 'Cardiology',
    type: 'Private'
  },
  {
    id: 'myg2',
    name: 'Pediatric Research Forum',
    avatar: '/avatars/group-peds.png',
    members: 180,
    lastActivity: 'Dr. Smith shared a new paper.',
    specialty: 'Pediatrics',
    type: 'Public'
  },
];

const discoverMockGroups = [
  {
    id: 'discg1',
    name: 'Neurology Study Group',
    avatar: '/avatars/group-neuro.png',
    members: 320,
    description: 'Discussing complex neurological cases and research. Open to all neurology professionals.',
    specialty: 'Neurology',
    type: 'Public'
  },
  {
    id: 'discg2',
    name: 'Surgical Techniques Exchange',
    avatar: '/avatars/group-surgery.png',
    members: 450,
    description: 'Sharing and learning about innovative surgical methods and best practices.',
    specialty: 'Surgery',
    type: 'Private'
  },
  {
    id: 'discg3',
    name: 'General Practitioners Network',
    avatar: '/avatars/group-gp.png',
    members: 1200,
    description: 'A network for GPs to share experiences, advice, and support.',
    specialty: 'General Medicine',
    type: 'Public'
  },
   {
    id: 'discg4',
    name: 'Medical AI & Future Tech',
    avatar: '/avatars/group-ai.png',
    members: 150,
    description: 'Exploring the impact of AI and new technologies on healthcare.',
    specialty: 'Technology',
    type: 'Public'
  },
];

const GroupCard = ({ group, isMember, t }) => {
  return (
    <Card className="overflow-hidden flex flex-col">
      <CardHeader className="flex flex-row items-start space-x-4 p-4 bg-gray-50">
        <Avatar className="h-16 w-16 border">
          <AvatarImage src={group.avatar} alt={group.name} />
          <AvatarFallback>{group.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <CardTitle className="text-lg mb-1">{group.name}</CardTitle>
          <div className="text-xs text-gray-500 space-x-2">
            <span>{group.members} {t('members').toLowerCase()}</span>
            <Badge variant={group.type === 'Public' ? "secondary" : "outline"}>{t(group.type.toLowerCase())}</Badge>
            <Badge variant="outline">{t(group.specialty.toLowerCase())}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        {isMember ? (
            <p className="text-sm text-gray-600">{t("last_activity")}: {group.lastActivity}</p>
        ) : (
            <p className="text-sm text-gray-600 h-12 overflow-hidden text-ellipsis">{group.description}</p>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t">
        {isMember ? (
          <Button variant="outline" className="w-full"><EyeIcon className="h-4 w-4 mr-2" />{t('view_group')}</Button>
        ) : (
          <Button className="w-full"><LogInIcon className="h-4 w-4 mr-2" />{t('join_group')}</Button>
        )}
      </CardFooter>
    </Card>
  );
};

const GroupsPage = () => {
  const { t } = useTranslation("common");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    specialty: "all",
    groupType: "all",
    sortBy: "members_desc",
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const filteredMyGroups = useMemo(() => {
    return myMockGroups.filter(group => 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.specialty === "all" || group.specialty.toLowerCase() === filters.specialty.toLowerCase()) &&
      (filters.groupType === "all" || group.type.toLowerCase() === filters.groupType.toLowerCase())
    );
  }, [searchTerm, filters]);

  const filteredDiscoverGroups = useMemo(() => {
    let result = discoverMockGroups.filter(group => 
      (group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       group.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filters.specialty === "all" || group.specialty.toLowerCase() === filters.specialty.toLowerCase()) &&
      (filters.groupType === "all" || group.type.toLowerCase() === filters.groupType.toLowerCase())
    );
    // Sort discover groups
    switch (filters.sortBy) {
        case 'members_desc':
            result.sort((a,b) => b.members - a.members);
            break;
        case 'name_asc':
            result.sort((a,b) => a.name.localeCompare(b.name));
            break;
        // Add more sorting options if needed
    }
    return result;
  }, [searchTerm, filters]);

  const specialties = useMemo(() => ["all", ...new Set([...myMockGroups, ...discoverMockGroups].map(g => g.specialty))], []);
  const groupTypes = useMemo(() => ["all", "Public", "Private"], []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center mb-4 md:mb-0">
            <UsersIcon className="h-10 w-10 mr-3 text-green-600" />
            <h1 className="text-4xl font-bold tracking-tight">{t("groups")}</h1>
        </div>
        <Button variant="default" size="lg">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          {t("create_new_group")}
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <Card className="mb-8 p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2 lg:col-span-2">
            <label htmlFor="search-groups" className="block text-sm font-medium text-gray-700 mb-1">{t("search_groups")}</label>
            <div className="relative">
                <Input 
                    id="search-groups"
                    type="search" 
                    placeholder={t("search_by_name_description") + "..."} 
                    className="pl-10 py-3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="filter-group-specialty" className="block text-sm font-medium text-gray-700 mb-1">{t("specialty")}</label>
            <Select value={filters.specialty} onValueChange={(value) => handleFilterChange("specialty", value)}>
              <SelectTrigger id="filter-group-specialty" className="py-3">
                <SelectValue placeholder={t("all_specialties")} />
              </SelectTrigger>
              <SelectContent>
                {specialties.map(spec => <SelectItem key={spec} value={spec}>{spec === 'all' ? t('all_specialties') : t(spec.toLowerCase())}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="filter-group-type" className="block text-sm font-medium text-gray-700 mb-1">{t("group_type")}</label>
            <Select value={filters.groupType} onValueChange={(value) => handleFilterChange("groupType", value)}>
              <SelectTrigger id="filter-group-type" className="py-3">
                <SelectValue placeholder={t("all_types")} />
              </SelectTrigger>
              <SelectContent>
                {groupTypes.map(type => <SelectItem key={type} value={type}>{type === 'all' ? t('all_types') : t(type.toLowerCase())}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
           <div className="md:col-span-2 lg:col-span-4">
            <label htmlFor="sort-groups-by" className="block text-sm font-medium text-gray-700 mb-1">{t("sort_by")}</label>
            <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
              <SelectTrigger id="sort-groups-by" className="py-3">
                <SelectValue placeholder={t("sort_by")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="members_desc">{t("members_most_first")}</SelectItem>
                <SelectItem value="name_asc">{t("name_a_z")}</SelectItem>
                {/* Add more sorting options like 'recent_activity' */}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="discover_groups" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="my_groups">{t("my_groups")} ({filteredMyGroups.length})</TabsTrigger>
          <TabsTrigger value="discover_groups">{t("discover_groups")}</TabsTrigger>
        </TabsList>

        <TabsContent value="my_groups">
          {filteredMyGroups.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMyGroups.map(group => <GroupCard key={group.id} group={group} isMember={true} t={t} />)}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <UsersIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>{searchTerm ? t("no_groups_found_matching_search_in_my_groups") : t("you_are_not_member_of_any_groups_yet")}</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="discover_groups">
          {filteredDiscoverGroups.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDiscoverGroups.map(group => <GroupCard key={group.id} group={group} isMember={false} t={t} />)}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <SearchIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>{t("no_groups_found_matching_search_or_filters")}</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Placeholder for individual group page content - to be developed as a separate route/component */}
      {/* Example: 
      <Card className="mt-10">
        <CardHeader><CardTitle>Selected Group Details (Placeholder)</CardTitle></CardHeader>
        <CardContent>
            <p>This area will show details of a selected group, including posts, members, files, and about sections.</p>
            <p>Navigation to this detailed view will be implemented when a group card is clicked.</p>
        </CardContent>
      </Card>
      */}

    </div>
  );
};

export default GroupsPage;

