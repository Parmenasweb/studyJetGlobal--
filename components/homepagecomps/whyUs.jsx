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
          text="why Studyjet?"
          className="flex flex-col font-bold text-2xl items-center justify-center"
        />
        <p className="w-[70%] mx-auto text-xl font-semibold flex items-center p-2 my-4 justify-center">
          what we offer at studyjet
        </p>
      </div>

      {/* services cards */}
      <div className="flex lg:flex-row lg:flex-wrap  md:flex-row sm:flex-col items-center justify-between w-[90%] mx-auto sm:space-y-2">
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
            Our counsellors commit to help submit your application quick within
            24-hrs
          </p>
        </div>
        <div className="h-60 shadow-md hover:shadow-lg hover:scale-105  lg:w-[29%] sm:w-[80%] px-4 py-6 rounded-md flex flex-col items-start justify-between sm:space-y-2 border-white border hover:bg-slate-200 ">
          <GrServices className="text-3xl mt-2" />
          <h2 className="font-semibold text-lg mb-4">Quality of services</h2>
          <p className="mb-2">
            Our counsellors commit to help submit your application quick within
            24-hrs
          </p>
        </div>
        <div className="h-60 shadow-md hover:shadow-lg hover:scale-105  lg:w-[29%] sm:w-[80%] px-4 py-6 rounded-md flex flex-col items-start justify-between sm:space-y-2 border-white border hover:bg-slate-200 ">
          <IoTimerOutline className="text-3xl mt-2" />
          <h2 className="font-semibold text-lg mb-4">
            Instant applicaton process and update
          </h2>
          <p className="mb-2">
            Our counsellors commit to help submit your application quick within
            24-hrs
          </p>
        </div>
        <div className="h-60 shadow-md hover:shadow-lg hover:scale-105  lg:w-[29%] sm:w-[80%] px-4 py-6 rounded-md flex flex-col items-start justify-between sm:space-y-2 border-white border hover:bg-slate-200 ">
          <GiReceiveMoney className="text-3xl mt-2" />
          <h2 className="font-semibold text-lg mb-4">Budget management</h2>
          <p className="mb-2">
            Our counsellors commit to help submit your application quick within
            24-hrs
          </p>
        </div>
        <div className="h-60 shadow-md hover:shadow-lg hover:scale-105  lg:w-[29%] sm:w-[80%] px-4 py-6 rounded-md flex flex-col items-start justify-between sm:space-y-2 border-white border hover:bg-slate-200 ">
          <IoMdAlarm className="text-3xl mt-2" />
          <h2 className="font-semibold text-lg mb-4">24/7 client support</h2>
          <p className="mb-2">
            Our counsellors commit to help submit your application quick within
            24-hrs
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
