"use client";

import { SlidersOutlined } from "@ant-design/icons";
import { useState } from "react";
import FiltersModal from "../modals/FiltersModal";
import CustomSearch from "./CustomSearch";

export default function SearchWithFilter({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const submit = (e) => {
    e?.preventDefault();
    onSearch?.(searchQuery.trim());
  };

  console.log("open - ", open);

  return (
    <div
      div
      className="font-open-sans flex flex-col gap-4 md:flex-row items-center md:gap-2 w-full"
    >
      <CustomSearch onSearch={setSearchQuery}  />
      <form onSubmit={submit}>
        {/* Separate Filter button (opens modal) */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 h-10 lg:h-12 rounded-[8px] bg-white shadow ring-1 ring-black/5 px-3 sm:px-4 text-[14px] text-gray-700 hover:bg-gray-50 cursor-pointer"
          aria-label="Open filters"
        >
          <span className="inline-flex items-center gap-2">
            <SlidersOutlined className="text-[16px]" />
            <span>Filter</span>
          </span>
        </button>
      </form>

     
    </div>
  );
}
