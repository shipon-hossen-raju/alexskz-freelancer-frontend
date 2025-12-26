"use client";
import CustomContainer from "@/components/ui/CustomContainer";
import Heading from "@/components/ui/Heading";
import { AiFillCheckCircle } from "react-icons/ai";

export default function page() {
  return (
    <div>
      <CustomContainer>
        <div className="flex flex-col gap-8 justify-center items-center">
          <div className="text-8xl text-green-600">
            <AiFillCheckCircle />
          </div>

          <Heading text="Subscription Successful!" />
        </div>
      </CustomContainer>
    </div>
  );
}
