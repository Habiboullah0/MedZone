"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link'; // For future navigation
import {
  HeartPulseIcon, // Cardiology
  BabyIcon, // Pediatrics
  BrainIcon, // Neurology
  ScissorsIcon, // Surgery
  BoneIcon, // Orthopedics
  StethoscopeIcon, // General Medicine
  FileTextIcon, // PDF, DOC
  PresentationIcon, // PPT
  VideoIcon, // Video
  ImageIcon, // Image
  BookOpenIcon, // eBook
  GraduationCapIcon, // Academic Year
  BriefcaseIcon, // Professional Level
  ChevronRightIcon,
  ListChecksIcon
} from 'lucide-react';

const medicalSpecialties = [
  { nameKey: "cardiology", icon: <HeartPulseIcon className="h-8 w-8 mb-2 text-red-500" />, link: "/search?category=cardiology" },
  { nameKey: "pediatrics", icon: <BabyIcon className="h-8 w-8 mb-2 text-blue-500" />, link: "/search?category=pediatrics" },
  { nameKey: "neurology", icon: <BrainIcon className="h-8 w-8 mb-2 text-purple-500" />, link: "/search?category=neurology" },
  { nameKey: "general_surgery", icon: <ScissorsIcon className="h-8 w-8 mb-2 text-green-500" />, link: "/search?category=surgery" },
  { nameKey: "orthopedics", icon: <BoneIcon className="h-8 w-8 mb-2 text-yellow-500" />, link: "/search?category=orthopedics" },
  { nameKey: "general_medicine", icon: <StethoscopeIcon className="h-8 w-8 mb-2 text-teal-500" />, link: "/search?category=general_medicine" },
];

const fileTypes = [
  { nameKey: "pdf_articles", icon: <FileTextIcon className="h-8 w-8 mb-2 text-red-700" />, link: "/library?type=pdf" },
  { nameKey: "presentations", icon: <PresentationIcon className="h-8 w-8 mb-2 text-orange-500" />, link: "/library?type=ppt" },
  { nameKey: "educational_videos", icon: <VideoIcon className="h-8 w-8 mb-2 text-blue-600" />, link: "/library?type=video" },
  { nameKey: "medical_images", icon: <ImageIcon className="h-8 w-8 mb-2 text-green-600" />, link: "/library?type=image" },
  { nameKey: "ebooks", icon: <BookOpenIcon className="h-8 w-8 mb-2 text-indigo-500" />, link: "/library?type=ebook" },
];

const academicLevels = [
  { nameKey: "first_year_med", icon: <GraduationCapIcon className="h-8 w-8 mb-2 text-gray-500" />, link: "/search?level=year1" },
  { nameKey: "resident_doctor", icon: <BriefcaseIcon className="h-8 w-8 mb-2 text-gray-600" />, link: "/search?level=resident" },
  { nameKey: "specialist_doctor", icon: <BriefcaseIcon className="h-8 w-8 mb-2 text-gray-700" />, link: "/search?level=specialist" },
  { nameKey: "consultant_doctor", icon: <BriefcaseIcon className="h-8 w-8 mb-2 text-gray-800" />, link: "/search?level=consultant" },
];

const CategoryCard = ({ title, icon, link, t }) => {
  // In a real app, Link would navigate. For now, it's a placeholder.
  const handleClick = () => {
    console.log(`Navigate to: ${link}`);
    // Router.push(link) or similar Next.js navigation
  };

  return (
    <Card 
        className="hover:shadow-lg transition-shadow cursor-pointer text-center p-6 flex flex-col items-center justify-center h-full"
        onClick={handleClick}
    >
      {icon}
      <CardTitle className="text-md font-semibold">{t(title)}</CardTitle>
    </Card>
  );
};

const CategoriesPage = () => {
  const { t } = useTranslation("common");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <ListChecksIcon className="h-12 w-12 mx-auto mb-3 text-blue-600" />
        <h1 className="text-4xl font-bold tracking-tight">{t("browse_categories")}</h1>
        <p className="mt-2 text-lg text-gray-600">{t("discover_content_by_specialty_type_level")}</p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">{t("medical_specialties")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {medicalSpecialties.map(spec => (
            <CategoryCard key={spec.nameKey} title={spec.nameKey} icon={spec.icon} link={spec.link} t={t} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">{t("file_types")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fileTypes.map(type => (
            <CategoryCard key={type.nameKey} title={type.nameKey} icon={type.icon} link={type.link} t={t} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">{t("academic_professional_levels")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {academicLevels.map(level => (
            <CategoryCard key={level.nameKey} title={level.nameKey} icon={level.icon} link={level.link} t={t} />
          ))}
        </div>
      </section>

      {/* Optional: Popular/Featured Categories Section */}
      {/* 
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">{t("featured_categories")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Example Featured Card */}
      {/* 
          <Card className="p-6 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-blue-700">{t("featured_cardiology_insights")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-600">{t("deep_dive_into_latest_cardiology_research_and_case_studies")}</p>
            </CardContent>
          </Card>
        </div>
      </section>
      */}
    </div>
  );
};

export default CategoriesPage;

