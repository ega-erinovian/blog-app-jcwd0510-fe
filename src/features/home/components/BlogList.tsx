"use client";

import useGetBlogs from "@/hooks/api/blog/useGetBlogs";
import BlogCard from "./BlogCard";
import { useState } from "react";
import PaginationSection from "@/components/PaginationSection";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import { parseAsInteger, useQueryState } from "nuqs";

const BlogList = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debouncedValue] = useDebounceValue(search, 500);

  const { data, isPending } = useGetBlogs({ page, search: debouncedValue });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <Input
        className="mx-auto my-8 w-full"
        placeholder="Search..."
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        value={search}
      />

      {isPending && (
        <div className="flex h-[30vh] items-center justify-center">
          <h1 className="text-center">Loading...</h1>
        </div>
      )}

      {!data?.data.length && !isPending && (
        <div className="flex h-[30vh] items-center justify-center">
          <h1 className="text-center">No Data</h1>
        </div>
      )}

      {!!data && !!data?.data.length && (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            {data.data.map((blog) => {
              return <BlogCard key={blog.id} blog={blog} />;
            })}
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
