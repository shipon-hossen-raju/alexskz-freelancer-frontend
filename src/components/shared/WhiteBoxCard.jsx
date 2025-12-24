"use client";
// import { Calendar, MessageCircle, MessageCircleCode, Star } from "lucide-react";
import { motion } from "motion/react";

export default function WhiteBoxCard({ item = {} }) {
  return (
    <motion.div className="bg-white rounded-[10px] p-6 font-open-sans border border-black/10  hover:shadow-2xl cursor-pointer hover:border-[#8BCF9A]">
      <motion.div
        whileHover={{ y: 6, scale: 1.03 }}
        transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.9 }}
        className="space-y-2"
      >
        <div className="bg-[#8BCF9A1A] text-2xl w-10 h-10 flex items-center justify-center rounded-[10px]">
          {item.icon}          
        </div>

        <h2
          className={`${
            item.title === "Pending Request"
              ? "text-[#FFBA51]"
              : "text-[#6F6F6F]"
          }`}
        >
          {item.title}
        </h2>
        <p
          className={`${
            item.title === "Pending Request"
              ? "text-[#FFBA51] text-3xl"
              : "text-[#8BCF9A] text-3xl"
          }`}
        >
          {item.count}{" "}
        </p>
        <p className="text-[#717182] text-sm">{item.status}</p>
      </motion.div>
    </motion.div>
  );
}
