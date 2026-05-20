'use client';

import React from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="page-boundary-container">
      <LoadingSpinner message="Loading users..." />
    </div>
  );
}
