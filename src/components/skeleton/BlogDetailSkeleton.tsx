import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BlogDetailSkeleton() {
  return (
    <main className="container mx-auto my-8 max-w-7xl px-4 sm:my-16 md:my-24 md:px-16">
      <article className="space-y-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-green-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Link>

        <header className="space-y-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-12 w-3/4 sm:h-14 md:h-16" />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-8 w-24" />
          </div>
        </header>

        <Skeleton className="aspect-video w-full rounded-lg" />

        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
        </div>
      </article>
    </main>
  );
}
