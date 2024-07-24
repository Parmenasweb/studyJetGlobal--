"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState, useTransition } from "react";
import FormError from "../dynamicComps/form-error";
import FormSuccess from "../dynamicComps/form-success";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function ConsultationForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [consultationInfo, setConsultationInfo] = useState({
    consulteeName: "",
    email: "",
    contactNumber: "",
    whatsAppNumber: "",
    selectedDate: "",
    selectedTime: "",
    description: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setConsultationInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function cleanUpInput() {
    setConsultationInfo({
      consulteeName: "",
      email: "",
      contactNumber: "",
      whatsAppNumber: "",
      selectedDate: "",
      selectedTime: "",
      description: "",
    });
  }

  async function uploadConsultation(consultationInfo) {
    if (
      !consultationInfo.consulteeName ||
      !consultationInfo.email ||
      !consultationInfo.contactNumber ||
      !consultationInfo.whatsAppNumber ||
      !consultationInfo.selectedDate ||
      !consultationInfo.selectedTime ||
      !consultationInfo.description
    ) {
      setError("All Field is required");
    } else {
      try {
        startTransition(async () => {
          const res = await fetch(`/api/onBoarding?query=consultation`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(consultationInfo),
          });
          if (res.status === 200) {
            const okResponse = await res.json();
            cleanUpInput(consultationInfo);
            setSuccess(
              "🎉congrats!..Your application has been submitted successfully"
            );
          } else {
            const errorData = await res.json();
            setError(errorData.message);
          }
        });
      } catch (err) {}
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(consultationInfo);
    setError("");
    setSuccess("");
    uploadConsultation(consultationInfo);
  }
  return (
    <Card className="sm:w-[90%] lg:w-[50%] bg-primary-foreground  p-4 mx-auto">
      <form onSubmit={handleSubmit} action="">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-center text-xl font-semibold my-3">
            Consultation Form
          </CardTitle>

          <CardDescription className="flex text-lg text-center my-3 items-center justify-center font-bold">
            Fill out the form below to schedule a consultation with our study
            abroad experts.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Applicant Full Name</Label>
            <Input
              type="text"
              disabled={isPending}
              value={consultationInfo.consulteeName}
              onChange={handleChange}
              placeholder="Enter your full name"
              name="consulteeName"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Applicant Email</Label>
            <Input
              type="email"
              disabled={isPending}
              name="email"
              value={consultationInfo.email}
              onChange={handleChange}
              placeholder="john20@gmail.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">contact Number</Label>
            <PhoneInput
              countryCodeEditable={false}
              layout="second"
              country="us"
              inputProps={{
                name: "contactNumber",
                required: true,
                autoFocus: true,
              }}
              placeholder="+1 (123) 456-7890"
              value={consultationInfo.contactNumber}
              onChange={(phone) =>
                setConsultationInfo((prev) => {
                  return {
                    ...prev,
                    contactNumber: phone,
                  };
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">whatsApp Number</Label>
            <PhoneInput
              countryCodeEditable={false}
              layout="second"
              country="us"
              inputProps={{
                name: "whatsAppNumber",
                required: true,
                autoFocus: true,
              }}
              placeholder="+1 (123) 456-7890"
              value={consultationInfo.whatsAppNumber}
              onChange={(phone) =>
                setConsultationInfo((prev) => {
                  return {
                    ...prev,
                    whatsAppNumber: phone,
                  };
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">pick a date for consultation</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  {consultationInfo.selectedDate ? (
                    format(consultationInfo.selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-5 w-[320px]">
                <DayPicker
                  initialFocus
                  disabled={(date) =>
                    date < new Date() || date < new Date("1900-01-01")
                  }
                  mode="single"
                  selected={consultationInfo.selectedDate}
                  onSelect={(value) =>
                    setConsultationInfo((prev) => {
                      return {
                        ...prev,
                        selectedDate: value,
                      };
                    })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Preferred Time</Label>
            <Select
              onValueChange={(value) =>
                setConsultationInfo((prev) => {
                  return {
                    ...prev,
                    selectedTime: value,
                  };
                })
              }
              name="selectedTime"
              value={consultationInfo.selectedTime}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9am">9:00 AM</SelectItem>
                <SelectItem value="10am">10:00 AM</SelectItem>
                <SelectItem value="11am">11:00 AM</SelectItem>
                <SelectItem value="12pm">12:00 PM</SelectItem>
                <SelectItem value="1pm">1:00 PM</SelectItem>
                <SelectItem value="2pm">2:00 PM</SelectItem>
                <SelectItem value="3pm">3:00 PM</SelectItem>
                <SelectItem value="4pm">4:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Consultation Description</Label>
            <Textarea
              name="description"
              value={consultationInfo.description}
              onChange={handleChange}
              placeholder="Briefly describe what you'd like to discuss during the consultation"
              className="min-h-[50px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col w-[95%] mx-auto items-center pt-4 justify-start ">
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              disabled={isPending}
              className="btn btn-submit items-center justify-center mx-auto lg:w-[50%] sm:w-[70%] py-6 px-9 ml-1 my-3 rounded-xl bg-black"
            >
              {isPending ? (
                <div>
                  <loadingSpinner /> Submitting...
                </div>
              ) : (
                "Schedule Consultation"
              )}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
