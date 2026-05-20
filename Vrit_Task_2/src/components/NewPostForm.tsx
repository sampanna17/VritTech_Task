'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, CheckCircle } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { postSchema, PostFormData } from '@/lib/validations/post';

interface NewPostFormProps {
  userId: number;
}

export default function NewPostForm({ userId }: NewPostFormProps) {
  const { addPost } = useDashboardStore();
  const [successMessage, setSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      body: '',
    },
  });

  const onSubmit = (data: PostFormData) => {
    addPost(userId, data.title, data.body);
    reset();
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
    }, 4000);
  };

  return (
    <div className="new-post-form-container">
      <h3 className="form-title">
        <PlusCircle size={20} />
        <span>Create New Post</span>
      </h3>
      
      {successMessage && (
        <div className="success-banner">
          <CheckCircle size={18} />
          <span>Post added successfully and saved locally!</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="post-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            type="text"
            className={`form-input ${errors.title ? 'has-error' : ''}`}
            placeholder="Enter post title..."
            {...register('title')}
          />
          {errors.title && (
            <span className="error-text">{errors.title.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="body" className="form-label">
            Body
          </label>
          <textarea
            id="body"
            rows={4}
            className={`form-input form-textarea ${errors.body ? 'has-error' : ''}`}
            placeholder="Enter post body content..."
            {...register('body')}
          />
          {errors.body && (
            <span className="error-text">{errors.body.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-btn"
        >
          {isSubmitting ? 'Adding Post...' : 'Add Post'}
        </button>
      </form>
    </div>
  );
}
