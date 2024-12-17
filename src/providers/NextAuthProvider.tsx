import { FC, PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "inspector/promises";

const NextAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
