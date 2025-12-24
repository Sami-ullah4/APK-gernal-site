"use client";

// app/blog/page.js (CLIENT - uses Redux Toolkit state)
import LoadMore from "../components/loadMore/page";
import { useEffect } from "react";
import {
  fetchPosts,
  selectAllPosts,
  selectPostsStatus,
  selectPostsPageInfo,
} from "../store/slices/postsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function BlogPosts() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const status = useAppSelector(selectPostsStatus);
  const pageInfo = useAppSelector(selectPostsPageInfo);

  useEffect(() => {
    if (status === "idle" || posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, status, posts.length]);

  return (
    <div>
      {/* Use Redux-powered posts; no local state */}
      <LoadMore posts={posts} pageInfo={pageInfo} />
    </div>
  );
}
