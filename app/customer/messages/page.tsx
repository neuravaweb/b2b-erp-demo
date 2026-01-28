'use client';

import { useEffect, useState } from 'react';
import { getDemoMessages } from '@/lib/demoApi';
import type { DemoMessage } from '@/demo-data/messages';
import { Table } from '@/components/Tables';

export default function MessagesPage() {
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<DemoMessage | null>(null);

  useEffect(() => {
    const allMessages = getDemoMessages('USER');
    setMessages(allMessages);
    if (allMessages.length > 0 && !selectedMessage) {
      setSelectedMessage(allMessages[0]);
    }
  }, [selectedMessage]);

  const getPriorityBadge = (priority: string) => {
    const priorityClasses = {
      low: 'bg-gray-100 text-gray-800',
      normal: 'bg-blue-100 text-blue-800',
      high: 'bg-yellow-100 text-yellow-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityClasses[priority as keyof typeof priorityClasses] || 'bg-gray-100 text-gray-800'}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const columns = [
    { key: 'from', label: 'From' },
    { key: 'subject', label: 'Subject' },
    { key: 'date', label: 'Date', render: (m: DemoMessage) => new Date(m.date).toLocaleDateString('pl-PL') },
    { key: 'priority', label: 'Priority', render: (m: DemoMessage) => getPriorityBadge(m.priority) },
    { key: 'read', label: 'Status', render: (m: DemoMessage) => m.read ? 'Read' : 'Unread' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Table
            columns={columns}
            data={messages}
            onRowClick={(m) => setSelectedMessage(m as DemoMessage)}
            emptyMessage="No messages"
          />
        </div>
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="mb-4 pb-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedMessage.subject}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>From: {selectedMessage.from}</span>
                  <span>Date: {new Date(selectedMessage.date).toLocaleString('pl-PL')}</span>
                  {getPriorityBadge(selectedMessage.priority)}
                </div>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedMessage.content}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <p className="text-gray-500">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
