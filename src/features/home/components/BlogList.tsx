"use client";

import useGetBlogs from "@/hooks/api/blog/useGetBlogs";
import BlogCard from "./BlogCard";
import { useState } from "react";
import PaginationSection from "@/components/PaginationSection";

const BlogList = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isPending } = useGetBlogs({ page });

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
      <div className="grid grid-cols-3 gap-4 py-16">
        {data.data.map((blog, idx) => (
          <BlogCard key={idx} blog={blog} />
        ))}
      </div>
      <PaginationSection
        onChangePage={onChangePage}
        page={page}
        take={data.meta.take}
        total={data.meta.total}
      />
    </>
  );
};

export default BlogList;
