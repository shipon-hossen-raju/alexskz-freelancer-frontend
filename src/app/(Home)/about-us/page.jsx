"use client";

import StatsSection from "@/components/features/aboutUs/StatesSection";
import FlexibleBanner from "@/components/shared/FlexibleBanner";
import CustomContainer from "@/components/ui/CustomContainer";
import Heading from "@/components/ui/Heading";
import Image from "next/image";
import img1 from "@/assets/image/about/img1.png";
import img2 from "@/assets/image/about/img2.png";
import img3 from "@/assets/image/about/img3.png";
import hero from "@/assets/image/aboutBG.png";
import Loading from "@/components/shared/Loading";
import { useGetAboutUsQuery } from "@/redux/api/legalApi";

export default function AboutUsPage() {
  const { data, isError, error, isLoading } = useGetAboutUsQuery();

  const content = data?.data?.content;
  // console.log(data?.data?.content)
  return (
    <CustomContainer>
      {/* Banner */}
      <FlexibleBanner
        bgSrc={hero}
        variant="simple"
        title="Connecting Professionals with Opportunities that Matter"
        subtitle="Join our community of professionals in finance, legal, and marketing. Create your profile, showcase your expertise, and connect with clients who need your services."
        overlayClass="bg-black/45"
      />

      {/* Images + Content */}
      <section className="pt-10 md:pt-20">
        {/* items-stretch = equal column height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: responsive collage */}
          <div className="grid lg:grid-cols-3 gap-4 h-full">
            {/* Big image (takes 2 cols on lg) */}
            <div className="relative rounded-2xl overflow-hidden lg:col-span-2 h-[260px] sm:h-[320px] lg:h-full">
              <Image
                src={img1}
                alt="About image 1"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 50vw, 100vw"
                priority={false}
              />
            </div>

            {/* Right stack (2 small images) */}
            <div className="grid grid-rows-2 gap-4 lg:col-span-1 h-[260px] sm:h-[320px] lg:h-full">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={img2}
                  alt="About image 2"
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 25vw, 50vw"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={img3}
                  alt="About image 3"
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 25vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Right: content (centered vertically) */}
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <span className="inline-block text-[18px] font-medium text-[#144A6C] relative pl-3 font-open-sans">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2px] bg-[#144A6C]" />
                About us
              </span>
            </div>

            <div className="mb-8">
              <Heading text="Empowering Connections, Enabling Growth" />
            </div>

            {isLoading ? (
              <Loading />
            ) : (
              <>
                {content ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content || "No About us available.",
                    }}
                    className="text-justify"
                  ></div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: "No About us available.",
                    }}
                    className="text-justify"
                  ></div>
                )}
              </>
            )}

            <div className="mt-6">
              <StatsSection />
            </div>
          </div>
        </div>
      </section>
    </CustomContainer>
  );
}
