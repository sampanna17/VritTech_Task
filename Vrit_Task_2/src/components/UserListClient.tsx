'use client';

import React, { useEffect } from 'react';
import { Search, RefreshCw, AlertCircle } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { User } from '@/types';
import UserCard from './UserCard';
import LoadingSpinner from './LoadingSpinner';

interface UserListClientProps {
  initialUsers: User[];
}

export default function UserListClient({ initialUsers }: UserListClientProps) {
  const {
    users,
    searchQuery,
    apiIsLoading,
    apiError,
    setUsers,
    setSearchQuery,
    fetchUsers
  } = useDashboardStore();

  useEffect(() => {
    if (initialUsers && initialUsers.length > 0) {
      setUsers(initialUsers);
    }
  }, [initialUsers, setUsers]);

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  if (apiIsLoading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  if (apiError) {
    return (
      <div className="error-container">
        <AlertCircle className="error-icon" size={48} />
        <h3 className="error-title">Something went wrong</h3>
        <p className="error-subtitle">{apiError}</p>
        <button onClick={() => fetchUsers()} className="retry-btn">
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
            >
              Clear
            </button>
          )}
        </div>
        
        <button 
          onClick={() => fetchUsers()} 
          className="refresh-btn" 
          title="Refresh Users"
        >
          <RefreshCw size={18} />
          <span>Refresh</span>
        </button>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="no-results">
          <p>No users found matching your search.</p>
        </div>
      ) : (
        <div className="user-grid">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
