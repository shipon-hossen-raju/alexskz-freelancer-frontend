"use client";

import ServicePreviewModal from "@/components/modals/ServicePreviewModal";
import GreenPara from "@/components/ui/GreenPara";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useSelector } from "react-redux";

export default function PopularServiceCard({ service }) {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.user || null);
  const route = useRouter();

  const handleBooking = () => {
    if (!user) {

      toast.error("Please login to book a service");
      // after 1s redirect to login
      setTimeout(() => {
        route.push("/sign-in?redirect=/services");
      }, 2000);
      return
    } else {
      setOpen(true);
    }
  };

  const descriptionLength = 80;
  return (
    <div className="group">
      {/* Cover */}
      <div className="relative h-36 sm:h-40 rounded-xl overflow-hidden">
        <Link href={`/details/${service?.userId}`}>
          <Image
            src={service?.thumbnail}
            alt="service"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(min-width:1024px) 20vw, (min-width:640px) 33vw, 100vw"
          />
        </Link>
      </div>

      {/* Body */}
      <div className="mt-2.5">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 font-open-sans">
          {service?.title}
        </h3>

        {/* Description max 60 characters */}
        <p className="mt-1 text-[13px] font-open-sans">
          {`${service?.description?.slice(0, descriptionLength)} ${
            service?.description.length > descriptionLength ? "..." : ""
          }`}
        </p>
        <GreenPara text={`Starting at $${service?.price}`} />

        <button
          onClick={handleBooking}
          className="cursor-pointer font-open-sans mt-2 inline-flex items-center gap-2 text-base text-gray-700 font-medium hover:text-gray-700"
        >
          Book Now{" "}
          <span aria-hidden>
            <MdOutlineArrowOutward />
          </span>
        </button>
      </div>

      <ServicePreviewModal
        open={open}
        onClose={() => setOpen(false)}
        service={service}
      />
    </div>
  );
}
