import React from "react";
import { SearchX, ArrowLeft } from "lucide-react";

const PostNotFound = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="rounded-full bg-red-50 p-4">
              <SearchX className="h-12 w-12 text-red-400" />
            </div>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Post Not Found
          </h1>

          <p className="mb-8 text-gray-600">
            The post you're looking for might have been removed, renamed, or
            doesn't exist. Please check the URL or go back to browse other
            stories.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>

            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Browse All Posts
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostNotFound;
