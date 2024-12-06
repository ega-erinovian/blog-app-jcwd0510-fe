import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <Link href="/" className="text-xl font-bold">
            Logo
          </Link>
          <div className="itemx-center flex gap-8 font-medium">
            <Link href="/">Home</Link>
            <Link href="/profile">Profile</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
