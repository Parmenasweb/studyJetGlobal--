"use client";

import FormError from "@/components/dynamicComps/form-error";
import FormSuccess from "@/components/dynamicComps/form-success";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";


export default function ContactForm() {

    const [contact, setContact] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
    const [isPending, startTransition] = useTransition()

    function handleChange (e) {
        const {name, value} = e.target;
        setContact((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    };

    async function handleSubmit (e) {
        e.preventDefault();
        setError("")
        setSuccess("")
        startTransition(async()=> {
            const res = await fetch(`/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    
                },
                body: JSON.stringify(contact),
            })
            if (res.status === 200) {
                setSuccess("Your request has been submitted successfully..");
                setContact({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                })
              } else {
                const errorData = await res.json();
                setError(errorData.message);
              }
        })
    
    }
    return (
            <div className="w-[90%] mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter mb-6">
              Get in Touch
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input disabled={isPending} name="name" value={contact.name} onChange={handleChange} type="text" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input disabled={isPending} name="email" value={contact.email} onChange={handleChange} type="email" placeholder="m@example.com" />
                </div>
                <div className="space-y-2">
                  <Label >Subject</Label>
                  <Input disabled={isPending} name="subject" value={contact.subject} onChange={handleChange}  type="text" placeholder="what would you like to discuss" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                disabled={isPending}
                name="message"
                value={contact.message} onChange={handleChange}
                  rows={5}
                  placeholder="How can we help you?"
                />
              </div>
              <FormError message={error} />
            <FormSuccess message={success} />
              <Button
              disabled={!contact.email || isPending}
              type="submit" className="w-full">
                {isPending ? "Submitting" : "Submit"}
              </Button>
            </form>
          </div>
    )
}