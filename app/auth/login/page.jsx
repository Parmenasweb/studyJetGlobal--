import Link from "next/link";

import { auth, signIn } from "@/auth";
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
};
