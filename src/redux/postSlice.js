import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    fetchedPosts: [],
    page: 0,
    hasMorePosts: true,
    arePostsLoading: true,
  },
  reducers: {
    setFetchedPosts: (state, action) => {
      state.fetchedPosts = [...state.fetchedPosts, ...action.payload];
    },
    incrementPage: (state) => {
      state.page++;
    },
    setHasMorePosts: (state, action) => {
      state.hasMorePosts = action.payload;
    },
    likePost: (state, action) => {
      const post = state.fetchedPosts.find(
        (post) => post.id === action.payload.postId
      );
      post.likes = action.payload.likes;
      post.isLiked = action.payload.isLiked;
    },
    setArePostsLoading: (state, action) => {
      state.arePostsLoading = action.payload;
    },
    setIsLikeLoading: (state, action) => {
      state.fetchedPosts[
        state.fetchedPosts.findIndex(({ id }) => id === action.payload.postId)
      ].isLikeLoading = action.payload.isLikeLoading;
    },
    cleanupPosts: (state) => {
      state.fetchedPosts = [];
      state.page = 0;
      state.hasMorePosts = true;
      state.arePostsLoading = true;
    },
  },
});

// fetch many posts
export const sendFetchPostsReq = (page, limit, signal) => async (dispatch) => {
  dispatch(setArePostsLoading(true));
  try {
    const res = await fetch(`/api/posts?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      signal,
    });
    const posts = await res.json();
    dispatch(setArePostsLoading(false));
    if (posts.length === 0) {
      dispatch(setHasMorePosts(false));
      return;
    }
    dispatch(setFetchedPosts(posts));
    dispatch(incrementPage());
  } catch (error) {
    console.log(error.message);
  }
};

export const sendLikePutReq = (postId) => async (dispatch, getState) => {
  try {
    dispatch(setIsLikeLoading({ postId, isLikeLoading: true }));
    const res = await fetch(
      `/api/posts/${postId}/likes/${getState().profile.id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    const { likes, isLiked } = await res.json();
    dispatch(setIsLikeLoading({ postId, isLikeLoading: false }));
    dispatch(likePost({ postId, likes, isLiked }));
  } catch (error) {
    console.log(error.message);
    dispatch(setIsLikeLoading({ postId, isLikeLoading: false }));
  }
};

export const {
  setFetchedPosts,
  incrementPage,
  setHasMorePosts,
  likePost,
  setArePostsLoading,
  setIsLikeLoading,
  cleanupPosts,
} = postSlice.actions;

export default postSlice.reducer;
