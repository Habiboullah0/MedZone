"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  LifeBuoyIcon,
  SearchIcon,
  MessageSquareIcon, // For contact form
  BookOpenTextIcon, // For tutorials
  AlertTriangleIcon, // For reporting
  ChevronRightIcon,
  UploadIcon
} from 'lucide-react';
import Link from 'next/link';

const faqsData = {
  account: [
    { id: 'acc1', questionKey: 'faq_q_how_to_reset_password', answerKey: 'faq_a_how_to_reset_password' },
    { id: 'acc2', questionKey: 'faq_q_update_profile_info', answerKey: 'faq_a_update_profile_info' },
    { id: 'acc3', questionKey: 'faq_q_delete_account', answerKey: 'faq_a_delete_account' },
  ],
  posts_chat: [
    { id: 'pc1', questionKey: 'faq_q_create_post', answerKey: 'faq_a_create_post' },
    { id: 'pc2', questionKey: 'faq_q_send_message', answerKey: 'faq_a_send_message' },
    { id: 'pc3', questionKey: 'faq_q_report_content', answerKey: 'faq_a_report_content_general' },
  ],
  privacy_security: [
    { id: 'ps1', questionKey: 'faq_q_profile_visibility', answerKey: 'faq_a_profile_visibility' },
    { id: 'ps2', questionKey: 'faq_q_two_factor_auth', answerKey: 'faq_a_two_factor_auth' },
  ],
  technical_issues: [
    { id: 'ti1', questionKey: 'faq_q_app_slow', answerKey: 'faq_a_app_slow' },
    { id: 'ti2', questionKey: 'faq_q_feature_not_working', answerKey: 'faq_a_feature_not_working' },
  ],
};

