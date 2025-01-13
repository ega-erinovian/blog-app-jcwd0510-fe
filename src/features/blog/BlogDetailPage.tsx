"use client";

import Markdown from "@/components/Markdown";
import { Badge } from "@/components/ui/badge";
import useDeleteBlog from "@/hooks/api/blog/useDeleteBlog";
import useGetBlog from "@/hooks/api/blog/useGetBlog";
import { useAppSelector } from "@/redux/hooks";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import ModalDelete from "./components/ModalDelete";
import { BlogDetailSkeleton } from "@/components/skeleton/BlogDetailSkeleton";
import PostNotFound from "@/components/PostNotFound";

interface BlogDetailPageProps {
  blogId: number;
}

const BlogDetailPage: FC<BlogDetailPageProps> = ({ blogId }) => {
  const { data, isPending: isPendingGet } = useGetBlog(blogId);
  const session = useSession();

  const { mutateAsync: deleteBlog, isPending: isPendingDelete } =
    useDeleteBlog();

  const onClickDeleteBlog = async () => {
    await deleteBlog(blogId);
  };

  if (isPendingGet) return <BlogDetailSkeleton />;

  if (!data) {
    return <PostNotFound />;
  }

  return (
    <main className="container mx-auto my-8 max-w-7xl px-4 md:my-12 md:px-16">
      <article className="space-y-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-green-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Link>

        <header className="space-y-4">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            {data.category}
          </Badge>
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            {data.title}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
            <p className="capitalize">
              {format(new Date(data.createdAt), "dd MMM yyyy")} -{" "}
              {data.user.name}
            </p>
            {Number(session.data?.user.id) === data.userId && (
              <ModalDelete
                onClick={onClickDeleteBlog}
                isPending={isPendingDelete}
              />
            )}
          </div>
        </header>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <Markdown content={data.content} />
        </div>
      </article>
    </main>
  );
};

export default BlogDetailPage;
