"use client";

import CustomContainer from "@/components/ui/CustomContainer";
import "@/styles/AntSwitch.css";
import { useState } from "react";

import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import { Switch } from "antd";
import { useSelector } from "react-redux";
import BookingList from "./BookingList";

/* -------------------- Main Page -------------------- */
export default function BookingsPage() {
  const role = useSelector((state) => state.user?.role || null);
  const [activeTab, setActiveTab] = useState("CONFIRMED");
  const { data: bookingData, isLoading: bookingLoading } =
    useGetAllBookingsQuery(
      [
        { name: "limit", value: 30 },
        { name: "page", value: 1 },
        { name: "status", value: activeTab },
        // { name: "searchTerm", value: "" },
      ],
      {
        refetchOnMountOrArgChange: true,
      }
    );

  const rawBookings = bookingData?.data?.data || [];

  return (
    <CustomContainer>
      <div className="min-h-[80vh]">
        <div className="flex items-center justify-between">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="font-bold text-2xl lg:text-3xl">
              {role === "USER" ? "My Bookings & Purchases" : "My Bookings"}
            </h1>
          </div>

          {/* Tabs */}
          <div
            className={`flex mb-6 flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-0`}
          >
            {role === "FREELANCER" ? (
              <div className="flex gap-4 mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <Switch />
                  <label id="clientBookings" className="font-semibold">
                    Client Bookings
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch />
                  <label id="adminServices" className="font-semibold">
                    Admin Services
                  </label>
                </div>
              </div>
            ) : (
              <TabsPill
                active={activeTab}
                setActive={setActiveTab}
                role={role}
              />
            )}
          </div>
        </div>
        {role === "FREELANCER" && (
          <div className="mb-6">
            <TabsPill active={activeTab} setActive={setActiveTab} role={role} />
          </div>
        )}

        {/* Content */}
        <BookingList rawBookings={rawBookings} isLoading={bookingLoading} />
      </div>
    </CustomContainer>
  );
}

/* -------------------- Tabs Pill -------------------- */
function TabsPill({ active, setActive, role }) {
  const tabs = [
    { key: "CONFIRMED", label: "Upcoming" },
    { key: "PENDING", label: "Pending" },
    { key: "CANCELED", label: "Canceled" },
    {
      key: "DELIVER_REQUEST",
      label: role === "USER" ? "Deliver Request" : "Delivered",
    },
    { key: "COMPLETED", label: "Completed" },
  ];

  return (
    <div className="inline-flex items-center bg-[#EEF1F2] rounded-[8px] p-1 gap-1 cursor-pointer">
      {tabs.map((t) => {
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`text-sm font-medium px-6 py-2 rounded-[8px] transition-all cursor-pointer
              ${
                isActive
                  ? "bg-white text-[#0b1320] shadow-[0_4px_10px_rgba(3,18,26,0.08)]"
                  : "text-[#69707a]"
              }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
