import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPostsApi } from "../../services/postsService";

const initialState = {
  items: [],
  pageInfo: {
    endCursor: null,
    hasNextPage: false,
  },
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const posts = await fetchPostsApi();
      return posts;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "Failed to fetch posts"
      );
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Used by client components (e.g. LoadMore) to persist appended posts
    setPostsFromClient(state, action) {
      const { nodes, pageInfo } = action.payload || {};
      state.items = nodes || [];
      state.pageInfo =
        pageInfo ?? {
          endCursor: null,
          hasNextPage: false,
        };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        if (state.status === "idle") {
          state.status = "loading";
        }
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload?.nodes || [];
        state.pageInfo =
          action.payload?.pageInfo ?? {
            endCursor: null,
            hasNextPage: false,
          };
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch posts";
      });
  },
});

export const selectAllPosts = (state) => state.posts.items;
export const selectPostsPageInfo = (state) => state.posts.pageInfo;
export const { setPostsFromClient } = postsSlice.actions;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectPostBySlug = (state, slug) =>
  state.posts.items.find((post) => post.slug === slug);

export default postsSlice.reducer;


