'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('App-level error caught:', error);
  }, [error]);

  return (
    <div className="page-boundary-container">
      <div className="error-container">
        <AlertCircle className="error-icon" size={48} />
        <h3 className="error-title">Something went wrong</h3>
        <p className="error-subtitle">
          {error.message || 'An unexpected error occurred while loading data.'}
        </p>
        <button onClick={reset} className="retry-btn">
          <RefreshCw size={16} />
          <span>Retry Page Load</span>
        </button>
      </div>
    </div>
  );
}
