"use client";
import CardWrapper from "./card-wrapper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

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
    if (
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.email ||
      !userInfo.password
    ) {
      setError("Must provide all the credentials");
    }

    try {
      startTransition(async () => {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userInfo),
        });
        if (response.ok) {
          const form = e.target;
          form.reset();
          const okResponse = await response.json();
          setSuccess(okResponse.message);
          toast({
            description: "you are being redirected to the login page",
          });
          router.push("/auth/login");
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          console.log("something went wrong");
        }
      });
    } catch (err) {
      isPending(false);
      setError("something went wrong...try again");
    }
  };

  return (
    <CardWrapper
      headerLabel="Sign Up to studyJetGlobal"
      backButtonLabel="Already have an account? Login"
      backButtonHref="/auth/login"
      showSocial
    >
      {/* <Form> */}
      <form onSubmit={handleSubmit}>
        <div className=" h-[300px] flex flex-col items-start justify-between">
          <label className="block text-sm font-medium text-foreground">
            firstName
          </label>
          <Input
            name="firstName"
            type="text"
            placeholder="john"
            value={userInfo.firstName}
            onChange={handleChange}
            disabled={isPending}
            className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
          <label className="block text-sm font-medium text-foreground">
            lastName
          </label>
          <Input
            name="lastName"
            type="text"
            placeholder="doe"
            value={userInfo.lastName}
            onChange={handleChange}
            disabled={isPending}
            className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
          <label className="block text-sm font-medium text-foreground">
            Email
          </label>
          <Input
            name="email"
            type="email"
            placeholder="johndoes@gmail.com"
            value={userInfo.email}
            onChange={handleChange}
            disabled={isPending}
            className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
          <label className="block text-sm font-medium text-foreground">
            Create a password
          </label>
          <Input
            name="password"
            type="password"
            placeholder="*******"
            value={userInfo.password}
            onChange={handleChange}
            disabled={isPending}
            required
            className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        <FormError message={Error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full mt-6 ">
          {isPending ? "Registering..." : "Register"}
        </Button>
        <p className="flex items-center mt-4 justify-center">or sign up with</p>
      </form>
      {/* </Form> */}
    </CardWrapper>
  );
}

export default RegisterForm;
