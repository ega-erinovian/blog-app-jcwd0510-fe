"use client";

import { Badge } from "@/components/ui/badge";
import useGetBlog from "@/hooks/api/blog/useGetBlog";
import { format } from "date-fns";
import Image from "next/image";
import { FC } from "react";
import SkeletonBlog from "./components/SkeletonBlog";
import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Trash2 } from "lucide-react";
import ModalDelete from "./components/ModalDelete";
import useDeleteBlog from "@/hooks/api/blog/useDeleteBlog";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

interface BlogDetailPageProps {
  blogId: number;
}

const BlogDetailPage: FC<BlogDetailPageProps> = ({ blogId }) => {
  const { data, isPending: isPendingGet } = useGetBlog(blogId);

  const { mutateAsync: deleteBlog, isPending: isPendingDelete } =
    useDeleteBlog();

  const { id } = useAppSelector((state) => state.user);

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
          {id === data.userId && <ModalDelete onClick={onClickDeleteBlog} />}
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
