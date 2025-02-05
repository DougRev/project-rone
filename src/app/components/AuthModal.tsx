// src/app/components/AuthModal.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting sign-up with:", { name, email, password });


    if (isSignUp) {
      // Sign-up flow: call the sign-up API endpoint.
      try {
        const res = await axios.post("/api/signup", { name, email, password });
        if (res.data.success) {
          // Optionally sign the user in after successful sign up.
          const signInResult = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });
          if (!signInResult?.error) {
            onClose();
          }
        } else {
          setError(res.data.error || "Sign up failed.");
        }
      } catch (err) {
        console.error(err);
        setError("Sign up failed.");
      }
    } else {
      // Sign-in flow using credentials.
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        setError("Invalid credentials");
      } else {
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 border border-black w-80">
        <h2 className="text-lg font-bold mb-4">{isSignUp ? "Create Account" : "Login"}</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <label className="block mb-2">
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-1 mt-1"
                required
              />
            </label>
          )}
          <label className="block mb-2">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-1 mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-1 mt-1"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full bg-win95blue text-white py-1 mt-2 border border-black"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        {/* Show Google OAuth option when not in sign-up mode */}
        {!isSignUp && (
          <div className="mt-2 text-center">
            <button
              onClick={() => signIn("google")}
              className="w-full bg-red-500 text-white py-1 mt-2 border border-black"
            >
              Sign in with Google
            </button>
          </div>
        )}
        <div className="mt-2 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm underline"
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
        <div className="mt-2 text-center">
          <button onClick={onClose} className="text-sm underline">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
