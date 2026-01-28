'use client';

import { useState, useEffect } from 'react';
import { getDemoMessages, getDemoCustomers } from '@/lib/demoApi';
import type { DemoMessage } from '@/demo-data/messages';

export default function MessagesPage() {
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const [attachments, setAttachments] = useState<FileList | null>(null);
  const [showDemoNotification, setShowDemoNotification] = useState(false);
  const [messages, setMessages] = useState<DemoMessage[]>([]);

  useEffect(() => {
    const allMessages = getDemoMessages('ACCOUNTANT');
    setMessages(allMessages);
  }, []);

  const customers = getDemoCustomers();
  // Include Demo Customer (id: '1') in the customer list
  const allCustomers = [
    { id: '1', name: 'Demo Customer', vatNumber: 'PL1111111111', city: 'Warsaw', email: 'demo@customer.pl', status: 'active' as const },
    ...customers,
  ];

  const handleCustomerToggle = (customerId: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo mode - show notification
    setShowDemoNotification(true);
    setTimeout(() => {
      setShowDemoNotification(false);
    }, 5000);
    
    // Reset form
    setSelectedCustomers([]);
    setMessageContent('');
    setAttachments(null);
    setShowNewMessageForm(false);
  };

  const handleCancel = () => {
    setSelectedCustomers([]);
    setMessageContent('');
    setAttachments(null);
    setShowNewMessageForm(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(e.target.files);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <button
          onClick={() => setShowNewMessageForm(!showNewMessageForm)}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          New message
        </button>
      </div>

      {/* Demo Notification */}
      {showDemoNotification && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-yellow-800 font-medium">Demo mode – message not actually sent</span>
          </div>
        </div>
      )}

      {/* New Message Form */}
      {showNewMessageForm && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">New Message</h2>
          </div>
          <form onSubmit={handleSendMessage} className="p-6">
            <div className="space-y-6">
              {/* Multi-select Customer Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select customers (you can choose multiple):
                </label>
                <div className="border border-gray-300 rounded-lg p-3 min-h-[120px] max-h-64 overflow-y-auto bg-white">
                  {allCustomers.length === 0 ? (
                    <p className="text-gray-500 text-sm">No customers available</p>
                  ) : (
                    <div className="space-y-2">
                      {allCustomers.map((customer) => (
                        <label
                          key={customer.id}
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCustomers.includes(customer.id)}
                            onChange={() => handleCustomerToggle(customer.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{customer.name}</div>
                            <div className="text-sm text-gray-600">
                              {customer.vatNumber} • {customer.email}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                {selectedCustomers.length > 0 && (
                  <p className="mt-2 text-sm text-gray-600">
                    {selectedCustomers.length} customer{selectedCustomers.length !== 1 ? 's' : ''} selected
                  </p>
                )}
              </div>

              {/* Message Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message content:
                </label>
                <textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                  placeholder="Enter your message here..."
                />
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachments (optional):
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Allowed file types: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max size: 10MB per file)
                </p>
                {attachments && attachments.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-1">Selected files:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {Array.from(attachments).map((file, index) => (
                        <li key={index}>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={selectedCustomers.length === 0 || !messageContent.trim()}
                  className={`px-6 py-2 text-sm font-medium text-white rounded-lg transition-all duration-300 ${
                    selectedCustomers.length === 0 || !messageContent.trim()
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Send message
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Message List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Message History</h2>
        </div>
        <div className="p-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No messages</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 border rounded-lg ${
                    !message.read
                      ? 'border-blue-200 bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900">{message.subject}</h3>
                        {!message.read && (
                          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                            New
                          </span>
                        )}
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            message.priority === 'urgent'
                              ? 'bg-red-100 text-red-800'
                              : message.priority === 'high'
                              ? 'bg-yellow-100 text-yellow-800'
                              : message.priority === 'normal'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span>From: {message.from}</span>
                        <span className="mx-2">•</span>
                        <span>To: {message.to}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(message.date).toLocaleString('pl-PL')}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                    {message.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
