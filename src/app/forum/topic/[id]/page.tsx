"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import NewPostForm from "../../../components/NewPostForm";
import VoteButtons from "../../../components/VoteButtons";

// Define interfaces for proper typing
interface Vote {
  value: number;
  userId: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  user: {
    name?: string;
    email?: string;
  };
  votes?: Vote[];
}

export default function TopicPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [topicTitle, setTopicTitle] = useState("Loading...");
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const limit = 5; // Number of posts per page

  // Explicitly type params
  const params = useParams() as { id: string };
  const topicId = params.id;

  const router = useRouter();
  const { data: session } = useSession();

  // Wrap fetchPosts in useCallback to stabilize its reference.
  const fetchPosts = useCallback(async () => {
    setLoadingPosts(true);
    try {
      const res = await fetch(
        `/api/forum/posts?topicId=${topicId}&page=${page}&limit=${limit}`
      );
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts || []);
        setTotalPosts(data.totalPosts || 0);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoadingPosts(false);
    }
  }, [topicId, page, limit]);

  useEffect(() => {
    if (topicId) {
      fetchPosts();
    }
  }, [fetchPosts, topicId, page]);

  useEffect(() => {
    async function fetchTopic() {
      try {
        const res = await fetch(`/api/forum/topics/${topicId}`);
        if (!res.ok)
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        const data = await res.json();
        if (data.success && data.topic) {
          setTopicTitle(data.topic.title);
        } else {
          setTopicTitle("Unknown Topic");
        }
      } catch (error) {
        console.error("Error fetching topic:", error);
        setTopicTitle("Unknown Topic");
      }
    }
    if (topicId) fetchTopic();
  }, [topicId]);

  const totalPages = Math.ceil(totalPosts / limit);

  return (
    // Added pb-12 to account for the global footer.
    <div className="p-4 pb-12 bg-win95background min-h-screen">
      {/* Header with Back Button and Dynamic Topic Title */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => router.push("/forum")}
          className="mr-4 px-2 py-1 bg-win95blue text-white border border-black hover:bg-win95blue-dark"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.7)]">
          {topicTitle}
        </h1>
      </div>

      {/* New Post Form with callback to refresh posts */}
      <NewPostForm topicId={topicId} onPostCreated={fetchPosts} />

      {/* Posts Listing */}
      <div className="mt-8 space-y-4">
        {loadingPosts ? (
          <p className="text-white">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-white">No posts yet. Be the first to post!</p>
        ) : (
          posts.map((post) => {
            const initialCount =
              post.votes?.reduce((acc: number, vote: Vote) => acc + vote.value, 0) || 0;
            const currentUserId = session?.user.id;
            const voteForUser = post.votes?.find(
              (vote: Vote) => vote.userId === currentUserId
            );
            const initialVote = voteForUser ? voteForUser.value : 0;

            return (
              <div
                key={post.id}
                className="bg-white border border-black p-4 shadow-md"
              >
                <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  Posted by {post.user.name || post.user.email} on{" "}
                  {new Date(post.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-800">{post.content}</p>
                <VoteButtons
                  postId={post.id}
                  initialVote={initialVote}
                  initialCount={initialCount}
                />
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-win95blue text-white border border-black disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-win95blue text-white border border-black disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
