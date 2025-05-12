"use client";

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import {
  BookmarkIcon,
  FileTextIcon,
  MessageSquareIcon, // For posts
  Edit3Icon, // For notes/drafts
  Trash2Icon,
  FolderIcon, // For organizing notes
  HardDriveIcon, // For storage
  FilterIcon,
  EyeIcon,
  DownloadIcon,
  HeartIcon,
  ShareIcon,
  PlusCircleIcon,
  Settings2Icon
} from 'lucide-react';

// Mock Data (expand as needed)
const mockSavedFiles = [
  {
    id: 'sf1',
    title: 'ACLS Guidelines 2025.pdf',
    type: 'PDF',
    icon: <FileTextIcon className="h-8 w-8 text-red-500" />,
    source: 'Library',
    dateSaved: '2025-05-10',
    originalUploader: 'Dr. Evelyn Reed',
    size: '2.5MB'
  },
  {
    id: 'sf2',
    title: 'Pediatric Sepsis Protocol.docx',
    type: 'DOCX',
    icon: <FileTextIcon className="h-8 w-8 text-blue-500" />,
    source: 'Group: Pediatric Care Network',
    dateSaved: '2025-05-08',
    originalUploader: 'Dr. Ben Carter',
    size: '1.2MB'
  },
];

const mockSavedPosts = [
  {
    id: 'sp1',
    title: 'New Advancements in Cardiology',
    user: 'Dr. Evelyn Reed',
    avatar: '/avatars/evelyn.jpg',
    category: 'Cardiology',
    contentSnippet: 'A comprehensive review of recent breakthroughs in heart disease treatment...',
    dateSaved: '2025-05-11',
    likes: 120, 
    comments: 15
  },
  {
    id: 'sp2',
    title: 'Understanding Medical Ethics in AI',
    user: 'Dr. Aisha Khan',
    avatar: '/avatars/aisha.jpg',
    category: 'Medical Ethics',
    contentSnippet: 'Exploring the ethical dilemmas posed by AI in diagnostics and treatment planning...',
    dateSaved: '2025-05-09',
    likes: 210, 
    comments: 45
  },
];

const mockPersonalNotes = [
    { id: 'pn1', title: 'Ideas for Research Paper', content: 'Brainstorming topics for the upcoming research submission. Focus on AI in diagnostics.', lastEdited: '2025-05-12', tags: ['research', 'ai'] },
    { id: 'pn2', title: 'Conference Follow-up', content: 'Contact Dr. Smith regarding collaboration. Review notes from pediatric oncology session.', lastEdited: '2025-05-10', tags: ['conference', 'networking'] },
];

const mockDraftPosts = [
    { id: 'dp1', title: 'Draft: The Future of Telemedicine', snippet: 'Telemedicine has seen a rapid...', lastSaved: '2025-05-11', category: 'Healthcare Policy' },
];

