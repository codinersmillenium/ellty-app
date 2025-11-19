
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createPostApi, fetchAllPostsApi, CreatePostDto, Post, PostsState } from '../../api/postsApi';

interface CreatePostThunkArgs extends CreatePostDto {
  token: string;
}

const initialState: PostsState = {
  posts: [],
  loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null,
};

export const createPostThunk = createAsyncThunk<
  Post,
  CreatePostThunkArgs,
  { rejectValue: any }
>(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const { token, ...body } = postData;
      const newPost = await createPostApi(token, body);
      return newPost;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to create post.');
    }
  }
);

export const fetchAllPostsThunk = createAsyncThunk<
  Post[],
  void,
  { rejectValue: any }
>(
  'posts/fetchAllPosts',
  async (_, { rejectWithValue }) => {
    try {
      const posts = await fetchAllPostsApi();
      return posts;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch posts.');
    }
  }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllPostsThunk.pending, (state) => { 
            state.loading = 'pending'; 
            state.error = null;
        })
        .addCase(fetchAllPostsThunk.fulfilled, (state, action: PayloadAction<Post[]>) => {
            state.loading = 'succeeded';
            state.posts = action.payload;
        })
        .addCase(fetchAllPostsThunk.rejected, (state, action) => { 
            state.loading = 'failed'; 
            state.error = action.payload;
        })
        .addCase(createPostThunk.fulfilled, (state, action: PayloadAction<Post>) => {
            state.posts.unshift(action.payload); 
        });
    },
});

export default postsSlice.reducer;