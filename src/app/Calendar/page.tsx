"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar"; // Assuming shadcn/ui calendar
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CalendarDaysIcon,
  PlusCircleIcon,
  ListIcon,
  ClockIcon,
  MapPinIcon,
  EditIcon,
  Trash2Icon,
  UsersIcon,
  BellIcon
} from 'lucide-react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameDay, isSameMonth } from 'date-fns';

const mockEvents = [
  {
    id: 'evt1',
    title: 'Cardiology Grand Rounds',
    start: new Date(2025, 4, 15, 9, 0, 0), // Note: Month is 0-indexed (4 = May)
    end: new Date(2025, 4, 15, 10, 30, 0),
    location: 'Auditorium A, Main Hospital',
    description: 'Presentation on new TAVI techniques by Dr. Evelyn Reed.',
    color: 'bg-red-500',
    category: 'Medical Talk'
  },
  {
    id: 'evt2',
    title: 'Pediatric Ward Meeting',
    start: new Date(2025, 4, 16, 14, 0, 0),
    end: new Date(2025, 4, 16, 15, 0, 0),
    location: 'Conference Room 3, Children\s Wing',
    description: 'Weekly meeting to discuss patient cases and ward management.',
    color: 'bg-blue-500',
    category: 'Meeting'
  },
  {
    id: 'evt3',
    title: 'Surgery Schedule Review',
    start: new Date(2025, 4, 20, 8, 0, 0),
    end: new Date(2025, 4, 20, 9, 0, 0),
    location: 'Online - Zoom Meeting',
    description: 'Review upcoming surgical schedules for the week.',
    color: 'bg-green-500',
    category: 'Admin'
  },
  {
    id: 'evt4',
    title: 'Journal Club: Neurology Advances',
    start: new Date(2025, 4, 22, 12, 0, 0),
    end: new Date(2025, 4, 22, 13, 0, 0),
    location: 'Library Seminar Room',
    description: 'Discussion of recent articles in top neurology journals.',
    color: 'bg-purple-500',
    category: 'Academic'
  },
];

