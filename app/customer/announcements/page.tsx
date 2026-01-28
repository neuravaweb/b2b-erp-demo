'use client';

import { useEffect, useState } from 'react';
import { getDemoAnnouncements } from '@/lib/demoApi';
import type { DemoAnnouncement } from '@/demo-data/announcements';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<DemoAnnouncement[]>([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<DemoAnnouncement | null>(null);

  useEffect(() => {
    const allAnnouncements = getDemoAnnouncements();
    setAnnouncements(allAnnouncements);
  }, []);

  const getPriorityBadge = (priority: string) => {
    const priorityClasses = {
      low: 'bg-gray-100 text-gray-800',
      normal: 'bg-blue-100 text-blue-800',
      high: 'bg-yellow-100 text-yellow-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityClasses[priority as keyof typeof priorityClasses] || 'bg-gray-100 text-gray-800'}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Announcements</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                onClick={() => setSelectedAnnouncement(announcement)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                  selectedAnnouncement?.id === announcement.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm text-gray-900">{announcement.title}</h3>
                  {getPriorityBadge(announcement.priority)}
                </div>
                <p className="text-xs text-gray-500">{announcement.date}</p>
                <p className="text-xs text-gray-600 mt-2 line-clamp-2">{announcement.content.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          {selectedAnnouncement ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedAnnouncement.title}</h2>
                  {getPriorityBadge(selectedAnnouncement.priority)}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Date: {selectedAnnouncement.date}</span>
                  <span>Author: {selectedAnnouncement.author}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs">{selectedAnnouncement.category}</span>
                </div>
              </div>
              <div className="prose max-w-none">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedAnnouncement.content}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <p className="text-gray-500">Select an announcement to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
