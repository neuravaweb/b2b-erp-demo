'use client';

import { useEffect, useState } from 'react';
import { DashboardCard, DashboardCardsGrid } from '@/components/DashboardCards';
import { getDemoOrders, getDemoMessages, getDemoAnnouncements } from '@/lib/demoApi';
import type { DemoOrder } from '@/demo-data/orders';

export default function CustomerDashboard() {
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [messagesCount, setMessagesCount] = useState(0);
  const [announcementsCount, setAnnouncementsCount] = useState(0);

  useEffect(() => {
    const allOrders = getDemoOrders();
    const customerOrders = allOrders.filter((o) => o.customerId === '1');
    setOrders(customerOrders);

    const messages = getDemoMessages('USER');
    const unreadMessages = messages.filter((m) => !m.read);
    setMessagesCount(unreadMessages.length);

    const announcements = getDemoAnnouncements();
    setAnnouncementsCount(announcements.length);
  }, []);

  const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'processing').length;
  const totalOrders = orders.length;
  const totalValue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <DashboardCardsGrid>
        <DashboardCard
          title="Total Orders"
          value={totalOrders}
          subtitle="All time"
          icon="📋"
          color="blue"
        />
        <DashboardCard
          title="Pending Orders"
          value={pendingOrders}
          subtitle="Awaiting processing"
          icon="⏳"
          color="yellow"
        />
        <DashboardCard
          title="Total Value"
          value={`${totalValue.toLocaleString('pl-PL')} PLN`}
          subtitle="All orders"
          icon="💰"
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
