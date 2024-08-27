import { redirect } from "next/navigation";
import React from "react";
import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import PageTitle from "@/components/pageTitle";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import DashboardCards, { CardContainer } from "./components/cardWrapper";
import BarChart from "./components/BarChart";
import StudentsCard from "./components/studentsCard";

const cardData = [
  {
    label: "Total Revenue",
    icon: DollarSign,
    content: "$45,231.89",
    description: "+20.1% from last month",
  },
  {
    label: "Subscriptions",
    icon: Users,
    content: "+2350",
    description: "+180.1% from last month",
  },
  {
    label: "Sales",
    icon: CreditCard,
    content: "+12,234",
    description: "+19% from last month",
  },
  {
    label: "Active Now",
    icon: Activity,
    content: "+573",
    description: "+201 since last hour",
  }
];

const uesrSalesData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    saleAmount: "+$1,999.00"
  },
  {
    name: "Jackson Lee",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$1,999.00"
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$39.00"
  },
  {
    name: "William Kim",
    email: "will@email.com",
    saleAmount: "+$299.00"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    saleAmount: "+$39.00"
  }
];

const Dashboard = async () => {
    const session = await auth();
    const user = session?.user;
  

  // role based authorization
  // if (user.role !== "admin") return redirect("/private/dashboard");

  

    if (!user) return redirect("/auth/login");


  return (
  <div>
    <PageTitle text="studyJetGlobal Dashboard" />
    <br />
    <DashboardCards />
    <br />
    <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
      <CardContainer>
            <p className="p-4 font-semibold">Overview</p>
            <BarChart />
          </CardContainer>
          <CardContainer className="flex justify-between gap-4">
          <section>
            <p>Recent Applications</p>
            <p className="text-sm text-gray-400">
              We have 11 applications this month
            </p>
          </section>
          {uesrSalesData.map((d, i) => (
            <StudentsCard
              key={i}
              email={d.email}
              name={d.name}
              saleAmount={d.saleAmount}
            />
          ))}
        </CardContainer>
    </section>

  </div>)
};

export default Dashboard;
