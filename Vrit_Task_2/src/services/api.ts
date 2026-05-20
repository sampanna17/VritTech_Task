import { User, Post } from '@/types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  return res.json();
}

export async function getPostsForUser(userId: number): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}
