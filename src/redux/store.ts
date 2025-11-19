// client/src/redux/store.ts (Contoh)
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts/postSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;