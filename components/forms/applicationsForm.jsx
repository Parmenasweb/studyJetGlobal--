"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import FormError from "../dynamicComps/form-error";
import FormSuccess from "../dynamicComps/form-success";
// import FormError from "@/components/form-error";
// import FormSuccess from "@/components/form-success";

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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { application } from "@/action/user";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ApplicationForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [applicantInfo, setApplicantInfo] = useState({
    applicantName: "",
    email: "",
    homeCountry: "",
    contactNumber: "",
    whatsAppNumber: "",
    destinationCountry: "",
    programCategory: "",
    parentName: "",
    parentOccupation: "",
    parentContact: "",
    checked: "",
  });

  function handleChange(e) {
    console.log(e);
    const { name, value } = e.target;
    setApplicantInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function cleanUpInput() {
    setApplicantInfo({
      applicantName: "",
      email: "",
      homeCountry: "",
      contactNumber: "",
      whatsAppNumber: "",
      destinationCountry: "",
      programCategory: "",
      parentName: "",
      parentOccupation: "",
      parentContact: "",
      checked: "",
    });
  }

  async function uploadApplication(applicantInfo) {
    if (
      !applicantInfo.applicantName ||
      !applicantInfo.email ||
      !applicantInfo.homeCountry ||
      !applicantInfo.whatsAppNumber ||
      !applicantInfo.contactNumber ||
      !applicantInfo.destinationCountry ||
      !applicantInfo.programCategory ||
      !applicantInfo.parentName ||
      !applicantInfo.parentOccupation ||
      !applicantInfo.parentContact ||
      !applicantInfo.checked
    ) {
      setError("All Field is required");
    } else {
      startTransition(async () => {
        const res = await fetch(`/api/onBoarding?query=application`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(applicantInfo),
        });
        if (res.status === 200) {
          cleanUpInput(applicantInfo);
          setSuccess("Your application has been submitted successfully");
        } else {
          const errorData = await res.json();
          setError(errorData.message);
        }
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(applicantInfo);
    setError("");
    setSuccess("");
    uploadApplication(applicantInfo);
  }
  return (
    <Card className="sm:w-[90%] lg:w-[50%] bg-primary-foreground my-12 p-4 mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-center justify-center text-xl font-semibold my-2">
          Application Form - study abroad with studyJetGlobal
        </CardTitle>
        <CardDescription className="flex my-2 items-center justify-center font-bold">
          Apply for our international study abroad programs. <br />
          Our consultant will reach out to you after filling form
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} action={application}>
        <CardContent className="space-y-6">
          {/* applicant details */}

          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Applicant Full Name</Label>
              <Input
                type="text"
                disabled={isPending}
                value={applicantInfo.applicantName}
                onChange={handleChange}
                placeholder="Enter your full name"
                name="applicantName"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Applicant Email</Label>
              <Input
                type="email"
                disabled={isPending}
                name="email"
                value={applicantInfo.email}
                onChange={handleChange}
                placeholder="john20@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="home-country">Home Country</Label>
              <Input
                type="text"
                disabled={isPending}
                name="homeCountry"
                value={applicantInfo.homeCountry}
                onChange={handleChange}
                placeholder="select your home country"
              />
            </div>
          </div>

          {/* applicant details */}

          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 rounded-lg border shadow-md">
            <div className="space-y-2">
              <Label>Phone contact Number</Label>
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
                value={applicantInfo.contactNumber}
                onChange={(phone) =>
                  setApplicantInfo((prev) => {
                    return {
                      ...prev,
                      contactNumber: phone,
                    };
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">whatsapp Line</Label>
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
                value={applicantInfo.whatsAppNumber}
                onChange={(phone) =>
                  setApplicantInfo((prev) => {
                    return {
                      ...prev,
                      whatsAppNumber: phone,
                    };
                  })
                }
              />
            </div>
          </div>

          {/* destination and programs details */}

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">study country of choice</Label>
              <Select
                // id="duration"
                // onChange={handleChange}
                onValueChange={(value) =>
                  setApplicantInfo((prev) => {
                    return {
                      ...prev,
                      destinationCountry: value,
                    };
                  })
                }
                name="destinationCountry"
                value={applicantInfo.destinationCountry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Country of choice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="UK">UK</SelectItem>
                  <SelectItem value="US">US</SelectItem>
                  <SelectItem value="Malaysia">Malaysia</SelectItem>
                  <SelectItem value="Georgia">Georgia</SelectItem>
                  <SelectItem value="Malta">Malta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Program category</Label>
              <Select
                onValueChange={(value) =>
                  setApplicantInfo((prev) => {
                    return {
                      ...prev,
                      programCategory: value,
                    };
                  })
                }
                name="programCategory"
                value={applicantInfo.programCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Study category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diploma">
                    Diploma(polytechnic) course
                  </SelectItem>
                  <SelectItem value="bachelors">
                    Bachelors(undergraduate) course
                  </SelectItem>
                  <SelectItem value="lateral">Lateral entry course</SelectItem>
                  <SelectItem value="masters">
                    Masters(postgraduate) course
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* parents details */}

            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Parent/sponsor Name</Label>
                <Input
                  type="text"
                  disabled={isPending}
                  name="parentName"
                  value={applicantInfo.parentName}
                  onChange={handleChange}
                  placeholder="select your home country"
                  className="w-[90%] mx-auto"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="">Parent/sponsor occupation </Label>
                <Input
                  type="text"
                  disabled={isPending}
                  name="parentOccupation"
                  value={applicantInfo.parentOccupation}
                  onChange={handleChange}
                  placeholder="parent main source of income "
                  className="w-[90%] mx-auto"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">parent Line</Label>
                <PhoneInput
                  international
                  countryCodeEditable={false}
                  layout="second"
                  country="us"
                  inputProps={{
                    name: "parentContact",
                    required: true,
                    autoFocus: true,
                  }}
                  placeholder="+1 (123) 456-7890"
                  value={applicantInfo.parentContact}
                  onChange={(phone) =>
                    setApplicantInfo((prev) => {
                      return {
                        ...prev,
                        parentContact: phone,
                      };
                    })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid-cols-1 grid ">
          <div className="flex flex-row items-center gap-1 my-4">
            <Checkbox
              id="terms"
              name="checked"
              checked={applicantInfo.checked}
              onCheckedChange={(checked) =>
                setApplicantInfo((prev) => {
                  return {
                    ...prev,
                    checked: checked,
                  };
                })
              }
            />
            <Label htmlFor="terms">
              I agree to the{" "}
              <Link href="/termsAndConditions" prefetch={false}>
                terms and conditions
              </Link>
            </Label>
          </div>
          <div className="flex my-4 w-[95%] mx-auto flex-col items-center ">
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              disabled={isPending}
              className="btn btn-submit items-center mx-auto lg:w-[50%] sm:w-[90%] py-6 px-9 ml-1 rounded-xl bg-black"
            >
              {isPending ? (
                <div>
                  <loadingSpinner /> Submitting...
                </div>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
