// components/sections/FreelancerCarousel.jsx
"use client";

import FreelancerCard from "@/components/Home/FreelancerCard";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function CustomCarousel({ items = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  const getGapSize = () => {
    if (typeof window === "undefined") return 24;
    return window.innerWidth < 768 ? 12 : 24;
  };

  const slideWidth =
    containerWidth && itemsPerView
      ? Math.floor(
          (containerWidth - getGapSize() * (itemsPerView - 1)) / itemsPerView
        )
      : 0;

  const maxIndex = Math.max(0, items.length - itemsPerView);

  // set itemsPerView + measure container
  useEffect(() => {
    function update() {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      const per = w < 768 ? 1 : w < 1024 ? 2 : 4; // sm=1, md=2, lg=4
      setItemsPerView(per);
      if (containerRef.current)
        setContainerWidth(containerRef.current.clientWidth);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // clamp index when layout changes
  useEffect(() => {
    const newMax = Math.max(0, items.length - itemsPerView);
    setCurrentIndex((prev) => Math.min(prev, newMax));
  }, [itemsPerView, containerWidth, items.length]);

  // observe container size
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      if (containerRef.current)
        setContainerWidth(containerRef.current.clientWidth);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // nav handlers
  const handlePrevious = () => setCurrentIndex((p) => Math.max(0, p - 1));
  const handleNext = () => setCurrentIndex((p) => Math.min(maxIndex, p + 1));

  // keyboard
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
  };

  // touch/swipe
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const isSwiping = useRef(false);

  const onTouchStart = (e) => {
    isSwiping.current = true;
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    if (!isSwiping.current) return;
    touchCurrentX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (!isSwiping.current) return;
    const dx = touchCurrentX.current - touchStartX.current;
    const threshold = Math.max(30, slideWidth * 0.2);
    if (dx > threshold) handlePrevious();
    else if (dx < -threshold) handleNext();
    isSwiping.current = false;
    touchStartX.current = 0;
    touchCurrentX.current = 0;
  };

  const trackStyle = {
    transform: `translateX(-${currentIndex * (slideWidth + getGapSize())}px)`,
    width: `${items.length * slideWidth + (items.length - 1) * getGapSize()}px`,
  };

  return (
    <div className="w-full  relative">
      {/* Right-aligned arrows (like your categories carousel) */}
      <div className=" hidden md:block">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 flex justify-between -mx-4 ">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            aria-label="Previous"
            className={`h-10 w-10 bg-white flex items-center justify-center rounded-full transition-colors focus:outline-none  shadow
              ${
                currentIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200 cursor-pointer"
              }`}
          >
            <IoIosArrowBack className="text-[#020202] text-xl" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next"
            className={`h-10 w-10 bg-white flex items-center justify-center rounded-full transition-colors focus:outline-none  shadow
              ${
                currentIndex >= maxIndex
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200 cursor-pointer"
              }`}
          >
            <IoIosArrowForward className="text-[#020202] text-xl" />
          </button>
        </div>
      </div>

      {/* Track */}
      <div
        ref={containerRef}
        className="overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Freelancers"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex gap-3 md:gap-6 transition-transform duration-300 ease-in-out"
          style={trackStyle}
        >
          {items.map((p) => (
            <div
              key={p.id}
              className="flex-shrink-0"
              style={{ width: `${slideWidth}px`, flex: `0 0 ${slideWidth}px` }}
            >
              <FreelancerCard professional={p} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile dots */}
      <div className="flex justify-center mt-6 md:hidden">
        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentIndex === i
                  ? "bg-gray-800 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
