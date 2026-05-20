'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import { Post } from '@/types';
import { useDashboardStore } from '@/store/useDashboardStore';
import { postSchema } from '@/lib/validations/post';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftBody, setDraftBody] = useState('');
  const [editError, setEditError] = useState<string | null>(null);
  const [deleteConfirmPost, setDeleteConfirmPost] = useState<Post | null>(null);

  const { updateLocalPost, deleteLocalPost } = useDashboardStore();
  const postsPerPage = 5;

  const totalPosts = posts?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));
  const effectivePage = Math.min(currentPage, totalPages);

  const indexOfLastPost = effectivePage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = totalPosts > 0 ? posts.slice(indexOfFirstPost, indexOfLastPost) : [];

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const startEdit = (post: Post) => {
    setEditingPostId(post.id);
    setDraftTitle(post.title);
    setDraftBody(post.body);
    setEditError(null);
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditError(null);
  };

  const saveEdit = (post: Post) => {
    const parsed = postSchema.safeParse({ title: draftTitle, body: draftBody });
    if (!parsed.success) {
      setEditError(parsed.error.issues[0]?.message || 'Invalid post data');
      return;
    }

    updateLocalPost(post.userId, post.id, parsed.data.title, parsed.data.body);
    setEditingPostId(null);
    setEditError(null);
  };

  const requestDelete = (post: Post) => {
    setDeleteConfirmPost(post);
  };

  const cancelDelete = () => {
    setDeleteConfirmPost(null);
  };

  const confirmDelete = () => {
    if (!deleteConfirmPost) return;
    if (editingPostId === deleteConfirmPost.id) {
      cancelEdit();
    }
    deleteLocalPost(deleteConfirmPost.userId, deleteConfirmPost.id);
    setDeleteConfirmPost(null);
  };

  return (
    <div className="post-list-wrapper">
      {deleteConfirmPost && (
        <div className="modal-overlay" role="presentation">
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-label="Delete post confirmation"
          >
            <h4 className="modal-title">Delete post?</h4>
            <p className="modal-text">
              Are you sure you want to delete this post?
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="post-action-btn"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                className="post-action-btn post-action-danger"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="post-list-header">
        <h3 className="section-title">
          <FileText size={20} />
          <span>User Posts ({totalPosts})</span>
        </h3>
      </div>

      {totalPosts === 0 ? (
        <div className="no-posts">
          <p>No posts available for this user.</p>
        </div>
      ) : (
        <div className="post-grid">
          {currentPosts.map((post) => {
            const isLocal = post.id > 100000;
            const isEditing = editingPostId === post.id;
            return (
              <div key={post.id} className={`post-card ${isLocal ? 'local-post' : ''}`}>
                {isLocal && <span className="local-tag">Local Post</span>}

                {isEditing ? (
                  <div className="post-edit-form">
                    <input
                      type="text"
                      className="form-input"
                      value={draftTitle}
                      onChange={(e) => setDraftTitle(e.target.value)}
                      placeholder="Post title"
                      aria-label="Edit post title"
                    />
                    <textarea
                      rows={4}
                      className="form-input form-textarea"
                      value={draftBody}
                      onChange={(e) => setDraftBody(e.target.value)}
                      placeholder="Post body"
                      aria-label="Edit post body"
                    />

                    {editError && <div className="post-edit-error">{editError}</div>}

                    <div className="post-actions">
                      <button
                        type="button"
                        className="post-action-btn"
                        onClick={() => saveEdit(post)}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="post-action-btn"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4 className="post-title">{post.title}</h4>
                    <p className="post-body">{post.body}</p>

                    {isLocal && (
                      <div className="post-actions">
                        <button
                          type="button"
                          className="post-action-btn"
                          onClick={() => startEdit(post)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="post-action-btn post-action-danger"
                          onClick={() => requestDelete(post)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {totalPosts > 0 && totalPages > 1 && (
        <div className="pagination-container">
          <button
            onClick={handlePrevPage}
            disabled={effectivePage === 1}
            className="pagination-btn"
            title="Previous Page"
          >
            <ArrowLeft size={16} />
            <span>Previous</span>
          </button>
          
          <span className="pagination-info">
            Page {effectivePage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={effectivePage === totalPages}
            className="pagination-btn"
            title="Next Page"
          >
            <span>Next</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
