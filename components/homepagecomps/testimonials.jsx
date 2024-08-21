"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import PageTitle from "../pageTitle";

export default function Testimonials() {
  return (
    <main>
      <PageTitle
        text="Student's Testimonials"
        className="flex flex-col font-bold my-3 text-2xl items-center w-[80%] mx-auto "
      />
      <h2 className="flex flex-col text-md  items-center w-[80%] mx-auto ">
        Hear from our students...
      </h2>
      <p className="flex flex-col text-md items-center w-[80%] mx-auto font-semibold">
        Discover how our study abroad programs have transformed the lives of our
        students.
      </p>
      <div className="h-[30rem] w-[90%] mx-auto rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </main>
  );
}

const testimonials = [
  {
    quote:
      "Choosing studyjetglobal was the best decision i made for my study journey. Their counselors guided me through every step, from selecting the perfect university to securing my visa. The 24/7 support was invaluable, and i felt confident knowing i had a dedicated team behind me. I highly recommend studyjetglobal to anyone looking to study abroad",
    name: "Nathaniel Tengbeh",
    title: "(Sierra Leone)",
  },
  {
    quote:
      "studyjeyglobal made my dream of studying abroad a reality, their instant application process was incredibly efficient, and i received timely updates on my application status. The budget management advice helped me plan my finances wisely. and i never felt overwhelmed. Thank you studyjetglobal for your exceptional services.",
    name: "Bakare Fatimah s.",
    title: "(Nigeria)",
  },
  {
    quote:
      "The personalized counselling i received from studyjetglobal was outstanding. They took the time to understand my goals and helped me choose a university that was a perfect fit. The comprehensive support, from application to pre-departure. made the entire process smooth and stress-free. I couldn't have done it without their help",
    name: "kpanto s.boi",
    title: "(Liberia)",
  },
  {
    quote:
      "I'm so grateful for the support i received from studyjetglobal. Their team was always available to answer my questions, and guidance on scholarship opportunities and budget management was particularly helpful. Thanks to studyjetglobal, i am now studying at my dream country UK!",
    name: "Michael N.",
    title: "(Nigeria)",
  },
  {
    quote:
      "From the moment i contacted studyjetglobal, i know i was in good hands. Their professional and friendly counselors made the entire process seamless. The real-time updates on my application status were a game-changer, and the client support from Mr wisdom korsor gave me peace of mind. I highly recommend studyjetglobal to any aspiring international student.",
    name: "Pollard Konti. S",
    title: "(Liberia)",
  },
];
