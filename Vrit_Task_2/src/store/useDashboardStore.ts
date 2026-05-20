import { create } from 'zustand';
import { User, Post } from '@/types';
import { getUsers, getPostsForUser } from '@/services/api';

interface DashboardState {
  users: User[];
  posts: Record<number, Post[]>;
  apiIsLoading: boolean;
  apiError: string | null;
  searchQuery: string;
  
  setUsers: (users: User[]) => void;
  setSearchQuery: (query: string) => void;
  fetchUsers: () => Promise<void>;
  fetchPostsForUser: (userId: number) => Promise<void>;
  addPost: (userId: number, title: string, body: string) => void;
  updateLocalPost: (userId: number, postId: number, title: string, body: string) => void;
  deleteLocalPost: (userId: number, postId: number) => void;
  clearError: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  users: [],
  posts: {},
  apiIsLoading: false,
  apiError: null,
  searchQuery: '',

  // Helpers (local posts are stored per-user in localStorage)
  // Note: Date.now() IDs are used for local posts, so they are typically > 100000.
  // This is used as a lightweight guard to avoid editing/deleting API posts.
  // (UI already only shows actions for local posts.)
  

  setUsers: (users) => set({ users, apiError: null }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),

  clearError: () => set({ apiError: null }),

  fetchUsers: async () => {
    set({ apiIsLoading: true, apiError: null });
    try {
      const data = await getUsers();
      set({ users: data, apiIsLoading: false });
    } catch (error: any) {
      set({ 
        apiIsLoading: false, 
        apiError: error.message || 'Something went wrong' 
      });
    }
  },

  fetchPostsForUser: async (userId) => {
    set({ apiIsLoading: true, apiError: null });
    try {
      const apiPosts = await getPostsForUser(userId);

      let localPosts: Post[] = [];
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(`local_posts_${userId}`);
        if (stored) {
          try {
            localPosts = JSON.parse(stored);
          } catch (e) {
            console.error('Failed to parse local posts from localStorage:', e);
          }
        }
      }

      const mergedPosts = [...localPosts, ...apiPosts];

      set((state) => ({
        posts: {
          ...state.posts,
          [userId]: mergedPosts,
        },
        apiIsLoading: false,
      }));
    } catch (error: any) {
      set({ 
        apiIsLoading: false, 
        apiError: error.message || 'Something went wrong' 
      });
    }
  },

  addPost: (userId, title, body) => {
    const newPost: Post = {
      userId,
      id: Date.now(),
      title,
      body,
    };

    if (typeof window !== 'undefined') {
      let localPosts: Post[] = [];
      const stored = localStorage.getItem(`local_posts_${userId}`);
      if (stored) {
        try {
          localPosts = JSON.parse(stored);
        } catch (e) {
          console.error(e);
        }
      }
      const updatedLocalPosts = [newPost, ...localPosts];
      localStorage.setItem(`local_posts_${userId}`, JSON.stringify(updatedLocalPosts));
    }

    set((state) => {
      const userPosts = state.posts[userId] || [];
      return {
        posts: {
          ...state.posts,
          [userId]: [newPost, ...userPosts],
        },
      };
    });
  },

  updateLocalPost: (userId, postId, title, body) => {
    if (postId <= 100000) return;

    if (typeof window !== 'undefined') {
      let localPosts: Post[] = [];
      const stored = localStorage.getItem(`local_posts_${userId}`);
      if (stored) {
        try {
          localPosts = JSON.parse(stored);
        } catch (e) {
          console.error(e);
        }
      }

      const updatedLocalPosts = localPosts.map((post) =>
        post.id === postId ? { ...post, title, body } : post
      );
      localStorage.setItem(`local_posts_${userId}`, JSON.stringify(updatedLocalPosts));
    }

    set((state) => {
      const userPosts = state.posts[userId] || [];
      return {
        posts: {
          ...state.posts,
          [userId]: userPosts.map((post) =>
            post.id === postId ? { ...post, title, body } : post
          ),
        },
      };
    });
  },

  deleteLocalPost: (userId, postId) => {
    if (postId <= 100000) return;

    if (typeof window !== 'undefined') {
      let localPosts: Post[] = [];
      const stored = localStorage.getItem(`local_posts_${userId}`);
      if (stored) {
        try {
          localPosts = JSON.parse(stored);
        } catch (e) {
          console.error(e);
        }
      }

      const updatedLocalPosts = localPosts.filter((post) => post.id !== postId);
      localStorage.setItem(`local_posts_${userId}`, JSON.stringify(updatedLocalPosts));
    }

    set((state) => {
      const userPosts = state.posts[userId] || [];
      return {
        posts: {
          ...state.posts,
          [userId]: userPosts.filter((post) => post.id !== postId),
        },
      };
    });
  },
}));
