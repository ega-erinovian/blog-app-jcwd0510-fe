"use client";

import AuthGuard from "@/components/hoc/AuthGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateBlog from "@/hooks/api/blog/useCreateBlog";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { CreateBlogSchema } from "./schema";
import dynamic from "next/dynamic";
import { Pencil, ImagePlus, X } from "lucide-react";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

const WritePage = () => {
  const { mutateAsync: createBlog, isPending } = useCreateBlog();
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      content: "",
      thumbnail: null,
    },
    validationSchema: CreateBlogSchema,
    onSubmit: async (values) => {
      await createBlog(values);
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailReff = useRef<HTMLInputElement>(null);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("thumbnail", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeThumbnail = () => {
    formik.setFieldValue("thumbnail", null);
    setSelectedImage("");

    if (thumbnailReff.current) {
      thumbnailReff.current.value = "";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="container mx-auto max-w-4xl rounded-lg border bg-white px-4 py-6 shadow-sm sm:px-6">
        <div className="mb-6 flex items-center gap-2 border-b pb-4">
          <Pencil className="h-5 w-5 text-gray-600" />
          <h1 className="text-xl font-semibold text-gray-900">
            Create New Post
          </h1>
        </div>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="title"
                className="text-sm font-semibold text-gray-700"
              >
                Title
              </Label>
              <Input
                name="title"
                type="text"
                placeholder="Enter post title"
                className="focus-visible:ring-2"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {!!formik.touched.title && !!formik.errors.title && (
                <p className="text-xs text-red-500">{formik.errors.title}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="category"
                className="text-sm font-semibold text-gray-700"
              >
                Category
              </Label>
              <Input
                name="category"
                type="text"
                placeholder="Enter post category"
                className="focus-visible:ring-2"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {!!formik.touched.category && !!formik.errors.category && (
                <p className="text-xs text-red-500">{formik.errors.category}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label
              htmlFor="description"
              className="text-sm font-semibold text-gray-700"
            >
              Description
            </Label>
            <Textarea
              name="description"
              placeholder="Write a brief description of your post"
              className="min-h-[100px] focus-visible:ring-2"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ resize: "none" }}
            />
            {!!formik.touched.description && !!formik.errors.description && (
              <p className="text-xs text-red-500">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <RichTextEditor
              label="Content"
              value={formik.values.content}
              onChange={(value: string) =>
                formik.setFieldValue("content", value)
              }
              isTouch={formik.touched.content}
              setError={formik.setFieldError}
              setTouch={formik.setFieldTouched}
            />
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-semibold text-gray-700">
              Thumbnail
            </Label>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <div className="relative flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                  {selectedImage ? (
                    <>
                      <Image
                        src={selectedImage}
                        alt="thumbnail"
                        fill
                        className="rounded-lg object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2 z-10"
                        onClick={removeThumbnail}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div className="text-center">
                      <ImagePlus className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        No image selected
                      </p>
                    </div>
                  )}
                </div>
                <Input
                  ref={thumbnailReff}
                  type="file"
                  accept="image/*"
                  onChange={onChangeThumbnail}
                  className="h-full cursor-pointer py-0 ps-0 file:mr-4 file:cursor-pointer file:rounded-lg file:rounded-e-none file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-gray-800"
                />
                {!!formik.touched.thumbnail && !!formik.errors.thumbnail && (
                  <p className="text-xs text-red-500">
                    {formik.errors.thumbnail}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex h-fit justify-end border-t pt-6">
            <Button
              type="submit"
              disabled={isPending}
              className="min-w-[120px] bg-gray-900 hover:bg-gray-800"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Publish Post"
              )}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default WritePage;
