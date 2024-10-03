import Image from "next/image";
import React from "react";

export default function DestinationFacts({ quickFacts, capital }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-white">
      <div className="flex items-start justify-start rounded-md border border-white p-3">
        <Image
          src="/architecture-and-city.png"
          alt="capital"
          width={40}
          height={40}
          className="mr-2"
        />
        <div className="flex flex-col">
          <span className="text-base font-bold">Capital</span>
          <span className="text-lg">{capital} </span>
        </div>
      </div>
      {/* {quickFacts.map((fact, index) => ( */}
      <div className="flex items-center justify-start">
        <Image src="/people.png" alt="population" width={40} height={40} />
        <div className="flex flex-col">
          <span className="text-sm font-bold">Population</span>
          <span className="text-sm">{quickFacts.population} </span>
        </div>
      </div>
      {/* {quickFacts.map((fact, index) => ( */}
      <div className="flex items-center">
        <Image
          src="/distance-education.png"
          alt="international students"
          width={40}
          height={40}
          className="mr-2"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold">International Students</span>
          <span className="text-sm">{quickFacts.internationalStudents} </span>
        </div>
      </div>
      {/* {quickFacts.map((fact, index) => ( */}
      <div className="flex items-center">
        <Image
          src="/gdp.png"
          alt="gdp"
          width={40}
          height={40}
          className="mr-2"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold">GDP</span>
          <span className="text-sm">{quickFacts.gdp} </span>
        </div>
      </div>
      {/* {quickFacts.map((fact, index) => ( */}
      <div className="flex items-center">
        <Image
          src="/india (1).png"
          alt="dialing code"
          width={40}
          height={40}
          className="mr-2"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold">Dialing Code</span>
          <span className="text-sm">{quickFacts.dialingCode} </span>
        </div>
      </div>
      {/* {quickFacts.map((fact, index) => ( */}
      <div className="flex items-center">
        <Image
          src="/university.png"
          alt="universities"
          width={40}
          height={40}
          className="mr-2"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold">Universities</span>
          <span className="text-sm">{quickFacts.universities} </span>
        </div>
      </div>
    </div>
  );
}
