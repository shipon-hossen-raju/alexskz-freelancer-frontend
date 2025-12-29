"use client";

import FlexibleBanner from "@/components/shared/FlexibleBanner";
import CustomContainer from "@/components/ui/CustomContainer";
// import hero from "@/assets/image/aboutBG.png";
import hero from "@/assets/image/about/about_us_banner-1.webp";
import TealBtn from "@/components/ui/TealBtn";
import Link from "next/link";
import { useSelector } from "react-redux";

const userRolesFor = [
  {
    audience: "clients",
    description:
      "Get access to professionals who understand business, not just theory.",
    points: [
      "Explore categories and shortlist experts with transparent profiles, services and reviews.",
      "Start with one-to-one sessions or project-based work, depending on what your business needs.",
      "Build long-term relationships with trusted partners as your company grows.",
    ],
  },
  {
    audience: "professionals",
    description:
      "AliumPro is built for finance, HR, marketing and operations professionals who want better clients and better projects.",
    points: [
      "Create a standout profile that highlights your expertise, services and case studies.",
      "Get discovered by teams and businesses that are actively searching for skills like yours.",
      "Focus on delivering great work while we help with visibility, structure and tools.",
    ],
  },
];
//   const principles = [
//     {
//       title: "Curation over volume",
//       description:
//         "We focus on quality, not endless lists. Every professional on AliumPro goes through a vetting process.",
//     },
//     {
//       title: "Clarity over confusion",
//       description:
//         "Clear scopes, services and expectations, so both sides know how collaboration will work from day one.",
//     },
//     {
//       title: "Relationships over transactions",
//       description:
//         "We believe the best work happens when businesses and professionals build long-term partnerships.",
//     },
// ];
const principles = [
  {
    title: "Curation over volume",
    description:
      "We focus on quality, not endless lists. Every professional on AllumPro goes through a vetting process.",
  },
  {
    title: "Clarity over confusion",
    description:
      "Clear scopes, services and expectations, so both sides know how collaboration will work from day one.",
  },
  {
    title: "Relationships over transactions",
    description:
      "We believe the best work happens when businesses and professionals build long-term partnerships.",
  },
];

export default function AboutUsPage() {
  const user = useSelector((state) => state.user?.user || null);
  // const { data, isError, error, isLoading } = useGetAboutUsQuery();

  // const content = data?.data?.content;
  // console.log(data?.data?.content)
  return (
    <CustomContainer>
      {/* Banner */}
      <FlexibleBanner
        bgSrc={hero}
        variant="simple"
        title="Where trusted professionals and growing businesses meet"
        subtitle="AliumPro is a curated marketplace that connects teams and business owners with vetted professionals in finance, HR, marketing, operations and more."
        overlayClass="bg-black/5"
        height="h-[420px] sm:h-[480px] md:h-[560px] lg:h-[700px]"
        radius=""
        contentPosition="bottom"
      />

      <section>
        <div>
          <div className="mt-10 space-y-4">
            <h1 className="text-2xl font-bold">What is AliumPro?</h1>
            <p className="">
              AliumPro is a curated platform that helps growing businesses find
              the right expert at the right time. Instead of endless searches
              and cold outreach, we bring together vetted professionals in
              finance, HR, marketing and operations, with clear profiles,
              services and ways to work together.
            </p>
            <p>
              With AliumPro, it’s easier to get the expert support your business
              needs. From finance and HR to marketing and operations, our
              marketplace connects growing businesses with trusted professionals
              who are ready to help. Whether you’re launching a new project,
              restructuring your finances or building your first team, AliumPro
              gives you a clear view of each professional’s experience, services
              and case studies, so you can choose with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {userRolesFor.map((item) => (
              <div
                key={item.audience}
                className={`p-6 rounded-4xl ${
                  item.audience === "clients" ? "bg-[#CDEAD8]" : "bg-[#A2B3C3]"
                }`}
              >
                <h1 className="text-2xl font-bold mt-10">
                  For {item.audience}
                </h1>
                <p className="mt-4">{item.description}</p>
                <ul className="list-disc list-inside mt-4">
                  {item.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mx-auto px-6 py-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              Our principles
            </h2>

            <div className="space-y-8">
              {principles.map((principle, index) => (
                <div
                  key={index}
                  className="flex gap-4"
                  style={{ marginLeft: `${index * 30}%` }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="outline p-1 outline-emerald-400 rounded-full">
                      <span className="block size-5 rounded-full bg-emerald-400"></span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed max-w-md">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              Why we built AliumPro
            </h2>

            <p>
              Growing a business often means needing expert help before you’re
              ready to hire a full-time team. At the same time, great
              professionals want meaningful projects, not just gig platforms and
              price wars.
            </p>

            <p>
              AliumPro was created to bridge that gap: a curated space where
              businesses can find trusted specialists, and professionals can
              build sustainable, long-term work.
            </p>

            <p>
              Ready to meet the right experts for your business — or the right
              clients for your skills? Join AliumPro and start building better
              collaborations.
            </p>

            {!user && (
              <Link href="/sign-up">
                <TealBtn text="Join AliumPro" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </CustomContainer>
  );
}
