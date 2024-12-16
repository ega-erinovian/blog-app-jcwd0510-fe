"use client";

import { Badge } from "@/components/ui/badge";
import useGetBlog from "@/hooks/api/blog/useGetBlog";
import { format } from "date-fns";
import Image from "next/image";
import { FC } from "react";
import SkeletonBlog from "./components/SkeletonBlog";
import Markdown from "@/components/Markdown";

interface BlogDetailPageProps {
  blogId: number;
}

const BlogDetailPage: FC<BlogDetailPageProps> = ({ blogId }) => {
  const { data, isPending } = useGetBlog(blogId);

  if (isPending) return <SkeletonBlog />;

  if (!data) {
    return <h1 className="text-center font-bold">No Data</h1>;
  }

  return (
    <main className="container mx-auto my-28 max-w-6xl px-4">
      <section className="space-y-4">
        <Badge>{data.category}</Badge>
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <p className="capitalize">
          {format(new Date(data.createdAt), "dd MMM yyyy")} - {data.user.name}
        </p>
        <div className="relative h-[400px]">
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>
      </section>
      <Markdown content={data.content} />
    </main>
  );
};

export default BlogDetailPage;
