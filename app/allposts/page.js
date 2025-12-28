"use client";

import { useEffect } from "react";
import {
  fetchPosts,
  selectAllPosts,
  selectPostsStatus,
  selectPostsPageInfo,
} from "../store/slices/postsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import dynamic from "next/dynamic";
const LoadMore = dynamic(() => import(`../components/loadMore/page`));
export default function Allpost() {
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
    <div className="py-10">
      {/* Use Redux-powered posts; no local state */}
      <LoadMore posts={posts} pageInfo={pageInfo} />
    </div>
  );
}
