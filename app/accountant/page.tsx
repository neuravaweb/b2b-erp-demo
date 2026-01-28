'use client';

import { useEffect, useState } from 'react';
import { DashboardCard, DashboardCardsGrid } from '@/components/DashboardCards';
import { getDemoOrders, getDemoMessages, getDemoAnnouncements, getDemoCustomers } from '@/lib/demoApi';

export default function AccountantDashboard() {
  const [ordersCount, setOrdersCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);
  const [announcementsCount, setAnnouncementsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);

  useEffect(() => {
    const orders = getDemoOrders();
    setOrdersCount(orders.length);

    const messages = getDemoMessages('ACCOUNTANT');
    const unreadMessages = messages.filter((m) => !m.read);
    setMessagesCount(unreadMessages.length);

    const announcements = getDemoAnnouncements();
    setAnnouncementsCount(announcements.length);

    const customers = getDemoCustomers();
    setCustomersCount(customers.length);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <DashboardCardsGrid>
        <DashboardCard
          title="Total Orders"
          value={ordersCount}
          subtitle="All orders"
          icon="📋"
          color="blue"
        />
        <DashboardCard
          title="Active Customers"
          value={customersCount}
          subtitle="Registered customers"
          icon="🏢"
          color="green"
        />
        <DashboardCard
          title="Unread Messages"
          value={messagesCount}
          subtitle="New notifications"
          icon="✉️"
          color="purple"
        />
        <DashboardCard
          title="Announcements"
          value={announcementsCount}
          subtitle="Latest updates"
          icon="📢"
          color="blue"
        />
      </DashboardCardsGrid>
    </div>
  );
}
