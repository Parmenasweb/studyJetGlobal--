"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { Input } from "@/components/ui/input";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import LoadingSpinner from "@/components/loadingspinner";

function DeleteStudent() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [studentName, setStudentName] = useState("");
  const [student, setStudent] = useState({});
  const studentId = searchParams.get("id");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`/api/user?id=${studentId}`);
        const response = await data.json();
        setStudent(response);
        setStudentName(response.name);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [studentId]);

  function handleChange(e) {
    setStudentName(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    startTransition(async () => {
      if (!studentId || !studentName) {
        setError("No student was selected...try again");
      } else {
        const response = await fetch(`/api/user?id=${studentId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setSuccess("Student deleted successfully");
          window.location.reload();
        } else {
          setError("something went wrong.. try again later!!");
        }
      }
    });
  }

  return (
    <div className="w-full flex border-4 rounded-lg flex-col items-center ">
      <h2 className="ml-1 text-xl font-bold">Delete A Student</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <Input
          className=" p-1 mt-3 flex items-center"
          type="text"
          name="studentName"
          value={studentName}
          onChange={handleChange}
          placeholder="student to be deleted..."
          disabled
        />
        <div className="flex items-center">
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="btn btn-submit items-center py-2 px-6 ml-1 rounded-xl bg-blue-500"
          >
            {isPending ? "Deleting...." : "Confirm Delete"}
          </Button>
        </div>
        <p className=" text-red-500 text-sm font-bold w-3/4 flex items-start">
          *please note that clicking the button deletes the student from the
          database... this is an irreversible process*
        </p>
      </form>
    </div>
  );
}

export default DeleteStudent;
