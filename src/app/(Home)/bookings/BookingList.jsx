import TealBtn from "@/components/ui/TealBtn";
import TealOutLineBtn from "@/components/ui/TealOutLineBtn";
import { useCreateBookingStatusForProfessionalMutation } from "@/redux/api/bookingApi";
import { Image } from "antd";
import { CiClock2 } from "react-icons/ci";
import { useSelector } from "react-redux";

export default function BookingList({ rawBookings = [] }) {
  const role = useSelector((state) => state.user?.role || null);
  if (!rawBookings.length) {
    return (
      <div className="py-10 text-center text-sm text-[#6b7280]">
        No bookings found
      </div>
    );
  }

  const isUser = role === "USER";
  const bookings = rawBookings.map((b) => {
    const parts = b.dateTime.split(" ");
    const userName = `${b.user?.firstName ?? ""}  ${b.user?.lastName ?? ""}`;
    const userId = b.user?.id;

    // console.log("user name b ", b);

    return {
      id: b.id,
      userId,
      name: userName,
      category: isUser ? b.service?.category?.title : b.user?.category?.title,
      date: parts[0],
      time: `${parts[1]} ${parts[2]}`,
      status: b.status.toLowerCase(),
      image: b.service?.thumbnail || b.user?.profileImage,
    };
  });

  return (
    <div className="space-y-6">
      {bookings.map((b) => (
        <BookingItem key={b.id} item={b} role={role} />
      ))}
    </div>
  );
}

/* -------------------- Booking Item -------------------- */
function BookingItem({ item, role }) {
  const [
    createBookingStatusForProfessional,
    { isLoading: isBookingStatusLoading },
  ] = useCreateBookingStatusForProfessionalMutation();

  const handleAcceptBooking = (id) => {
    const payload = {
      bookingId: id,
      status: "CONFIRMED",
    };

    createBookingStatusForProfessional(payload)
      .unwrap()
      .then((res) => {
        toast.success("Booking Confirmed!");
      })
      .catch((err) => {
        toast.error(err?.data?.message || "Failed!");
      });
  };

  const handleRejectBooking = (id) => {
    const payload = {
      bookingId: id,
      status: "CANCELED",
    };

    createBookingStatusForProfessional(payload)
      .unwrap()
      .then((res) => {
        toast.success("Booking Canceled!");
      })
      .catch((err) => {
        toast.error(err?.data?.message || "Failed!");
      });
  };

  const handleMessage = (userId) => {
    console.log("Message", userId);
    if (userId) {
      // window.location.href = `/messages/${item.userId}`;
      console.log("Message => ", userId);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-[0_6px_16px_rgba(14,35,37,0.06)] border border-[#e9eef0] p-4 flex items-center gap-6">
      {/* Image */}
      <div className="w-30 h-20 rounded-md overflow-hidden ">
        <Image
          src={item.image || img}
          alt={item.name}
          width={120}
          height={80}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="flex justify-between items-center w-full">
        <div>
          <div className="text-sm font-semibold text-[#0b1320]">
            {item.name}
          </div>

          {item.category && (
            <div className="mt-2 inline-block">
              <span className="text-xs font-medium px-2 py-1 rounded-md bg-[#e7f3e9] text-[#1e863a]">
                {item.category}
              </span>
            </div>
          )}

          <div className="mt-3 text-sm text-[#7b8590]">{item.date}</div>
        </div>

        {/* Time */}
        <div className="text-[#6b7280]">
          <div className="flex items-center gap-2">
            <CiClock2 />
            <span className="text-sm">{item.time}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-3">
          <StatusPill status={item.status} />

          {role === "USER" &&
            item.status !== "completed" &&
            item.status !== "pending" && (
              <TealBtn
                text={item.status === "canceled" ? "Reschedule" : "Message Now"}
              />
            )}

          {role === "FREELANCER" && item.status === "pending" && (
            <div className="flex gap-2">
              <TealOutLineBtn
                onClick={() => handleRejectBooking(item.id)}
                text="Reject"
                isLoading={isBookingStatusLoading && item.id}
              />
              <TealBtn
                onClick={() => handleAcceptBooking(item.id)}
                text="Accept"
                isLoading={isBookingStatusLoading && item.id}
              />
            </div>
          )}

          {role === "FREELANCER" && item.status === "confirmed" && (
            <TealBtn onClick={() => handleMessage(item?.userId)} text="Message Now" />
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------- Status Pill -------------------- */
function StatusPill({ status }) {
  const base = "text-xs font-medium px-3 py-1 rounded-lg border";

  switch (status) {
    case "confirmed":
      return (
        <span
          className={`${base} bg-[#e8f8ff] text-[#1e9bd6] border-[#e0f6ff]`}
        >
          Confirmed
        </span>
      );
    case "pending":
      return (
        <span
          className={`${base} bg-[#fff7ed] text-[#f59e0b] border-[#ffedd5]`}
        >
          Pending
        </span>
      );
    case "canceled":
      return (
        <span
          className={`${base} bg-[#fff3f3] text-[#f87272] border-[#ffecec]`}
        >
          Canceled
        </span>
      );
    case "completed":
      return (
        <span
          className={`${base} bg-[#f0fbf6] text-[#0f9d6a] border-[#e6f7ef]`}
        >
          Completed
        </span>
      );
    default:
      return (
        <span className={`${base} bg-gray-100 text-gray-700`}>{status}</span>
      );
  }
}
