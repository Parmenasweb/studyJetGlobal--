"use client";
import { redirect } from "next/navigation";
import React from "react";
import { auth } from "@/auth";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const Dashboard = () => {
  //   const session = await auth();
  //   const user = session?.user;
  const [newProgram, setNewProgram] = useState({
    name: "",
    description: "",
    image: "",
    status: "Active",
  });

  // role based authorization
  // if (user.role !== "admin") return redirect("/private/dashboard");

  const [programs, setPrograms] = useState([
    {
      id: 1,
      name: "Study in London",
      description: "Experience the rich history and culture of London",
      image: "/placeholder.svg?height=200&width=300",
      status: "Active",
    },
    {
      id: 2,
      name: "Explore Tokyo",
      description:
        "Immerse yourself in the captivating blend of modern and traditional Japanese culture",
      image: "/placeholder.svg?height=200&width=300",
      status: "Active",
    },
    {
      id: 3,
      name: "Discover Sydney",
      description:
        "Discover the vibrant city life and stunning natural beauty of Sydney",
      image: "/placeholder.svg?height=200&width=300",
      status: "Active",
    },
  ]);

  //   if (!user) return redirect("/auth/login");

  const handleCreate = () => {
    setPrograms([...programs, { ...newProgram, id: programs.length + 1 }]);
    setNewProgram({ name: "", description: "", image: "", status: "Active" });
  };
  const handleUpdate = (id, updatedProgram) => {
    setPrograms(
      programs.map((program) =>
        program.id === id ? { ...program, ...updatedProgram } : program
      )
    );
  };
  const handleDelete = (id) => {
    setPrograms(programs.filter((program) => program.id !== id));
  };
  return <div>This is the dashboard</div>;
};

export default Dashboard;
