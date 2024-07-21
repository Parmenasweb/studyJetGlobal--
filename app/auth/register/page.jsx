import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/dynamicComps/register-form";

export default async function RegisterPage() {
  const session = await auth();
  const user = session?.user;
  if (user) {
    redirect("/private/dashboard");
  }
  return (
    <div className="flex items-center justify-center pt-24">
      <RegisterForm />
    </div>
  );
}
