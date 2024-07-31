import Image from "next/image";
import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
function NavBar() {
  return (
    <div className="flex justify-between p-3 px-10 border-b-[1px] shadow-sm">
      <div className="flex gap-10 item-center">
        <Image src="/logo.png" alt="Logo" width={120} height={60} />
        <div className="hidden md:flex gap-6">
          <h2 className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">Home</h2>
          <h2 className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">History</h2>
          <h2 className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">Help</h2>
        </div>
      </div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

export default NavBar;
