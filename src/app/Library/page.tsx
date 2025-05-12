"use client";

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  SearchIcon, 
  UploadCloudIcon, 
  FilterIcon, 
  ListIcon, 
  GridIcon, 
  FileTextIcon, 
  PresentationIcon, 
  VideoIcon, 
  ImageIcon, 
  BookOpenIcon,
  DownloadIcon,
  EyeIcon,
  BookmarkIcon,
  LibraryIcon
} from 'lucide-react';

const mockFiles = [
  {
    id: 'libf1',
    title: 'Advanced Cardiac Life Support (ACLS) Guidelines 2025',
    type: 'PDF',
    icon: <FileTextIcon className="h-10 w-10 text-red-600" />,
    description: 'The latest comprehensive guidelines for ACLS, including algorithms and drug dosages.',
    uploader: 'Dr. Evelyn Reed',
    uploaderAvatar: '/avatars/evelyn.jpg',
    date: '2025-03-15',
    views: 1250,
    downloads: 850,
    specialty: 'Cardiology',
    tags: ['ACLS', 'Guidelines', 'Emergency Medicine'],
    thumbnail: '/thumbnails/acls_thumb.jpg' // Placeholder
  },
  {
    id: 'libf2',
    title: 'Pediatric Sepsis Management Protocol',
    type: 'DOCX',
    icon: <FileTextIcon className="h-10 w-10 text-blue-600" />,
    description: 'A step-by-step protocol for managing sepsis in pediatric patients, based on current evidence.',
    uploader: 'Dr. Ben Carter',
    uploaderAvatar: '/avatars/ben.jpg',
    date: '2025-04-02',
    views: 980,
    downloads: 620,
    specialty: 'Pediatrics',
    tags: ['Sepsis', 'Pediatrics', 'Protocol'],
    thumbnail: '/thumbnails/ped_sepsis_thumb.jpg' // Placeholder
  },
  {
    id: 'libf3',
    title: 'Neurosurgical Approaches to Brain Tumors (Video Lecture)',
    type: 'MP4',
    icon: <VideoIcon className="h-10 w-10 text-purple-600" />,
    description: 'A recorded lecture by Prof. Samuel Green discussing modern neurosurgical techniques.',
    uploader: 'Prof. Samuel Green',
    uploaderAvatar: '/avatars/samuel.jpg',
    date: '2025-02-20',
    views: 2100,
    downloads: 1500,
    specialty: 'Neurology',
    tags: ['Neurosurgery', 'Brain Tumors', 'Lecture'],
    thumbnail: '/thumbnails/neurosurgery_thumb.jpg' // Placeholder
  },
  {
    id: 'libf4',
    title: 'Radiographic Atlas of Skeletal Dysplasias',
    type: 'IMAGE_COLLECTION',
    icon: <ImageIcon className="h-10 w-10 text-green-600" />,
    description: 'A collection of high-resolution medical images showcasing various skeletal dysplasias.',
    uploader: 'Ortho Department Archives',
    uploaderAvatar: '/avatars/group-ortho.png',
    date: '2025-01-10',
    views: 750,
    downloads: 400,
    specialty: 'Orthopedics',
    tags: ['Radiology', 'Skeletal Dysplasia', 'Atlas'],
    thumbnail: '/thumbnails/skeletal_atlas_thumb.jpg' // Placeholder
  },
  {
    id: 'libf5',
    title: 'Clinical Pharmacology Made Ridiculously Simple (eBook)',
    type: 'EPUB',
    icon: <BookOpenIcon className="h-10 w-10 text-indigo-600" />,
    description: 'A popular eBook simplifying complex pharmacological concepts for students and practitioners.',
    uploader: 'MedEd Publishers',
    uploaderAvatar: '/avatars/publisher_logo.png',
    date: '2024-11-05',
    views: 3500,
    downloads: 2800,
    specialty: 'Pharmacology',
    tags: ['Pharmacology', 'eBook', 'Medical Education'],
    thumbnail: '/thumbnails/pharma_ebook_thumb.jpg' // Placeholder
  },
];

