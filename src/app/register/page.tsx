import RegisterPage from "@/features/register";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Register | BlogGo",
  description:
    "Discover insightful articles and engaging stories on BlogGo. Explore a diverse range of topics, from tech and lifestyle to education and more. Stay informed and inspired—your go-to platform for quality content. Start reading today!",
};

const Register = async () => {
  const session = await auth();

  if (session) return redirect("/");

  return <RegisterPage />;
};

export default Register;
