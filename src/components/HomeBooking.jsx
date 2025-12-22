import BookingList from "@/app/(Home)/bookings/BookingList";
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi";
import Heading from "./ui/Heading";

export default function HomeBooking() {
  const { data: bookingData, isLoading: bookingLoading } =
    useGetAllBookingsQuery(
      [
        { name: "limit", value: 20 },
        { name: "page", value: 1 },
        { name: "status", value: "CONFIRMED" },
        // { name: "searchTerm", value: "" },
      ],
      {
        refetchOnMountOrArgChange: true,
      }
    );

  const rawBookings = bookingData?.data?.data || [];
  const total = bookingData?.data?.meta?.total || 0;


  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <Heading text="Upcoming Bookings" />
        </div>
        <p className=" text-[#030213] font-open-sans bg-[#ECEEF2] p-1 rounded-[8px]">
          {total} Total
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-10">
        <BookingList rawBookings={rawBookings} />
      </div>
    </div>
  );
}
