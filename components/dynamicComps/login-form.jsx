"use client";

// import { Form } from "../ui/form";

import CardWrapper from "./card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  // if user is logged in redirect to dashboard

  function handleChange(e) {
    const { name, value } = e.target;
    setUserInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      if (!userInfo.email || !userInfo.password) {
        setError("Please fill in all fields");
      } else {
        const res = await signIn("credentials", {
          ...userInfo,
          redirect: false,
        });
        console.log(res)

        if (res.error) {
          setError("Invalid email or password");
        } else {
          setSuccess("logged In successfully");
          toast({
            description:
              "fasten your seatbelt... you are being redirected to the dashboard",
          });
          router.replace("/private/dashboard");
        }
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      {/* <Form> */}
      <form onSubmit={handleSubmit}>
        <div className=" h-[200px] flex flex-col items-start justify-between">
          <label>Email</label>
          <Input
            name="email"
            value={userInfo.email}
            type="email"
            placeholder="johndoe@gmail.com"
            disabled={isPending}
            onChange={handleChange}
          />
          <label>password</label>
          <Input
            name="password"
            value={userInfo.password}
            type="password"
            placeholder="*******"
            disabled={isPending}
            onChange={handleChange}
          />
        </div>
        <FormError message={Error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full mt-6 ">
          {isPending ? "Logging In..." : "Login"}
        </Button>
        <p className="flex mt-5 items-center justify-center font-semibold text-slate-700">
          or Login with
        </p>
      </form>
      {/* </Form> */}
    </CardWrapper>
  );
}

export default LoginForm;
