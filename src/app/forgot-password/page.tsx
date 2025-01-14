import ForgotPasswordPage from "@/features/forgot-password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | BlogGo",
  description:
    "Discover insightful articles and engaging stories on BlogGo. Explore a diverse range of topics, from tech and lifestyle to education and more. Stay informed and inspired—your go-to platform for quality content. Start reading today!",
};

const ForgotPassword = () => {
  return <ForgotPasswordPage />;
};

export default ForgotPassword;
