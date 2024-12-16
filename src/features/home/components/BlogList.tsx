"use client";

import useGetBlogs from "@/hooks/api/blog/useGetBlogs";
import BlogCard from "./BlogCard";
import { useState } from "react";
import PaginationSection from "@/components/PaginationSection";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";

const BlogList = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedValue] = useDebounceValue(search, 500);

  const { data, isPending } = useGetBlogs({ page, search: debouncedValue });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  if (isPending) {
    return <h1 className="text-center font-bold">Loading...</h1>;
  }

  if (!data) {
    return <h1 className="text-center font-bold">No Data</h1>;
  }

  return (
    <>
      <Input
        className="mx-auto my-8 w-full"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      {isPending && <h1 className="text-center font-bold">Loading...</h1>}

      {!data?.data.length ? (
        <h1 className="text-center font-bold">No Data</h1>
      ) : (
        <>
          <div className="grid gap-4 py-16 md:grid-cols-3">
            {data.data.map((blog, idx) => (
              <Link href={`/blogs/${blog.id}`} key={idx}>
                <BlogCard blog={blog} />
              </Link>
            ))}
          </div>
          <PaginationSection
            onChangePage={onChangePage}
            page={page}
            take={data.meta.take}
            total={data.meta.total}
          />
        </>
      )}
    </>
  );
};

export default BlogList;
