"use client";

import { useState } from "react";
import CustomSearch from "../ui/CustomSearch";
import TealBtn from "../ui/TealBtn";

export default function SearchField({ onSearch, className = "" }) {
  const [q, setQ] = useState("");

  const submit = (e) => {
    e?.preventDefault();
    onSearch?.(q.trim());
  };

  return (
    <div
      className={`mt-4 sm:mt-6 flex flex-col gap-4 md:gap-2 sm:flex-row sm:items-center ${className}`}
    >
      <div>
        <CustomSearch />
      </div>
      <form onSubmit={submit}>
        {/* Find expert button */}
        <div className="sm:ml-2 w-full sm:w-auto">
          <TealBtn
            onClick={submit}
            text="Find a pro"
            className="w-full sm:w-auto h-11 sm:h-[50px] px-4 sm:px-6 text-sm sm:text-base"
          />
        </div>
      </form>
    </div>
  );
}
