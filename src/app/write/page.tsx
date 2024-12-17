import AuthGuard from "@/components/hoc/AuthGuard";
import WritePage from "@/features/write";

const Write = async () => {
  return <WritePage />;
};

export default AuthGuard(Write); // AuthGurad to protecting route
