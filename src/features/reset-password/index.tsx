"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { FC } from "react";
import { ResetPasswordSchema } from "./schemas";
import useResetPassword from "@/hooks/api/auth/useResetPassword";
import { Button } from "@/components/ui/button";
import { Lock, Loader2 } from "lucide-react";

interface ResetPasswordPageProps {
  token: string;
}

const ResetPasswordPage: FC<ResetPasswordPageProps> = ({ token }) => {
  const { mutateAsync: resetPassword, isPending } = useResetPassword(token);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      await resetPassword(values);
    },
  });

  return (
    <main className="h-[calc(100vh-68px)] px-4">
      <div className="flex h-full items-center justify-center">
        <Card className="w-full max-w-md border-none shadow-lg sm:w-[450px]">
          <CardHeader className="space-y-2 pb-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white">
              <Lock className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <p className="text-sm text-gray-500">
              Please enter your new password
            </p>
          </CardHeader>

          <CardContent className="pb-8 pt-6">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      name="password"
                      type="password"
                      placeholder="Min 8 - 12 Characters"
                      className="focus-visible:ring-2"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {!!formik.touched.password && !!formik.errors.password && (
                      <p className="text-xs text-red-500">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      name="confirmPassword"
                      type="password"
                      placeholder="Min 8 - 12 Characters"
                      className="focus-visible:ring-2"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {!!formik.touched.confirmPassword &&
                      !!formik.errors.confirmPassword && (
                        <p className="text-xs text-red-500">
                          {formik.errors.confirmPassword}
                        </p>
                      )}
                  </div>
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
                    <span>Resetting...</span>
                  </div>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
