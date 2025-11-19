// client/src/api/postsApi.ts
import axios from 'axios';

export interface CreatePostDto {
  starting_numb: number;
  title?: string;
}

export interface Post {
    id: number;
    title: string | null;
    starting_numb: number;
    author_id: number;
    createdAt: Date;
    author: {
        id: number;
        username: string;
        createdAt: Date;
    };
    operation: any[];
}

export interface PostsState {
    posts: Post[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: any;
}

const BASE_URL = 'http://localhost:8080/api/v1'; 

export const createPostApi = async (
  token: string,
  body: CreatePostDto,
) => {
  const response = await axios.post(`${BASE_URL}/posts`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const fetchAllPostsApi = async () => {
  const response = await axios.get(`${BASE_URL}/posts`);
  return response.data.data;
};