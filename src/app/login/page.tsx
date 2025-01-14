import LoginPage from "@/features/login";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login | BlogGo",
  description:
    "Discover insightful articles and engaging stories on BlogGo. Explore a diverse range of topics, from tech and lifestyle to education and more. Stay informed and inspired—your go-to platform for quality content. Start reading today!",
};

const Login = async () => {
  const session = await auth();

  if (session) return redirect("/");

  return <LoginPage />;
};

export default Login;
