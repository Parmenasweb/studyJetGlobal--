import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

function Social() {
  return (
    <div className="flex items-center w-full">
      <Button
        size="lg"
        className="w-full p-6 bg-slate-200"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          signIn("google", {
            callbackUrl: "/private/dashboard",
          });
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
}

export default Social;