const MyResourcesPage = () => {
  const { t } = useTranslation("common");
  const [activeTab, setActiveTab] = useState("saved_files");
  const [notes, setNotes] = useState(mockPersonalNotes);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '', tags: ''});

  const handleNoteSave = () => {
    if (currentNote.id) {
        setNotes(notes.map(n => n.id === currentNote.id ? { ...n, title: currentNote.title, content: currentNote.content, tags: currentNote.tags.split(',').map(t => t.trim()), lastEdited: format(new Date(), 'yyyy-MM-dd') } : n));
    } else {
        setNotes([...notes, { id: `pn${Date.now()}`, title: currentNote.title, content: currentNote.content, tags: currentNote.tags.split(',').map(t => t.trim()), lastEdited: format(new Date(), 'yyyy-MM-dd') }]);
    }
    setIsNoteDialogOpen(false);
    setCurrentNote({ id: null, title: '', content: '', tags: ''});
  };

  const openNoteDialog = (note = null) => {
    if (note) {
        setCurrentNote({ id: note.id, title: note.title, content: note.content, tags: note.tags.join(', ')});
    } else {
        setCurrentNote({ id: null, title: '', content: '', tags: ''});
    }
    setIsNoteDialogOpen(true);
  };

  const deleteNote = (noteId) => {
    setNotes(notes.filter(n => n.id !== noteId));
  }

  // Placeholder for storage usage
  const storageUsed = 65; // Percentage
  const totalStorage = "10 GB";
  const usedStorage = "6.5 GB";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <BookmarkIcon className="h-10 w-10 mr-3 text-purple-600" />
        <h1 className="text-4xl font-bold tracking-tight">{t("my_resources")}</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-6">
          <TabsTrigger value="saved_files">{t("saved_files")}</TabsTrigger>
          <TabsTrigger value="saved_posts">{t("saved_posts")}</TabsTrigger>
          <TabsTrigger value="personal_notes">{t("personal_notes")}</TabsTrigger>
          <TabsTrigger value="draft_posts">{t("draft_posts")}</TabsTrigger>
          <TabsTrigger value="storage">{t("storage")}</TabsTrigger>
        </TabsList>

        <TabsContent value="saved_files">
          <Card>
            <CardHeader>
              <CardTitle>{t("my_saved_files")}</CardTitle>
              <CardDescription>{t("access_and_manage_files_saved_from_library_or_posts")}</CardDescription>
              {/* Add filters for files if needed */}
            </CardHeader>
            <CardContent className="space-y-4">
              {mockSavedFiles.length > 0 ? mockSavedFiles.map(file => (
                <Card key={file.id} className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    {file.icon}
                    <div>
                      <h3 className="font-semibold text-md">{file.title}</h3>
                      <p className="text-xs text-gray-500">
                        {t("saved_on")}: {file.dateSaved} | {t("source")}: {file.source} ({file.originalUploader}) | {file.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm"><EyeIcon className="h-4 w-4 mr-1" />{t("preview")}</Button>
                    <Button size="sm"><DownloadIcon className="h-4 w-4 mr-1" />{t("download")}</Button>
                    <Button variant="ghost" size="icon" title={t("remove_from_my_resources")}>
                      <Trash2Icon className="h-5 w-5 text-red-500" />
                    </Button>
                  </div>
                </Card>
              )) : <p className="text-gray-500 text-center py-4">{t("no_files_saved_yet")}</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved_posts">
          <Card>
            <CardHeader>
              <CardTitle>{t("my_saved_posts")}</CardTitle>
              <CardDescription>{t("revisit_posts_you_found_interesting_and_saved")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockSavedPosts.length > 0 ? mockSavedPosts.map(post => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-semibold text-lg">{post.title}</h3>
                            <div className="text-xs text-gray-500 flex items-center mt-1">
                                <Avatar className="h-5 w-5 mr-1.5">
                                    <AvatarImage src={post.avatar} alt={post.user} />
                                    <AvatarFallback>{post.user.substring(0,1)}</AvatarFallback>
                                </Avatar>
                                {post.user} | <Badge variant="secondary" className="ml-1.5">{t(post.category.toLowerCase())}</Badge>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" title={t("remove_from_saved_posts")}>
                            <Trash2Icon className="h-5 w-5 text-red-500" />
                        </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-sm text-gray-700 truncate">{post.contentSnippet}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-3">
                    <p className="text-xs text-gray-500">{t("saved_on")}: {post.dateSaved}</p>
                    <div className="flex space-x-2">
                        <Button variant="ghost" size="sm"><HeartIcon className="h-4 w-4 mr-1" />{post.likes}</Button>
                        <Button variant="ghost" size="sm"><MessageSquareIcon className="h-4 w-4 mr-1" />{post.comments}</Button>
                        <Button variant="outline" size="sm">{t("view_post")}</Button>
                    </div>
                  </CardFooter>
                </Card>
              )) : <p className="text-gray-500 text-center py-4">{t("no_posts_saved_yet")}</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personal_notes">
          <Card>
            <CardHeader className="flex justify-between items-center">
                <div>
                    <CardTitle>{t("my_personal_notes")}</CardTitle>
                    <CardDescription>{t("create_and_manage_your_private_notes")}</CardDescription>
                </div>
                <Button onClick={() => openNoteDialog()}><PlusCircleIcon className="h-4 w-4 mr-2" />{t("add_new_note")}</Button>
            </CardHeader>
            <CardContent className="space-y-3">
                {notes.length > 0 ? notes.map(note => (
                    <Card key={note.id} className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-semibold">{note.title}</h4>
                                <p className="text-xs text-gray-500">{t("last_edited")}: {note.lastEdited}</p>
                                <p className="text-sm mt-1 text-gray-600 truncate">{note.content}</p>
                                <div className="mt-1 space-x-1">
                                    {note.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                                </div>
                            </div>
                            <div className="flex space-x-1">
                                <Button variant="ghost" size="icon" onClick={() => openNoteDialog(note)}><Edit3Icon className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" onClick={() => deleteNote(note.id)}><Trash2Icon className="h-4 w-4 text-red-500" /></Button>
                            </div>
                        </div>
                    </Card>
                )) : <p className="text-gray-500 text-center py-4">{t("no_personal_notes_yet_create_one")}</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="draft_posts">
          <Card>
            <CardHeader>
              <CardTitle>{t("my_draft_posts")}</CardTitle>
              <CardDescription>{t("continue_editing_or_publish_your_drafts")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockDraftPosts.length > 0 ? mockDraftPosts.map(draft => (
                <Card key={draft.id} className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-semibold">{draft.title}</h4>
                            <p className="text-xs text-gray-500">{t("last_saved")}: {draft.lastSaved} | {t("category")}: {t(draft.category.toLowerCase())}</p>
                            <p className="text-sm mt-1 text-gray-600 truncate">{draft.snippet}</p>
                        </div>
                        <div className="flex space-x-1">
                            <Button variant="outline" size="sm"><Edit3Icon className="h-4 w-4 mr-1" />{t("edit_draft")}</Button>
                            <Button variant="ghost" size="icon" title={t("delete_draft")}><Trash2Icon className="h-4 w-4 text-red-500" /></Button>
                        </div>
                    </div>
                </Card>
              )) : <p className="text-gray-500 text-center py-4">{t("no_draft_posts_found")}</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage">
          <Card>
            <CardHeader>
              <CardTitle>{t("my_storage_usage")}</CardTitle>
              <CardDescription>{t("manage_your_uploaded_files_and_storage_space")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{t("overall_storage")}</h4>
                  <p className="text-sm text-gray-600">{usedStorage} / {totalStorage}</p>
                </div>
                <Progress value={storageUsed} className="w-full" />
                <p className="text-xs text-gray-500 mt-1">{t("you_have_used_percentage_of_your_storage", { percentage: storageUsed })}</p>
              </div>
              {/* Placeholder for list of uploaded files by user - if feature exists */}
              <div className="text-center text-gray-400 py-6">
                <HardDriveIcon className="h-10 w-10 mx-auto mb-2" />
                <p>{t("file_management_features_will_appear_here")}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Note Dialog */}
      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{currentNote.id ? t("edit_note") : t("add_new_note")}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <Input placeholder={t("note_title")} value={currentNote.title} onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})} />
                <Textarea placeholder={t("note_content")} value={currentNote.content} onChange={(e) => setCurrentNote({...currentNote, content: e.target.value})} rows={5} />
                <Input placeholder={t("tags_comma_separated")} value={currentNote.tags} onChange={(e) => setCurrentNote({...currentNote, tags: e.target.value})} />
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)}>{t("cancel")}</Button>
                <Button onClick={handleNoteSave}>{t("save_note")}</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default MyResourcesPage;

