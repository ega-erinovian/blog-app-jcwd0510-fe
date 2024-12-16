import { Skeleton } from "@/components/ui/skeleton";

const SkeletonBlog = () => {
  return (
    <main className="container mx-auto my-28 max-w-6xl px-4">
      <section className="space-y-2">
        <Skeleton className="h-[22px] w-[50px] rounded-sm" />
        <Skeleton className="h-[22px] w-[400px] rounded-sm" />
        <Skeleton className="h-[22px] w-[100px] rounded-sm" />
        <Skeleton className="h-[400px] rounded-sm" />
      </section>
    </main>
  );
};

export default SkeletonBlog;
