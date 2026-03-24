"use client";

import Link from "next/link";
import { useUserAuth } from "../contexts/AuthContext";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("GitHub Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full border border-gray-200 text-center">
        {!user ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to Week 9
            </h1>
            <p className="text-gray-600 mb-6">
              Please sign in with GitHub to continue.
            </p>

            <button
              onClick={handleLogin}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 rounded-lg shadow transition"
            >
              Login with GitHub
            </button>
          </>
        ) : (
          <>
            {/* User Info Card */}
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {user.displayName}
            </h1>

            <p className="text-gray-600 mt-1">{user.email}</p>

            <button
              onClick={handleLogout}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg shadow transition"
            >
              Log Out
            </button>

            <div className="mt-6">
              <Link
                href="/week-9/shopping-list"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition font-semibold"
              >
                Go to Shopping List
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
