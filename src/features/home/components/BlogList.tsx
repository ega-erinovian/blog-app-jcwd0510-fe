"use client";

import PaginationSection from "@/components/PaginationSection";
import useGetBlogs from "@/hooks/api/blog/useGetBlogs";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import BlogCard from "./BlogCard";
import { SearchInput } from "./SearchInput";
import { BlogCardSkeleton } from "@/components/skeleton/BlogCardSkeleton";
import NoPosts from "@/components/NoPostsFound";

const BlogList = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debouncedValue] = useDebounceValue(search, 500);

  const { data, isPending } = useGetBlogs({
    page,
    search: debouncedValue,
    take: 12,
  });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const onSearch = (search: string) => {
    setPage(1);
    setSearch(search);
  };

  return (
    <div className="py-12">
      <SearchInput onSearch={onSearch} />
      {isPending && <BlogCardSkeleton />}

      {!data?.data.length && !isPending && <NoPosts />}

      {!!data && !!data?.data.length && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.data.map((blog) => {
              return (
                <Link href={`/blogs/${blog.id}`} key={blog.id}>
                  <BlogCard blog={blog} />
                </Link>
              );
            })}
          </div>
        </>
      )}
      {!!data?.data.length && !isPending && (
        <PaginationSection
          onPageChange={onChangePage}
          currentPage={page}
          itemsPerPage={data?.meta.take || 0}
          totalItems={data?.meta.total || 0}
        />
      )}
    </div>
  );
};

export default BlogList;
