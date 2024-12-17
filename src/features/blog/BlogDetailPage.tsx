"use client";

import Markdown from "@/components/Markdown";
import { Badge } from "@/components/ui/badge";
import useDeleteBlog from "@/hooks/api/blog/useDeleteBlog";
import useGetBlog from "@/hooks/api/blog/useGetBlog";
import { useAppSelector } from "@/redux/hooks";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import ModalDelete from "./components/ModalDelete";
import SkeletonBlog from "./components/SkeletonBlog";
import { useSession } from "next-auth/react";

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

  if (isPendingGet) return <SkeletonBlog />;

  if (!data) {
    return <h1 className="text-center font-bold">No Data</h1>;
  }

  return (
    <main className="container mx-auto my-28 max-w-6xl px-4">
      <section className="space-y-4">
        <Link
          href="/"
          className="mb-8 flex max-w-fit items-center font-semibold underline underline-offset-2 hover:text-green-500"
        >
          Go Back
        </Link>
        <Badge>{data.category}</Badge>
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <div className="flex items-center justify-between gap-2">
          <p className="capitalize">
            {format(new Date(data.createdAt), "dd MMM yyyy")} - {data.user.name}
          </p>
          {Number(session.data?.user.id) === data.userId && (
            <ModalDelete
              onClick={onClickDeleteBlog}
              isPending={isPendingDelete}
            />
          )}
        </div>
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
