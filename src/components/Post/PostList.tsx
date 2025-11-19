import { PostCard } from "./PostCard";

interface PostListProps {
  posts: Array<{
     id: number;
    author: {
      username: string;
    }
    avatar: string;
    title: string;
    createdAt: string;
    starting_numb: number;
  }>;
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="overflow-auto max-h-80 space-y-4">
      {posts.map((p) => (
        <PostCard key={p.id} {...p} />
      ))}
    </div>
  );
}