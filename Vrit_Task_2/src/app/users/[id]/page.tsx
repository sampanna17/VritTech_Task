'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, User as UserIcon, Mail, Briefcase, AlertCircle, RefreshCw } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import LoadingSpinner from '@/components/LoadingSpinner';
import NewPostForm from '@/components/NewPostForm';
import PostList from '@/components/PostList';

interface UserPostsPageProps {
  params: Promise<{ id: string }>;
}

export default function UserPostsPage({ params }: UserPostsPageProps) {
  const { id } = React.use(params);
  const userId = parseInt(id, 10);

  const {
    users,
    posts,
    apiIsLoading,
    apiError,
    fetchUsers,
    fetchPostsForUser,
  } = useDashboardStore();

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
    if (userId) {
      fetchPostsForUser(userId);
    }
  }, [userId, users.length, fetchUsers, fetchPostsForUser]);

  const user = users.find((u) => u.id === userId);
  const userPosts = posts[userId] || [];

  const isPageLoading = apiIsLoading && (userPosts.length === 0 || !user);

  if (isPageLoading) {
    return <LoadingSpinner message="Loading posts..." />;
  }

  if (apiError && !user) {
    return (
      <div className="page-boundary-container">
        <div className="error-container">
          <AlertCircle className="error-icon" size={48} />
          <h3 className="error-title">Something went wrong</h3>
          <p className="error-subtitle">{apiError}</p>
          <button 
            onClick={() => {
              if (users.length === 0) fetchUsers();
              fetchPostsForUser(userId);
            }} 
            className="retry-btn"
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-page-container">
      <div className="back-nav">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {user ? (
        <div className="user-profile-summary">
          <div className="profile-avatar">
            <UserIcon size={32} />
          </div>
          <div className="profile-details">
            <h1 className="profile-name">{user.name}</h1>
            <div className="profile-meta">
              <span className="meta-item">
                <Mail size={14} />
                <span>{user.email}</span>
              </span>
              <span className="meta-item">
                <Briefcase size={14} />
                <span>{user.company.name}</span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="user-profile-summary loading-profile">
          <p>User profile details not found.</p>
        </div>
      )}

      <div className="posts-layout-grid">
        <div className="form-column">
          <NewPostForm userId={userId} />
        </div>
        <div className="list-column">
          {apiIsLoading && userPosts.length > 0 ? (
            <div className="loading-posts-overlay">
              <LoadingSpinner message="Loading posts..." />
            </div>
          ) : (
            <PostList posts={userPosts} />
          )}
        </div>
      </div>
    </div>
  );
}
