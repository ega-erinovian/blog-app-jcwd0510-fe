import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Blog } from "@/types/blog";
import Image from "next/image";
import { FC } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-700 hover:bg-green-200"
          >
            {blog.category}
          </Badge>
          <Badge variant="outline" className="text-sm text-gray-600">
            {format(blog.createdAt, "dd MMM yyyy")}
          </Badge>
        </div>
        <h2 className="line-clamp-2 text-lg font-bold sm:text-xl">
          {blog.title}
        </h2>
        <p className="line-clamp-3 text-sm text-gray-600 sm:text-base">
          {blog.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center gap-2 p-4 sm:p-6">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{blog.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{blog.user.name}</span>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
