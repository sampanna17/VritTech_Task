import React from 'react';
import UserListClient from '@/components/UserListClient';
import { getUsers } from '@/services/api';

export default async function HomePage() {
  const users = await getUsers();

  return (
    <main className="main-layout">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">User Directory</h1>
          <p className="app-subtitle">
            Explore users, view their posts, and add custom entries locally.
          </p>
        </div>
      </header>
      
      <UserListClient initialUsers={users} />
    </main>
  );
}
