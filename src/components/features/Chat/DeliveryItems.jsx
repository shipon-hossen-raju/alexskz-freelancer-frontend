import TealBtn from "@/components/ui/TealBtn";
import { useDeliverProjectMutation } from "@/redux/api/bookingApi";
import { convertDate, convertTime } from "@/utils/dateConverter";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function DeliveryItems({ deliveryData }) {
  const role = useSelector((state) => state.user?.role || null);
  const isUser = role === "USER";

  console.log("deliveryData 9 ", deliveryData);

  const desStructure =
    (deliveryData?.length &&
      deliveryData?.map((booking) => {
        const fullName = isUser
          ? `${booking?.service?.title ?? ""}`
          : `${booking?.user?.fullName ?? ""}`;
        const profileImage = isUser
          ? booking?.service?.thumbnail
          : booking?.user?.profileImage;

        return {
          id: booking.id,
          fullName: fullName,
          date: convertDate(booking?.dateTime),
          dateTime: convertTime(booking?.dateTime),
          category: isUser
            ? booking?.service?.category?.title
            : booking?.category?.title,
          profileImage: profileImage,
          bookingStatus: booking?.status,
        };
      })) ||
    [];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">
        {isUser ? "Project Received" : "Projects Deliveries"}
      </h3>

      <div className="space-y-4">
        {desStructure.map((booking) => (
          <Item key={booking.id} booking={booking} isUser={isUser} />
        ))}
      </div>
    </div>
  );
}

function Item({ booking, isUser }) {
  const [deliverProject, { isLoading }] = useDeliverProjectMutation();
  const [selectedId, setSelectedId] = useState("");
  const fullName = booking?.fullName;
  const date = booking?.date;
  const dateTime = booking?.dateTime;
  const category = booking?.category;
  const profileImage = booking?.profileImage;
  const bookingStatus = booking?.status;
  // const isLoading = false;

  console.log("booking 61 ", booking);

  const handleDeliverProject = async ({ bookingId }) => {
    if (!bookingId) return;
    setSelectedId(bookingId);
    console.log("delivering project", bookingId);
    await deliverProject({ bookingId });
  };
  return (
    <div className={`shadow p-2.5 rounded-[10px] flex flex-col`}>
      {/* Left Section - Profile and Details */}
      <div className="flex items-center gap-6">
        {/* Profile Image */}
        <img
          src={profileImage}
          alt={fullName}
          className="w-32 h-32 rounded-lg object-cover"
        />

        {/* Details */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">{fullName}</h2>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-500">
              {/* {icons.calendar} */}
              <span className="text-base">{date}</span>
            </div>
          </div>

          <p className="text-base text-gray-700">{category}</p>
        </div>
      </div>

      {/* Right Section - Status and Button */}
      <div className="flex items-center justify-end gap-4 ">
        <div className="flex items-center gap-2 text-gray-500">
          {/* {icons.clock} */}
          <span className="text-base">{dateTime}</span>
        </div>

        <span
          className={`px-4 py-1 text-sm font-medium rounded ${
            bookingStatus === "PENDING"
              ? "text-[#FFBA51] bg-[#FFCA7C26]"
              : bookingStatus === "COMPLETED"
              ? "text-[#00B74A] bg-[#00B74A33]"
              : bookingStatus === "CANCELED"
              ? "text-[#FF0000] bg-[#FF000033]"
              : bookingStatus === "CONFIRMED"
              ? "text-[#0690E7] bg-[#0690E733]"
              : ""
          }`}
        >
          {bookingStatus}
        </span>

        <div className="flex items-center justify-center gap-6">
          <TealBtn
            btnType="solid"
            onClick={() =>
              handleDeliverProject({
                bookingId: booking.id,
              })
            }
            isLoading={selectedId === booking.id && isLoading}
            className="!max-w-32"
            text={isUser ? "Accept" : "Deliver"}
            TealBtn
          />
        </div>
      </div>
    </div>
  );
}
