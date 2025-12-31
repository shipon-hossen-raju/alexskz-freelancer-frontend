"use client";

import Image from "next/image";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import TealBtn from "../ui/TealBtn";

export default function FlexibleBanner({
  bgSrc,
  variant = "simple", // 'search' | 'cta' | 'simple'
  title,
  subtitle,
  className = "",

  // search
  SearchField,
  onSearch,
  tags = [],

  // cta / simple
  actionText,
  actionHref = "#",
  onActionClick,

  // style knobs
  overlayClass = "bg-black/45",
  radius = "rounded-2xl",
  height = "h-[320px] sm:h-[380px] md:h-[460px] lg:h-[520px]",
  contentAlign = "left", // 'left' | 'center'
  contentPosition = "top", // "top" | "bottom"

  // text styles
  titleClass = "text-black",
  subtitleClass = "text-black/80",
  actionClass = "",
}) {
  const isCenter = contentAlign === "center";

  const isActionButton = variant === "cta" || variant === "simple";

  return (
    <section
      className={`relative w-full overflow-hidden ${radius} ${className}`}
    >
      <div className={`relative ${height}`}>
        {/* Background */}
        <Image
          src={bgSrc}
          alt=""
          fill
          priority={false}
          className="object-cover"
        />
        {/* Overlay */}
        <div className={`absolute inset-0 ${overlayClass}`} />

        {/* Content */}
        <div className="absolute inset-0">
          <div
            className={[
              "h-full w-full px-4 sm:px-6 md:px-8 flex",
              isCenter
                ? "items-center justify-center text-center"
                : "items-center",
              contentPosition === "top"
                ? "flex-col-reverse items-start py-10"
                : "flex-col items-end py-6 mt-20 text-right",
            ].join(" ")}
          >
            <div className={`w-full ${isCenter ? "max-w-3xl" : "max-w-4xl"}`}>
              {title && (
                <h2
                  className={[
                    // mobile-first sizes
                    "font-open-sans font-bold leading-tight",
                    "text-[22px] xs:text-[26px] sm:text-[32px] md:text-[42px] lg:text-[54px]",
                    `${titleClass}`,
                  ].join(" ")}
                >
                  {title}
                </h2>
              )}

              {subtitle && (
                <p
                  className={[
                    "mt-2",
                    "text-[13px] sm:text-[15px] md:text-[16px] font-open-sans",
                    isCenter ? "mx-auto max-w-2xl" : "max-w-2xl ml-auto",
                    `${subtitleClass}`,
                  ].join(" ")}
                >
                  {subtitle}
                </p>
              )}

              {/* Variants */}
              {variant === "search" && SearchField && (
                <>
                  {/* Let SearchField manage its own submit button */}
                  <div
                    className={[
                      "mt-3 sm:mt-4",
                      isCenter ? "mx-auto max-w-2xl" : "",
                    ].join(" ")}
                  >
                    <SearchField onSearch={onSearch} />
                  </div>

                  {Array.isArray(tags) && tags.length > 0 && (
                    <div
                      className={[
                        "mt-3 sm:mt-4",
                        // on very small screens, allow horizontal scroll instead of wrapping to multiple lines
                        "flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible",
                        "pb-1", // small pad so scrollbars don’t clip
                        isCenter ? "justify-center" : "",
                      ].join(" ")}
                    >
                      {tags.map((t, i) => {
                        const handleSetSlug = () => {
                          if (typeof window !== "undefined") {
                            localStorage.setItem("slug", t.slug);
                          }
                        };
                        return (
                          <Link
                            key={i}
                            onClick={handleSetSlug}
                            href={`/category/${t.slug}`}
                            className={`shrink-0 inline-flex items-center gap-2 rounded-md bg-[#144A6C1A] px-3 py-1.5 text-[12px] sm:text-[13px] font-medium text-white hover:bg-[#144A6C] focus:outline-none focus:ring-2 focus:ring-white/30`}
                          >
                            {t.title}{" "}
                            <span aria-hidden>
                              <MdOutlineArrowOutward />
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {isActionButton && actionText && (
                <div
                  className={[
                    "mt-4",
                    isCenter ? "flex justify-center" : "",
                  ].join(" ")}
                >
                  {onActionClick ? (
                    <button
                      onClick={onActionClick}
                      className="inline-flex h-11 items-center rounded-[10px] bg-[#144A6C] px-6 text-white font-semibold shadow-sm hover:bg-[#0f3a55] focus:outline-none focus:ring-2 focus:ring-white/40"
                    >
                      {actionText}
                    </button>
                  ) : (
                    <Link href={actionHref} className="inline-block">
                      {/* <span className="inline-flex h-11 items-center rounded-[10px] bg-[#144A6C] px-6 text-white font-semibold shadow-sm hover:bg-[#0f3a55] focus:outline-none focus:ring-2 focus:ring-white/40">
                        {actionText}
                      </span> */}
                      <TealBtn text={actionText} />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