const HelpPage = () => {
  const { t } = useTranslation("common");
  const [faqSearchTerm, setFaqSearchTerm] = useState("");
  const [contactForm, setContactForm] = useState({
    name: '', // Prefill if user is logged in
    email: '', // Prefill if user is logged in
    subject: '',
    message: '',
    attachment: null,
  });

  const handleContactFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment") {
        setContactForm(prev => ({ ...prev, attachment: files ? files[0] : null }));
    } else {
        setContactForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send to API)
    console.log("Contact form submitted:", contactForm);
    alert(t("support_request_submitted_successfully"));
    setContactForm({ name: '', email: '', subject: '', message: '', attachment: null });
  };

  const filteredFaqs = Object.keys(faqsData).reduce((acc, category) => {
    const filtered = faqsData[category].filter(faq => 
      t(faq.questionKey).toLowerCase().includes(faqSearchTerm.toLowerCase()) || 
      t(faq.answerKey).toLowerCase().includes(faqSearchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-10">
        <LifeBuoyIcon className="h-10 w-10 mr-3 text-blue-600" />
        <h1 className="text-4xl font-bold tracking-tight">{t("help_and_support")}</h1>
      </div>

      {/* FAQ Section */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">{t("frequently_asked_questions_faq")}</CardTitle>
          <CardDescription>{t("find_answers_to_common_questions_about_medzone")}</CardDescription>
          <div className="relative mt-4">
            <Input 
              type="search" 
              placeholder={t("search_faqs") + "..."} 
              className="pl-10 py-3"
              value={faqSearchTerm}
              onChange={(e) => setFaqSearchTerm(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent>
          {Object.keys(filteredFaqs).length > 0 ? (
            Object.keys(filteredFaqs).map(categoryKey => (
              <div key={categoryKey} className="mb-6">
                <h3 className="text-xl font-semibold mb-3 capitalize border-b pb-1">{t(categoryKey.replace(/_/g, "_"))}</h3> {/* Simple way to translate category keys */} 
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs[categoryKey].map(faq => (
                    <AccordionItem value={faq.id} key={faq.id}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        {t(faq.questionKey)}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 dark:text-gray-300">
                        {t(faq.answerKey)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-6">{t("no_faqs_found_matching_your_search")}</p>
          )}
        </CardContent>
      </Card>

      {/* Contact Support Section */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">{t("contact_support")}</CardTitle>
          <CardDescription>{t("cant_find_answer_reach_out_to_our_support_team")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">{t("your_name")}</label>
                <Input id="contactName" name="name" type="text" placeholder={t("enter_your_name")} value={contactForm.name} onChange={handleContactFormChange} required />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">{t("your_email")}</label>
                <Input id="contactEmail" name="email" type="email" placeholder={t("enter_your_email_address")} value={contactForm.email} onChange={handleContactFormChange} required />
              </div>
            </div>
            <div>
              <label htmlFor="contactSubject" className="block text-sm font-medium text-gray-700 mb-1">{t("subject_of_inquiry")}</label>
              <Select name="subject" value={contactForm.subject} onValueChange={(value) => setContactForm(prev => ({...prev, subject: value}))}>
                <SelectTrigger id="contactSubject">
                  <SelectValue placeholder={t("select_a_subject")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="account_issue">{t("account_issue")}</SelectItem>
                  <SelectItem value="technical_problem">{t("technical_problem")}</SelectItem>
                  <SelectItem value="feature_request">{t("feature_request")}</SelectItem>
                  <SelectItem value="content_report">{t("content_report")}</SelectItem>
                  <SelectItem value="general_question">{t("general_question")}</SelectItem>
                  <SelectItem value="other">{t("other")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="contactMessage" className="block text-sm font-medium text-gray-700 mb-1">{t("describe_your_issue_or_question")}</label>
              <Textarea id="contactMessage" name="message" placeholder={t("please_provide_as_much_detail_as_possible")} value={contactForm.message} onChange={handleContactFormChange} rows={5} required />
            </div>
            <div>
                <label htmlFor="contactAttachment" className="block text-sm font-medium text-gray-700 mb-1">{t("attach_file_screenshot_optional")}</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <UploadIcon className="mx-auto h-10 w-10 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                            <label htmlFor="contactAttachmentInput" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                <span>{t("upload_a_file")}</span>
                                <input id="contactAttachmentInput" name="attachment" type="file" className="sr-only" onChange={handleContactFormChange} />
                            </label>
                            <p className="pl-1">{t("or_drag_and_drop")}</p>
                        </div>
                        {contactForm.attachment && <p className="text-xs text-gray-500">{contactForm.attachment.name}</p>}
                        <p className="text-xs text-gray-500">{t("png_jpg_gif_pdf_up_to_5mb")}</p>
                    </div>
                </div>
            </div>
            <Button type="submit" size="lg" className="w-full md:w-auto">
              <MessageSquareIcon className="h-5 w-5 mr-2" />
              {t("send_support_request")}
            </Button>
            <p className="text-xs text-gray-500 text-center">{t("we_aim_to_respond_within_24_48_hours")}</p>
          </form>
        </CardContent>
      </Card>

      {/* Tutorials & Reporting Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><BookOpenTextIcon className="mr-2 h-5 w-5" />{t("tutorials_and_guides")}</CardTitle>
            <CardDescription>{t("learn_how_to_use_medzone_features_effectively")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">{t("our_comprehensive_guides_and_tutorials_will_be_available_here_soon_to_help_you_get_the_most_out_of_medzone")}</p>
            {/* Placeholder for links to tutorials */}
            <Button variant="outline" disabled>{t("browse_tutorials_coming_soon")}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><AlertTriangleIcon className="mr-2 h-5 w-5 text-orange-500" />{t("report_an_issue_or_content")}</CardTitle>
            <CardDescription>{t("help_us_keep_medzone_safe_and_functional")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">{t("if_you_encounter_a_technical_problem_or_see_inappropriate_content_please_let_us_know")}</p>
            <Link href="/report-issue"> {/* Placeholder link */}
                <Button variant="secondary" className="w-full">
                    {t("report_a_technical_issue")}
                    <ChevronRightIcon className="ml-auto h-4 w-4" />
                </Button>
            </Link>
            <Link href="/report-content"> {/* Placeholder link */}
                <Button variant="secondary" className="w-full mt-2">
                    {t("report_inappropriate_content_or_user")}
                    <ChevronRightIcon className="ml-auto h-4 w-4" />
                </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpPage;

