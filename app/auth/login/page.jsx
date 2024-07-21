import Link from "next/link";

import { auth, signIn } from "@/auth";
import { login } from "@/action/user";
import LoginForm from "@/components/dynamicComps/login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  const user = session?.user;
  if (user) {
    redirect("/private/dashboard");
  }
  return (
    <div className="flex items-center justify-center pt-24">
      <LoginForm />;
    </div>
  );
}

// "use client";

// import { Form } from "../ui/form";

// import CardWrapper from "./card-wrapper";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import FormError from "../form-error";
// import FormSuccess from "../form-success";
// import { useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { signIn, useSession } from "next-auth/react";
// import { useToast } from "@/components/ui/use-toast";

// function LoginForm() {
//   const router = useRouter();
//   const { toast } = useToast();
//   const [Error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isPending, startTransition] = useTransition();
//   const [userInfo, setUserInfo] = useState({
//     email: "",
//     password: "",
//   });

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setUserInfo((prev) => {
//       return {
//         ...prev,
//         [name]: value,
//       };
//     });
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     startTransition(async () => {
//       if (!userInfo.email || !userInfo.password) {
//         setError("Please fill in all fields");
//       } else {
//         const res = await signIn("credentials", {
//           ...userInfo,
//           redirect: false,
//         });

//         if (!res.ok) {
//           setError("Invalid email or password");
//         } else {
//           setSuccess("logged In successfully");
//           toast({
//             description:
//               "fasten your seatbelt... you are being redirected to the dashboard",
//           });
//           router.replace("/dashboard");
//         }
//       }
//     });
//   };

//
// }

// export default LoginForm;
