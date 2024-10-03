import Image from "next/image";
import React from "react";

const DetailedFacts = ({ details }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 flex-wrap gap-4 ">
      {/* {quickFacts.map((fact, index) => ( */}
      <div className="flex items-start justify-between rounded-md border border-white p-3 w-full">
        <Image
          src="/cost.png"
          alt="cost"
          width={50}
          height={50}
          className="mr-2 flex items-center justify-center"
        />
        <div className="flex flex-col items-center justify-between ">
          <span className="text-sm font-bold">
            Average Living Cost (annual)
          </span>
          <span className="text-sm">{details.avgLivingCost} </span>
        </div>
      </div>
      {/* {quickFacts.map((fact, index) => ( */}
      <div className="flex items-center">
        <Image
          src="/education.png"
          alt="education"
          width={50}
          height={50}
          className="mr-2 flex items-center justify-center"
        />
        <div className="flex flex-col items-center justify-between">
          <span className="text-sm font-bold">Average Tuition Fees</span>
          <span className="text-sm">{details.avgTuitionFees} </span>
        </div>
      </div>
      {/* {quickFacts.map((fact, index) => ( */}
      <div className="flex items-center">
        <Image
          src="/book.png"
          alt="international students"
          width={50}
          height={50}
          className="mr-2 flex items-center justify-center"
        />
        <div className="flex flex-col items-center justify-between">
          <span className="text-sm font-bold">Major Intakes</span>
          <span className="text-sm">{details.majorIntakes} </span>
        </div>
      </div>
      {/* {quickFacts.map((fact, index) => ( */}
      <div className="flex items-center">
        <Image
          src="/income.png"
          alt="gdp"
          width={50}
          height={50}
          className="mr-2 flex items-center justify-center"
        />
        <div className="flex flex-col items-center justify-between">
          <span className="text-sm font-bold">Average Graduation Income</span>
          <span className="text-sm">{details.avgGraduationIncome} </span>
        </div>
      </div>
      {/* {quickFacts.map((fact, index) => ( */}
      <div className="flex items-center">
        <Image
          src="/passport.png"
          alt="dialing code"
          width={50}
          height={50}
          className="mr-2 flex items-center justify-center"
        />
        <div className="flex flex-col items-center justify-between">
          <span className="text-sm font-bold">
            Immigration after Graduation
          </span>
          <span className="text-sm">{details.immigrationRules} </span>
        </div>
      </div>
      {/* {quickFacts.map((fact, index) => ( */}
      <div className="flex items-center">
        <Image
          src="/scholarship.png"
          alt="universities"
          width={50}
          height={50}
          className="mr-2 flex items-center justify-center"
        />
        <div className="flex flex-col items-center justify-between">
          <span className="text-sm font-bold">Scholarship</span>
          <span className="text-sm">{details.scholarship} </span>
        </div>
      </div>
    </div>
  );
};

export default DetailedFacts;
