"use client";

import { useEffect, useState } from "react";

import { setSearchTerm } from "@/redux/slices/filterSlice";
import { SearchOutlined, SlidersOutlined } from "@ant-design/icons";
import { useRouter } from "node_modules/next/navigation";
import { useDispatch, useSelector } from "react-redux";
import FiltersModal from "../modals/FiltersModal";

export default function CustomSearch({ categorySlug = null }) {
  const searchTerm = useSelector((state) => state.filter?.searchTerm);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();

  console.log("searchTerm 18 ✅ => ", searchTerm);

  const submit = (e) => {
    // console.log('custom search', q)
    e?.preventDefault();
    const term = q.trim();
    // onSearch?.(term);

    console.log("term-", term);

    if (term) {
      // onSearch?.(term);
      dispatch(setSearchTerm(term));
    }
  };

  // after 3s seconds close the modal
  useEffect(() => {
    setTimeout(() => {
      if (q) dispatch(setSearchTerm(q));
    }, 2000);
  }, [q]);

  return (
    <div className="w-full">
      <form onSubmit={submit} className={``}>
        {/* Input shell */}
        <label className="sr-only" htmlFor="global-search">
          Search
        </label>

        <div className="flex items-center bg-white rounded-[8px] shadow ring-1 ring-black/5 w-full h-10 md:h-12 ">
          <span className="pl-3 sm:pl-4 pr-2 text-gray-500 text-[16px] sm:text-[18px]">
            <SearchOutlined />
          </span>

          <input
            id="global-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by service, skill or keyword..."
            aria-label="Search by service, skill or keyword"
            className="flex-1 bg-transparent outline-none text-[14px] sm:text-[15px] text-gray-800 placeholder:text-gray-400"
          />

          <button
            type="button"
            aria-label="More filters"
            className="shrink-0 mx-2 h-8 w-8 grid place-items-center rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(true)}
          >
            <SlidersOutlined className="text-[16px]" />
          </button>
        </div>
      </form>

      {/* Modal */}
      <FiltersModal
        open={open}
        onClose={() => setOpen(false)}
        onApply={() => setOpen(false)}
        categorySlug={categorySlug}
      />
    </div>
  );
}