const CalendarPage = () => {
  const { t } = useTranslation("common");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month"); // month, week, day
  const [events, setEvents] = useState(mockEvents);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEventData, setNewEventData] = useState({
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    description: '',
    category: 'Meeting'
  });

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Potentially switch to day view or filter events for this day
  };

  const handleAddEventClick = () => {
    setSelectedEvent(null);
    setNewEventData({
        title: '',
        startDate: format(selectedDate, 'yyyy-MM-dd'),
        startTime: '09:00',
        endDate: format(selectedDate, 'yyyy-MM-dd'),
        endTime: '10:00',
        location: '',
        description: '',
        category: 'Meeting'
    });
    setIsEventDialogOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setNewEventData({
        title: event.title,
        startDate: format(event.start, 'yyyy-MM-dd'),
        startTime: format(event.start, 'HH:mm'),
        endDate: format(event.end, 'yyyy-MM-dd'),
        endTime: format(event.end, 'HH:mm'),
        location: event.location || '',
        description: event.description || '',
        category: event.category || 'Meeting'
    });
    setIsEventDialogOpen(true);
  };
  
  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    // Add confirmation dialog in real app
  };

  const handleSaveEvent = () => {
    const startDateTime = new Date(`${newEventData.startDate}T${newEventData.startTime}`);
    const endDateTime = new Date(`${newEventData.endDate}T${newEventData.endTime}`);

    if (selectedEvent) {
        // Update existing event
        setEvents(prev => prev.map(e => e.id === selectedEvent.id ? {
            ...e,
            title: newEventData.title,
            start: startDateTime,
            end: endDateTime,
            location: newEventData.location,
            description: newEventData.description,
            category: newEventData.category,
            color: e.color // Keep original color or allow changing
        } : e));
    } else {
        // Add new event
        const newId = `evt${Date.now()}`;
        setEvents(prev => [...prev, {
            id: newId,
            title: newEventData.title,
            start: startDateTime,
            end: endDateTime,
            location: newEventData.location,
            description: newEventData.description,
            category: newEventData.category,
            color: 'bg-gray-500' // Default color for new events
        }]);
    }
    setIsEventDialogOpen(false);
  };

  const eventsForSelectedDate = events.filter(event => 
    isSameDay(event.start, selectedDate)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center mb-4 md:mb-0">
            <CalendarDaysIcon className="h-10 w-10 mr-3 text-indigo-600" />
            <h1 className="text-4xl font-bold tracking-tight">{t("calendar")}</h1>
        </div>
        <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="default" size="lg" onClick={handleAddEventClick}>
                    <PlusCircleIcon className="h-5 w-5 mr-2" />
                    {t("add_new_event")}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>{selectedEvent ? t("edit_event") : t("add_new_event")}</DialogTitle>
                    <DialogDescription>
                        {selectedEvent ? t("update_details_for_your_event") : t("fill_in_details_for_your_new_event")}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input id="title" placeholder={t("event_title")} value={newEventData.title} onChange={e => setNewEventData({...newEventData, title: e.target.value})} />
                    <div className="grid grid-cols-2 gap-4">
                        <Input id="startDate" type="date" value={newEventData.startDate} onChange={e => setNewEventData({...newEventData, startDate: e.target.value})} />
                        <Input id="startTime" type="time" value={newEventData.startTime} onChange={e => setNewEventData({...newEventData, startTime: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input id="endDate" type="date" value={newEventData.endDate} onChange={e => setNewEventData({...newEventData, endDate: e.target.value})} />
                        <Input id="endTime" type="time" value={newEventData.endTime} onChange={e => setNewEventData({...newEventData, endTime: e.target.value})} />
                    </div>
                    <Input id="location" placeholder={t("location_optional")} value={newEventData.location} onChange={e => setNewEventData({...newEventData, location: e.target.value})} />
                    <Textarea id="description" placeholder={t("description_notes_optional")} value={newEventData.description} onChange={e => setNewEventData({...newEventData, description: e.target.value})} />
                     <Select value={newEventData.category} onValueChange={(value) => setNewEventData({...newEventData, category: value})}>
                        <SelectTrigger><SelectValue placeholder={t("select_category")} /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Meeting">{t("Meeting")}</SelectItem>
                            <SelectItem value="Medical Talk">{t("Medical Talk")}</SelectItem>
                            <SelectItem value="Academic">{t("Academic")}</SelectItem>
                            <SelectItem value="Admin">{t("Admin")}</SelectItem>
                            <SelectItem value="Personal">{t("Personal")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">{t("cancel")}</Button>
                    </DialogClose>
                    <Button onClick={handleSaveEvent}>{t("save_event")}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Calendar View */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{format(selectedDate, "MMMM yyyy")}</CardTitle>
              {/* View switcher (Month/Week/Day) - Placeholder */}
              <div className="flex space-x-1">
                <Button variant={currentView === 'month' ? 'default' : 'outline'} size="sm" onClick={() => setCurrentView('month')}>{t("month")}</Button>
                <Button variant={currentView === 'week' ? 'default' : 'outline'} size="sm" onClick={() => setCurrentView('week')}>{t("week")}</Button>
                <Button variant={currentView === 'day' ? 'default' : 'outline'} size="sm" onClick={() => setCurrentView('day')}>{t("day")}</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 md:p-2">
              <ShadcnCalendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md w-full"
                month={selectedDate} // Control the displayed month
                onMonthChange={setSelectedDate} // Allow month navigation
                components={{
                  DayContent: ({ date, ...props }) => {
                    const dayEvents = events.filter(event => isSameDay(event.start, date) && isSameMonth(date, selectedDate));
                    return (
                      <div className="relative h-full w-full flex items-center justify-center">
                        <span>{format(date, "d")}</span>
                        {dayEvents.length > 0 && (
                          <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex space-x-0.5">
                            {dayEvents.slice(0,3).map(event => (
                              <span key={event.id} className={`h-1.5 w-1.5 rounded-full ${event.color || 'bg-gray-400'}`}></span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Events List for Selected Date */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ListIcon className="h-5 w-5 mr-2" /> 
                {t("events_for")} {format(selectedDate, "PPP")}
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[600px] overflow-y-auto">
              {eventsForSelectedDate.length > 0 ? (
                <ul className="space-y-4">
                  {eventsForSelectedDate.map(event => (
                    <li key={event.id} className={`p-3 rounded-lg border-l-4 ${event.color ? event.color.replace("bg-","border-") : 'border-gray-500'} bg-opacity-10 ${event.color ? event.color + " bg-opacity-10" : "bg-gray-100"}`}>
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <p className="text-xs text-gray-600 flex items-center mt-1">
                        <ClockIcon className="h-3 w-3 mr-1" /> 
                        {format(event.start, "p")} - {format(event.end, "p")}
                      </p>
                      {event.location && (
                        <p className="text-xs text-gray-500 flex items-center mt-0.5">
                          <MapPinIcon className="h-3 w-3 mr-1" /> {event.location}
                        </p>
                      )}
                      {event.description && <p className="text-xs text-gray-500 mt-1 italic truncate">{event.description}</p>}
                      <div className="mt-2 flex space-x-2">
                        <Button variant="outline" size="xs" onClick={() => handleEditEvent(event)}><EditIcon className="h-3 w-3 mr-1"/>{t("edit")}</Button>
                        <Button variant="destructive" size="xs" onClick={() => handleDeleteEvent(event.id)}><Trash2Icon className="h-3 w-3 mr-1"/>{t("delete")}</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">{t("no_events_for_this_date")}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;

