import React from 'react';
import Link from 'next/link';
import { Mail, Briefcase, ArrowRight } from 'lucide-react';
import { User } from '@/types';

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <div className="user-avatar">
          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <h3 className="user-name">{user.name}</h3>
      </div>
      
      <div className="user-card-body">
        <div className="info-row">
          <Mail className="info-icon" size={16} />
          <span className="info-text">{user.email}</span>
        </div>
        <div className="info-row">
          <Briefcase className="info-icon" size={16} />
          <span className="info-text">{user.company.name}</span>
        </div>
      </div>
      
      <div className="user-card-footer">
        <Link href={`/users/${user.id}`} className="view-posts-btn">
          <span>View Posts</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
