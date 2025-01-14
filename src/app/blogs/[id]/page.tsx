import BlogDetailPage from "@/features/blog/BlogDetailPage";
import useGetBlog from "@/hooks/api/blog/useGetBlog";
import { axiosInstance } from "@/lib/axios";
import { Blog } from "@/types/blog";
import { Metadata, ResolvingMetadata } from "next";

export const generateMetadata = async (
  { params }: { params: { id: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  try {
    const response = await axiosInstance.get<Blog>(`/blogs/${params.id}`);
    const blog = response.data;

    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: blog ? `${blog.title} | BlogGo` : "Blog Not Found | BlogGo",
      description: blog ? `${blog.description}` : "Blog Not Found | BlogGo",
      openGraph: {
        images: blog?.thumbnail
          ? [blog.thumbnail, ...previousImages]
          : previousImages,
      },
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);

    return {
      title: "BlogGo | Blog Not Found",
      openGraph: {
        images: [],
      },
    };
  }
};

const BlogDetail = ({ params }: { params: { id: string } }) => {
  return <BlogDetailPage blogId={Number(params.id)} />;
};

export default BlogDetail;
