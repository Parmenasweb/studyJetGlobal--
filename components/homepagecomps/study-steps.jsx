// icons import
import { HiDocumentSearch } from "react-icons/hi";
import { MdOutlineSupportAgent } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FaCreditCard } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { PiAirplaneTakeoffBold } from "react-icons/pi";

function StudySteps() {
  return (
    <main className=" p-2 mb-4 h-auto">
      <h2 className="font-semibold mb-4 text-2xl w-[80%] mx-auto flex items-center justify-center ">
        Steps to : Study Abroad
      </h2>
      <p className="font-semibold text-center text-md lg:text-lg w-[70%] my-3 mx-auto ">
        To make sure your application process goes smooth, you must follow these
        steps to submit your application and get accepted
      </p>
      <div className="space-y-4 flex sm:flex-col lg:flex lg:flex-wrap lg:flex-row sm:w-[90%] mx-auto items-center lg:w-[90%] justify-around">
        <div className="flex flex-row mr-2 items-center justify-between p-4 rounded-xl sm:w-[80%] lg:w-[25%] ">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-yellow-600">
            <HiDocumentSearch className="text-3xl " />
          </div>
          <div className="p-1 w-[90%] ml-2  ">
            <h3 className="w-[80%] font-semibold text-xl">Step 1</h3>
            <p className="w-[95%] ">
              Search for your course wth the required documents
            </p>
          </div>
        </div>
        <div className="flex flex-row mr-2 items-center justify-between p-4 rounded-xl sm:w-[80%] lg:w-[25%]">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-600 ">
            <SlEnvolopeLetter className="text-3xl" />
          </div>
          <div className="p-1 w-[90%] ml-2  ">
            <h3 className="w-[70%] font-semibold text-xl">Step 2</h3>
            <p className="w-[90%] ">
              Receive provisional offer letter of Admission
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between p-4 rounded-xl sm:w-[80%] lg:w-[25%]">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-600">
            <FaCreditCard className="text-3xl  " />
          </div>
          <div className="p-1 w-[90%] ml-2  ">
            <h3 className="w-[70%] font-semibold text-xl">Step 3</h3>
            <p className="w-[90%] ">
              Pay One-time Registration Fees & fill undertakings
            </p>
          </div>
        </div>
        <div className="flex flex-row mr-2 items-center justify-between p-4 rounded-xl sm:w-[80%] lg:w-[25%]">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-600">
            <MdOutlineSupportAgent className="text-3xl " />
          </div>
          <div className="p-1 w-[90%] ml-2  ">
            <h3 className="w-[70%] font-semibold text-xl">Step 4</h3>
            <p className="w-[90%] ">Receive final acceptance/Visa letter</p>
          </div>
        </div>
        <div className="flex flex-row mr-2 items-center justify-between p-4 rounded-xl sm:w-[80%] lg:w-[25%]">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-600 ">
            <FaCcVisa className="text-3xl" />
          </div>
          <div className="p-1 w-[90%] ml-2  ">
            <h3 className="w-[70%] font-semibold text-xl">Step 5</h3>
            <p className="w-[90%] ">Apply for Visa</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between p-4 rounded-xl sm:w-[80%] lg:w-[25%]">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-yellow-600">
            <PiAirplaneTakeoffBold className="text-3xl  " />
          </div>
          <div className="p-1 w-[90%] ml-2  ">
            <h3 className="w-[70%] font-semibold text-xl">Step 6</h3>
            <p className="w-[90%] ">Prepare to travel</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default StudySteps;
