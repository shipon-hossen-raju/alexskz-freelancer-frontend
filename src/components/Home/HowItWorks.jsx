// components/sections/HowItWorks.jsx
"use client";

import Heading from "@/components/ui/Heading";
import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Join as a client",
    items: [
      {
        title: "Explore categories",
        desc: "Find services that match your business needs.",
      },
      {
        title: "Review profiles",
        desc: "Compare professionals by experience, services and case studies.",
      },
      {
        title: "Connect and start working",
        desc: "Contact your pro and kick off your project.",
      },
    ],
  },
  {
    id: 2,
    title: "Join as a pro",
    items: [
      {
        title: "Create your professional profile",
        desc: "Sign up for free and showcase your experience, services and case studies.",
      },
      {
        title: "Get discovered by clients",
        desc: "Appear in relevant categories so potential clients can find you when they search for your expertise.",
      },
      {
        title: "Collaborate and grow",
        desc: "Work on projects, build long-term relationships and manage everything through AliumPro",
      },
    ],
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto  px-4  ">
        <div className="text-center mb-10 md:mb-12">
          <Heading text=" How AliumPro works" />
        </div>

        <div className="md:max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2">
          {steps.map((s, i) => (
            <div
              key={s.id || i}
              className={[
                "flex flex-col text-left px-6 py-8",
                i > 0
                  ? "md:border-l md:border-[#8BCF9A] md:border-opacity-60"
                  : "",
              ].join(" ")}
            >
              {/* Title */}
              <h3 className="text-[15px] md:text-base font-semibold text-gray-800 font-open-sans">
                {s.title}
              </h3>

              {/* Caption */}
              <div>
                {s.items.map((item, i) => (
                  <div
                    key={item.title || i}
                    className="flex items-start my-4"
                  >
                    <div className="flex items-center justify-center mr-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#61C792]/20 text-[12px] font-semibold text-[#61C792]">
                        {i + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[15px] md:text-base font-semibold text-gray-800 font-open-sans">
                        {item.title}
                      </h4>
                      <p className="mt-2 max-w-sm text-xs md:text-[13px] leading-5 text-gray-500 font-open-sans">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* <p className="mt-2 max-w-sm text-xs md:text-[13px] leading-5 text-gray-500 font-open-sans">
                {s.desc}
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
