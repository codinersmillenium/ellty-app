import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { PostList } from "../../components/Post/PostList";
import { fetchAllPostsThunk } from "../../redux/posts/postSlice";
import { InputMath } from "../../components/InputMath";

interface PostState {
    posts: any[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: any;
}
interface RootState {
    posts: PostState;
}

export default function SecondTest() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchAllPostsThunk());
  }, [dispatch]);

  const [text, setText] = useState(0); 

  let content;

  if (loading === 'pending') {
    content = <div className="text-center text-blue-500 p-8">Loading calculation chains...</div>;
  } else if (loading === 'failed') {
    content = <div className="text-center text-red-600 p-8">Error fetching posts: {error?.message || "Check API connection."}</div>;
  } else if (loading === 'succeeded' && posts.length === 0) {
     content = <div className="text-center text-neutral-500 p-8">No calculation chains found. Be the first to start one!</div>;
  } else {
    content = <PostList posts={posts} />;
  }

  return (
    <>
      <PageMeta
        title="Second Test Assignment"
        description="Evaluating attentiveness and accuracy through task execution"
      />

      <ComponentCard title="Second Test Assignment">
        <InputMath value={text} onChange={(e: any) => setText(e.target.value)} />
        <div className="mt-6 border-t pt-6">
            {content}
        </div>
        
        
      </ComponentCard>
    </>
  );
}