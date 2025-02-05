"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

// Define interfaces for your data
interface User {
  name?: string | null;
  email?: string | null;
}

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  user: User;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: User;
}

export default function PostPage() {
  // Use the useParams hook to retrieve the dynamic post id
  const params = useParams() as { id: string };
  const { id } = params;
  const { data: session } = useSession();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function fetchPostAndComments() {
      try {
        const postRes = await fetch(`/api/forum/posts?id=${id}`);
        const commentsRes = await fetch(`/api/forum/comments?postId=${id}`);

        const postData = await postRes.json();
        const commentsData = await commentsRes.json();

        if (postData.success) setPost(postData.post);
        if (commentsData.success) setComments(commentsData.comments);
      } catch (err) {
        console.error("Error fetching post and comments:", err);
      }
    }

    if (id) {
      fetchPostAndComments();
    }
  }, [id]);

  async function handleCommentSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!session) return alert("You must be logged in to comment.");

    try {
      const res = await fetch("/api/forum/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment, postId: id }),
      });
      const data = await res.json();
      if (data.success) {
        setComments([...comments, data.comment]);
        setNewComment("");
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  }

  return (
    <div className="p-4">
      {post && (
        <>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="text-gray-600 text-sm">
            Posted by {post.user.name || post.user.email} on{" "}
            {new Date(post.createdAt).toLocaleString()}
          </p>
          <p>{post.content}</p>
        </>
      )}

      <h2 className="mt-6 text-xl font-semibold">Comments</h2>
      <div className="mt-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border p-3">
            <p className="text-gray-600 text-sm">
              {comment.user.name || comment.user.email} -{" "}
              {new Date(comment.createdAt).toLocaleString()}
            </p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>

      {session && (
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border"
            placeholder="Write a comment..."
            required
          />
          <button type="submit" className="bg-win95blue text-white px-4 py-2 mt-2">
            Comment
          </button>
        </form>
      )}
    </div>
  );
}
