"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const Navbar = () => {
  const router = useRouter();

  const { data } = useSession(); // dari next-auth

  const user = data?.user;

  const logout = () => {
    // Logout pakai next-auth
    signOut();
  };

  const navItems = [
    { label: "Home", href: "/" },
    // { label: "Profile", href: "/profile" },
    ...(user?.id
      ? [
          { label: "Write", href: "/write" },
          { label: "Logout", onClick: logout },
        ]
      : [{ label: "Sign in", onClick: () => router.push("/login") }]),
  ];

  return (
    <nav className="sticky top-0 z-10 bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-800 dark:text-white"
          >
            Blog
            <span className="text-green-600">Go</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item, index) =>
              item.href ? (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm font-semibold text-gray-600 transition-colors hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
                >
                  {item.label}
                </Link>
              ) : (
                <Button
                  key={index}
                  onClick={item.onClick}
                  className="font-semibold"
                >
                  {item.label}
                </Button>
              ),
            )}
          </div>

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-20 w-56">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {navItems.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="w-full cursor-pointer font-medium"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <Button
                        onClick={item.onClick}
                        variant="ghost"
                        className="w-full justify-start font-medium"
                      >
                        {item.label}
                      </Button>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
