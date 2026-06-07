"use client";

import React from "react";
import {
  Calendar,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

export default function WhyStudy() {
  const features = [
    {
      icon: <Calendar className="w-5 h-5 text-amber-500" />,
      title: "Easy Booking",
      description:
        "Pick a date, choose an hour, see the cost — done. No back-and-forth emails or paperwork.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-500" />,
      title: "Conflict-Free Scheduling",
      description:
        "Smart overlap detection prevents double-bookings, so the room you reserve is the room you get.",
    },
    {
      icon: <ClipboardList className="w-5 h-5 text-amber-500" />,
      title: "Manage Your Listings",
      description:
        "Own a room? List it, set your hourly rate, and keep full control from your dashboard.",
    },
  ];

  return (
    <section className="bg-gray-700 text-white max-w-5xl mx-auto py-16 my-20 rounded-2xl">
      <div className="px-6">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Why StudyNook?
          </h2>

          <p className="text-gray-400">
            Built around the way real students study — quiet, focused,
            and on your schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#161b22] border border-gray-800 rounded-xl p-6 h-full"
            >
              <div className="bg-amber-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-400 text-sm leading-6">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}