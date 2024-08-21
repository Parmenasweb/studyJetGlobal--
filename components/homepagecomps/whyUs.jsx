import Image from "next/image";
import PageTitle from "../pageTitle";

// icons import
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import { IoMdAlarm } from "react-icons/io";

import { MdOutlineStarBorder } from "react-icons/md";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { GrServices } from "react-icons/gr";

export default function WhyUs() {
  return (
    <main>
      <div>
        <PageTitle
          text="why StudyJetglobal?"
          className="flex flex-col font-bold text-2xl items-center justify-center"
        />
        <p className="w-[70%] mx-auto text-xl font-semibold flex items-center p-2 my-4 justify-center">
          what we offer at studyjetglobal
        </p>
      </div>

      {/* services cards */}
      <div className="flex lg:flex-row lg:flex-wrap sm:flex-col items-center justify-between w-[90%] mx-auto sm:space-y-2">
        <div className="h-60 shadow-md hover:shadow-lg hover:scale-105  lg:w-[29%] sm:w-[80%] px-4 py-6 rounded-md flex flex-col items-start justify-between sm:space-y-2 border-white border hover:bg-slate-200 ">
          <MdOutlineRocketLaunch className="text-3xl mt-2" />
          <h2 className="font-semibold text-lg mb-4">
            Fast application process
          </h2>
          <p className="mb-2">
            Our counsellors commit to help submit your application quick within
            24-hrs
          </p>
        </div>
        <div className="h-60 shadow-md hover:shadow-lg hover:scale-105  lg:w-[29%] sm:w-[80%] px-4 py-6 rounded-md flex flex-col items-start justify-between sm:space-y-2 border-white border hover:bg-slate-200 ">
          <MdOutlineSupportAgent className="text-3xl mt-2" />
          <h2 className="font-semibold text-lg mb-4">
            Expert free counselling
          </h2>
          <p className="mb-2">
            Our experienced counselors provide personalized advice on selecting
            the right universities, understanding application process, securing
            scholarship and preparing for a life in a new country
          </p>
        </div>
        <div className="h-60 shadow-md hover:shadow-lg hover:scale-105  lg:w-[29%] sm:w-[80%] px-4 py-6 rounded-md flex flex-col items-start justify-between sm:space-y-2 border-white border hover:bg-slate-200 ">
          <GrServices className="text-3xl mt-2" />
          <h2 className="font-semibold text-lg mb-4">Quality of services</h2>
          <p className="mb-2">
            At studyjetGlobal, we pride ourselves on delivering top-notch
            quality service to our clients aspiring to study abroad. with
            dedicated team of professionals committed to providing comprehensive
            support
          </p>
        </div>
        <div className="h-60 shadow-md hover:shadow-lg hover:scale-105  lg:w-[29%] sm:w-[80%] px-4 py-6 rounded-md flex flex-col items-start justify-between sm:space-y-2 border-white border hover:bg-slate-200 ">
          <IoTimerOutline className="text-3xl mt-2" />
          <h2 className="font-semibold text-lg mb-4">
            Instant application process and update
          </h2>
          <p className="mb-2">
            We streamline your journey with our instant application process and
            real-time updates. Our innovative system allows you to submit your
            application quickly and effortlessly. Ensuring that all your
            documents are accurately prepared and submitted on time
          </p>
        </div>
        <div className="h-60 shadow-md hover:shadow-lg hover:scale-105  lg:w-[29%] sm:w-[80%] px-4 py-6 rounded-md flex flex-col items-start justify-between sm:space-y-2 border-white border hover:bg-slate-200 ">
          <GiReceiveMoney className="text-3xl mt-2" />
          <h2 className="font-semibold text-lg mb-4">Budget management</h2>
          <p className="mb-2">
            Our budget management services are designed to help you create a
            realistic financial plan that covers tuition, living expenses,
            travel, and other essentials.
          </p>
        </div>
        <div className="h-60 shadow-md hover:shadow-lg hover:scale-105  lg:w-[29%] sm:w-[80%] px-4 py-6 rounded-md flex flex-col items-start justify-between sm:space-y-2 border-white border hover:bg-slate-200 ">
          <IoMdAlarm className="text-3xl mt-2" />
          <h2 className="font-semibold text-lg mb-4">24/7 client support</h2>
          <p className="mb-2">
            Our 24/7 client support services ensures that you can reach out to
            our experts at any time for assistance or guidance.
          </p>
        </div>
      </div>
      {/* steps card */}
      {/* <div>
        <div className="flex flex-row items-center justify-center">
          <HiDocumentSearch />
          <div>
            <h3>step 1</h3>
            <p>Search for your course wth the required documents</p>
          </div>
        </div>
      </div> */}
    </main>
  );
}
