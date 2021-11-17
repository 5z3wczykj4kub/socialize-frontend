import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useSelector, useDispatch } from 'react-redux';
import { fetchDetailedPost, setIsLoading } from '../../redux/detailedPostSlice';

import SkeletonPost from '../../components/Post/SkeletonPost/SkeletonPost';
import Post from '../../components/Post/Post';

import useCloseLikeDrawerOnPageLeave from '../../hooks/useCloseLikeDrawerOnPageLeave';

import classes from './DetailedPost.module.scss';

function DetailedPost() {
  const { fetchedPosts } = useSelector(({ post }) => post);
  const { isLoading } = useSelector(({ detailedPost }) => detailedPost);
  const dispatch = useDispatch();

  const { postId } = useParams();

  useEffect(() => {
    // determine whether selected post is already in redux store
    if (!fetchedPosts.find(({ id }) => id === postId)) {
      dispatch(fetchDetailedPost(postId));
      return;
    }
    dispatch(setIsLoading(false));
  }, [dispatch, fetchedPosts, postId]);

  useCloseLikeDrawerOnPageLeave();

  return !isLoading ? (
    <Post className={classes.detailedPost} id={postId} showComments />
  ) : (
    <SkeletonPost className={classes.skeletonPost} />
  );
}

export default DetailedPost;