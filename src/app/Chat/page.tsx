"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchIcon, PaperclipIcon, MicIcon, SendIcon, MoreVerticalIcon, UserPlusIcon, UsersIcon } from 'lucide-react';

const mockConversations = [
  { id: '1', type: 'private', name: 'Dr. Ali Hassan', avatar: '/avatars/ali.jpg', lastMessage: 'Yes, I will send the report by EOD.', time: '10:30 AM', unread: 2 },
  { id: '2', type: 'group', name: 'Cardiology Team', avatar: '/avatars/group-cardio.png', lastMessage: 'Dr. Sara: Meeting at 2 PM today.', time: '09:15 AM', unread: 0 },
  { id: '3', type: 'private', name: 'Layla Ahmed (Nurse)', avatar: '/avatars/layla-n.jpg', lastMessage: 'Patient in room 302 needs attention.', time: 'Yesterday', unread: 0 },
  { id: '4', type: 'private', name: 'Pharma Rep John', avatar: '/avatars/john-rep.jpg', lastMessage: 'New drug samples available.', time: 'Mon', unread: 5 },
  { id: '5', type: 'group', name: 'Pediatrics Study Group', avatar: '/avatars/group-peds.png', lastMessage: 'Omar: Shared new guidelines.', time: 'Sun', unread: 1 },
];

const mockMessages = {
  '1': [
    { id: 'm1', sender: 'Dr. Ali Hassan', text: 'Hello! How are you?', time: '10:00 AM', self: false },
    { id: 'm2', sender: 'You', text: 'I am good, thank you! Just wanted to follow up on the X-Ray images for patient ID 789.', time: '10:05 AM', self: true },
    { id: 'm3', sender: 'Dr. Ali Hassan', text: 'Ah yes, I have them. They look clear, no major concerns.', time: '10:28 AM', self: false },
    { id: 'm4', sender: 'Dr. Ali Hassan', text: 'Yes, I will send the report by EOD.', time: '10:30 AM', self: false },
  ],
  '2': [
    { id: 'g1', sender: 'Dr. Fatima', text: 'Good morning team!', time: '09:00 AM', self: false },
    { id: 'g2', sender: 'You', text: 'Morning Dr. Fatima!', time: '09:01 AM', self: true },
    { id: 'g3', sender: 'Dr. Sara', text: 'Meeting at 2 PM today.', time: '09:15 AM', self: false },
  ],
  // Add more messages for other conversations if needed
};

const ChatPage = () => {
  const { t } = useTranslation('common');
  const [selectedConversationId, setSelectedConversationId] = useState(mockConversations[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const selectedConversation = mockConversations.find(c => c.id === selectedConversationId);
  const currentMessages = mockMessages[selectedConversationId] || [];

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    // In a real app, this would send the message to a backend
    // and update the message list optimistically or via subscription.
    const newMsg = { id: `msg-${Date.now()}`, sender: 'You', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), self: true };
    mockMessages[selectedConversationId] = [...(mockMessages[selectedConversationId] || []), newMsg];
    setNewMessage('');
  };
  
  const filteredConversations = mockConversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col md:flex-row bg-gray-50">
      {/* Conversations List Panel */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{t('chat')}</h2>
            <div className="space-x-2">
                <Button variant="ghost" size="icon"><UserPlusIcon className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><UsersIcon className="h-5 w-5" /></Button>
            </div>
          </div>
          <div className="relative">
            <Input 
              type="search" 
              placeholder={t('search') + " " + t('chat').toLowerCase() + "..."} 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <ScrollArea className="flex-grow">
          {filteredConversations.map(conv => (
            <div 
              key={conv.id} 
              className={`p-4 cursor-pointer hover:bg-gray-100 border-b border-gray-100 ${selectedConversationId === conv.id ? 'bg-blue-50' : ''}`}
              onClick={() => setSelectedConversationId(conv.id)}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={conv.avatar} alt={conv.name} />
                  <AvatarFallback>{conv.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{conv.name}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{conv.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 truncate pr-2">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Window Panel */}
      {selectedConversation ? (
        <div className="flex-grow flex flex-col bg-white">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between bg-gray-50">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                <AvatarFallback>{selectedConversation.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{selectedConversation.name}</h3>
                {selectedConversation.type === 'private' && <p className="text-xs text-green-500">Online</p>}
                {selectedConversation.type === 'group' && <p className="text-xs text-gray-500">3 members online</p>}
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVerticalIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages View */}
          <ScrollArea className="flex-grow p-4 space-y-4 bg-gray-100">
            {currentMessages.map(msg => (
              <div key={msg.id} className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${msg.self ? 'bg-blue-500 text-white' : 'bg-white border'}`}>
                  {!msg.self && selectedConversation.type === 'group' && <p className="text-xs font-semibold mb-1">{msg.sender}</p>}
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.self ? 'text-blue-200' : 'text-gray-400'} text-right`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </ScrollArea>

          {/* Message Input Box */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <PaperclipIcon className="h-5 w-5" />
              </Button>
              <Input 
                type="text" 
                placeholder={t('type_a_message') + "..."} 
                className="flex-grow" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button variant="ghost" size="icon">
                <MicIcon className="h-5 w-5" />
              </Button>
              <Button onClick={handleSendMessage} size="icon">
                <SendIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center text-gray-500">
          <p>{t('select_a_conversation_to_start_chatting')}</p>
        </div>
      )}
    </div>
  );
};

export default ChatPage;

