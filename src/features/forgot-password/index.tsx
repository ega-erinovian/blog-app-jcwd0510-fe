"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useForgotPassword from "@/hooks/api/auth/useForgotPassword";
import { useFormik } from "formik";
import { ForgotPasswordSchema } from "./schemas";
import { Mail, Loader2 } from "lucide-react";
import Link from "next/link";

const ForgotPasswordPage = () => {
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      await forgotPassword(values);
    },
  });

  return (
    <main className="h-[calc(100vh-68px)] px-4">
      <div className="flex h-full items-center justify-center">
        <Card className="w-full max-w-md border-none shadow-lg sm:w-[450px]">
          <CardHeader className="space-y-2 pb-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white">
              <Mail className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Forgot Password
            </CardTitle>
            <p className="text-sm text-gray-500">
              Enter your email to reset your password
            </p>
          </CardHeader>

          <CardContent className="pb-8 pt-6">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      name="email"
                      placeholder="you@example.com"
                      type="email"
                      className="pl-10 focus-visible:ring-2"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {!!formik.touched.email && !!formik.errors.email && (
                    <p className="text-xs text-red-500">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gray-900 text-white transition-colors hover:bg-gray-800"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Remember your password?
                  </span>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-gray-900 transition-colors hover:text-green-600"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
