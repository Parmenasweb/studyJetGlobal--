import { redirect } from "next/navigation";
import React from "react";
import { auth } from "@/auth";

const Dashboard = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) return redirect("/auth/login");

  // role based authorization
  // if (user.role !== "admin") return redirect("/private/dashboard");
  return <div>Dashboard</div>;
};

export default Dashboard;