const LibraryPage = () => {
  const { t } = useTranslation("common");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [filters, setFilters] = useState({
    specialty: "all",
    fileType: "all",
    sortBy: "latest",
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const filteredAndSortedFiles = useMemo(() => {
    let result = mockFiles.filter(file => 
      (file.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       file.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       file.uploader.toLowerCase().includes(searchTerm.toLowerCase()) ||
       file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (filters.specialty === "all" || file.specialty.toLowerCase() === filters.specialty.toLowerCase()) &&
      (filters.fileType === "all" || file.type.toLowerCase() === filters.fileType.toLowerCase())
    );

    switch (filters.sortBy) {
      case 'latest':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'popular':
        result.sort((a, b) => (b.views + b.downloads) - (a.views + a.downloads));
        break;
      case 'name_asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    return result;
  }, [searchTerm, filters]);

  const specialties = useMemo(() => ['all', ...new Set(mockFiles.map(f => f.specialty))], []);
  const fileTypes = useMemo(() => ['all', ...new Set(mockFiles.map(f => f.type))], []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center mb-4 md:mb-0">
            <LibraryIcon className="h-10 w-10 mr-3 text-blue-600" />
            <h1 className="text-4xl font-bold tracking-tight">{t("library")}</h1>
        </div>
        <Button variant="outline" size="lg">
          <UploadCloudIcon className="h-5 w-5 mr-2" />
          {t("upload_new_file")}
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <Card className="mb-8 p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2 lg:col-span-2">
            <label htmlFor="search-library" className="block text-sm font-medium text-gray-700 mb-1">{t("search_files")}</label>
            <div className="relative">
                <Input 
                    id="search-library"
                    type="search" 
                    placeholder={t("search_by_title_tags_uploader") + "..."} 
                    className="pl-10 py-3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="filter-specialty" className="block text-sm font-medium text-gray-700 mb-1">{t("specialty")}</label>
            <Select value={filters.specialty} onValueChange={(value) => handleFilterChange("specialty", value)}>
              <SelectTrigger id="filter-specialty" className="py-3">
                <SelectValue placeholder={t("all_specialties")} />
              </SelectTrigger>
              <SelectContent>
                {specialties.map(spec => <SelectItem key={spec} value={spec}>{spec === 'all' ? t('all_specialties') : t(spec.toLowerCase())}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="filter-filetype" className="block text-sm font-medium text-gray-700 mb-1">{t("file_type")}</label>
            <Select value={filters.fileType} onValueChange={(value) => handleFilterChange("fileType", value)}>
              <SelectTrigger id="filter-filetype" className="py-3">
                <SelectValue placeholder={t("all_file_types")} />
              </SelectTrigger>
              <SelectContent>
                {fileTypes.map(type => <SelectItem key={type} value={type}>{type === 'all' ? t('all_file_types') : type}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">{t("sort_by")}</label>
            <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
              <SelectTrigger id="sort-by" className="py-3">
                <SelectValue placeholder={t("sort_by")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">{t("latest")}</SelectItem>
                <SelectItem value="popular">{t("most_popular_views_downloads")}</SelectItem>
                <SelectItem value="name_asc">{t("name_a_z")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-2 flex justify-end items-center space-x-2 pt-4 md:pt-0">
            <p className="text-sm text-gray-600">{t("view_mode")}:</p>
            <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('grid')}><GridIcon className="h-5 w-5" /></Button>
            <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('list')}><ListIcon className="h-5 w-5" /></Button>
          </div>
        </div>
      </Card>

      {/* Files Display Area */}
      {filteredAndSortedFiles.length > 0 ? (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
          {filteredAndSortedFiles.map(file => (
            <Card key={file.id} className={`overflow-hidden flex flex-col ${viewMode === 'list' ? 'md:flex-row' : ''}`}>
              {viewMode === 'grid' && file.thumbnail && (
                <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                  {/* <img src={file.thumbnail} alt={file.title} className="h-full w-full object-cover"/> */}
                  {file.icon} {/* Using icon as placeholder for now */}
                </div>
              )}
              <div className={`p-4 flex-grow flex flex-col justify-between ${viewMode === 'list' ? 'md:w-2/3' : ''}`}>
                <div>
                  <CardTitle className={`mb-1 ${viewMode === 'grid' ? 'text-lg' : 'text-xl'}`}>{file.title}</CardTitle>
                  <CardDescription className="text-xs text-gray-500 mb-2">
                    {t("uploaded_by")} {file.uploader} - {file.date}
                  </CardDescription>
                  {viewMode === 'grid' && <p className="text-sm text-gray-700 mb-3 h-16 overflow-hidden text-ellipsis">{file.description}</p>}
                  {viewMode === 'list' && <p className="text-sm text-gray-700 mb-3">{file.description}</p>}
                  <div className="mb-3 flex flex-wrap gap-1">
                    <Badge variant="secondary">{file.type}</Badge>
                    <Badge variant="outline">{t(file.specialty.toLowerCase())}</Badge>
                    {file.tags.slice(0,2).map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{file.views} {t("views").toLowerCase()}</span>
                    <span>{file.downloads} {t("downloads").toLowerCase()}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm"><EyeIcon className="h-4 w-4 mr-1" />{t("preview")}</Button>
                  <Button size="sm"><DownloadIcon className="h-4 w-4 mr-1" />{t("download")}</Button>
                  <Button variant="ghost" size="icon"><BookmarkIcon className="h-5 w-5" /></Button>
                </div>
              </div>
              {viewMode === 'list' && file.thumbnail && (
                <div className="w-full md:w-1/3 h-40 md:h-auto bg-gray-200 flex items-center justify-center order-first md:order-last">
                   {file.icon}
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <SearchIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">{t("no_files_found_matching_criteria")}</p>
          <p className="text-sm">{t("try_adjusting_filters_or_search_term")}</p>
        </div>
      )}
      {/* TODO: Pagination or Infinite Scroll */}
    </div>
  );
};

export default LibraryPage;

