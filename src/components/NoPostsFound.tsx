import React from "react";
import { BookOpen, PenLine } from "lucide-react";

const NoPosts = () => {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center p-8 shadow-sm">
      <div className="relative mb-6">
        <BookOpen className="h-16 w-16 text-gray-200" />
        <div className="absolute -right-2 -top-2 rounded-full bg-white p-2 shadow-md">
          <PenLine className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      <h1 className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
        No Stories Yet
      </h1>

      <div className="mt-4 max-w-md text-center">
        <p className="text-gray-500">
          The journey of a thousand posts begins with a single word. Start
          writing your story today.
        </p>
      </div>

      <div className="mt-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-gray-800 px-6 py-2 text-sm text-white transition-all hover:bg-gray-700">
          <PenLine className="h-4 w-4" />
          <span>Create Your First Post</span>
        </div>
      </div>
    </div>
  );
};

export default NoPosts;
