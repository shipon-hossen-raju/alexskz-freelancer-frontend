"use client";

import SkeletonNotificationLoader from "@/components/loader/SkeletonNotificationLoader";
import NoDataFount from "@/components/notFount/NoDataFount";
import {
  useGetNotificationQuery,
  useGetSingleNotificationMutation,
  useMarkAsReadMutation,
} from "@/redux/api/notificationApi";
import { setBookingFromNotification } from "@/redux/slices/bookingSlice";
import { convertDate, convertTime } from "@/utils/dateConverter";
import { Pagination } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function NotificationPage() {
  const dispatch = useDispatch();
  const [isId, setIsId] = useState();
  const [paginate, setPaginate] = useState({
    current: 1,
    pageSize: 10,
  });
  const navigate = useRouter();
  const [getSingleNotification, { isLoading: isDetailsLoading }] =
    useGetSingleNotificationMutation();
  const [markAsRead, { isLoading: isMarkLoading }] = useMarkAsReadMutation();
  const { data, isLoading, isError } = useGetNotificationQuery([
    { name: "page", value: paginate.current },
    { name: "limit", value: paginate.pageSize },
  ]);

  const notifications = data?.data?.notifications;
  const meta = data?.data?.meta || {};

  // filter unread notifications
  const unreadNotifications =
    notifications?.filter((notification) => notification?.isRead === false) ||
    [];
  const readNotifications =
    notifications?.filter((notification) => notification?.isRead === true) ||
    [];
  const allNotifications = [...unreadNotifications, ...readNotifications];

  // data structure and sorting
  const dataSource = allNotifications?.map((recently, index) => ({
    key: index,
    serial: Number(index + 1),
    _id: recently?.id,
    createdAt: convertTime(recently?.createdAt),
    createDate: convertDate(recently?.createdAt),
    type: recently?.type,
    message_prefix: recently?.title,
    highlight_text: recently?.body,
    isRead: recently?.isRead,
  }));

  // const dateTime = convertTime(booking.dateTime);
  const handleView = async (id) => {
    if (id) {
      setIsId(id);
      const res = await getSingleNotification(id).unwrap();
      const data = res?.data;

      console.log("data ", data);

      if (
        data?.type === "BOOKING_REQUEST" ||
        data?.type === "BOOKING_DELIVER" ||
        data?.type === "BOOKING_ACCEPT"
      ) {
        console.log("data?.details ", data?.details);
        // navigate.push(`/bookings?bookingId=${data?.id}`);
        if (data?.details) {
          dispatch(setBookingFromNotification(data?.details));
          navigate.push(`/bookings`);
        }
      }

      if (data?.type === "SUBSCRIPTION_FREELANCER") {
        navigate.push(`/profile/subscription`);
      }
    }
  };

  const handleMarkAsRead = async () => {
    await markAsRead(undefined).unwrap();
  };

  // pagination
  const handlePagination = (data) => {
    setPaginate({ current: data, pageSize: paginate.pageSize });
  };

  // if (isError) {
  //   return <ServerErrorCard />;
  // }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 ">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-4xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-semibold text-gray-900">Notification</h1>
          <button
            onClick={() => handleMarkAsRead()}
            className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer"
          >
            Mark as Read
          </button>
        </div>

        {/* Notification Items */}
        <div className="max-w-full">
          {isLoading || isMarkLoading ? (
            // If data is still loading, show the skeleton loader
            <>
              <SkeletonNotificationLoader />
            </>
          ) : (
            <div>
              {/* <div className="space-y-4"> */}
              {dataSource.length > 0 ? (
                <div>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {dataSource?.map((ra) => (
                      <div
                        key={ra?._id}
                        className={`flex justify-between items-center rounded-lg  border border-[#144a6c1a] hover:bg-[#8bcf9a98] transition-all duration-300 py-3 px-4 ${
                          !ra.isRead ? "bg-[#8bcf9a27]" : "bg-white"
                        }`}
                      >
                        <div className="flex-1 flex justify-between">
                          {/* Message (prefix + highlight text) */}
                          <div className="w-full max-w-[300px] flex-1 space-y-3">
                            <p className="text-sm font-medium text-gray-800">
                              {ra?.message_prefix}
                            </p>
                            <p className="text-sm text-gray-500">
                              {ra?.highlight_text}
                            </p>
                          </div>

                          {/* Created date */}
                          <div className="w-full max-w-[300px] flex-1 space-y-3">
                            <p className="text-sm font-medium text-gray-800">
                              {ra?.createdAt}
                            </p>
                            <p className="text-sm text-gray-500">
                              {ra?.createDate}
                            </p>
                          </div>
                        </div>

                        {/* View button */}
                        <div className="w-24 flex justify-end">
                          <button
                            onClick={() => handleView(ra?._id)}
                            className="text-sm text-[#144a6c] py-1 px-3 rounded-[4px] border border-[#144a6c] hover:bg-[#144A6CE6] hover:text-white transition disabled:cursor-not-allowed cursor-pointer"
                            disabled={isLoading}
                          >
                            {isId === ra?._id && isDetailsLoading
                              ? "Viewing..."
                              : "View"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-6">
                    <Pagination
                      onChange={handlePagination}
                      current={paginate.current}
                      pageSize={paginate.pageSize}
                      total={meta?.total}
                    />
                  </div>
                </div>
              ) : (
                <NoDataFount text="No Notification Found!" />
              )}
              {/* </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
