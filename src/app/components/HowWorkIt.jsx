"use client";

import React from "react";
import { Search, CalendarDays, Wallet } from "lucide-react";

export default function HowWorkIt() {
  const steps = [
    {
      stepNumber: "01",
      stepLabel: "STEP 1",
      icon: <Search className="w-5 h-5 text-black" />,
      title: "Browse Rooms",
      description:
        "Filter by floor, capacity, amenities, or hourly rate to find your fit.",
    },
    {
      stepNumber: "02",
      stepLabel: "STEP 2",
      icon: <CalendarDays className="w-5 h-5 text-black" />,
      title: "Pick a Time",
      description:
        "Choose a date and an open time slot — we'll prevent any conflicts.",
    },
    {
      stepNumber: "03",
      stepLabel: "STEP 3",
      icon: <Wallet className="w-5 h-5 text-black" />,
      title: "Study Peacefully",
      description:
        "Get a confirmation, show up, and focus. Manage everything from your dashboard.",
    },
  ];

  return (
    <section className="bg-gray-700 text-white max-w-5xl mx-auto py-16 my-20 rounded-2xl">
      <div className="px-6">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            How It Works
          </h2>

          <p className="text-gray-400">
            From browsing to booked in under a minute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, index) => (
            <div key={index} className="relative pt-5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#161b22] border border-gray-800 text-xs font-semibold text-amber-500 w-7 h-7 rounded-full flex items-center justify-center z-10">
                {step.stepNumber}
              </div>

              <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6 flex flex-col items-center text-center h-full">
                <div className="bg-amber-500 p-3 rounded-full mb-4">
                  {step.icon}
                </div>

                <span className="text-[10px] font-bold text-amber-500 tracking-widest mb-2">
                  {step.stepLabel}
                </span>

                <h3 className="text-lg font-semibold mb-2">
                  {step.title}
                </h3>

                <p className="text-gray-400 text-sm leading-6">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}