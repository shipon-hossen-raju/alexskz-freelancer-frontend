import { icons } from "@/assets/icons/icons";
import TealBtn from "@/components/ui/TealBtn";
import { useGetDeliveryProjectQuery } from "@/redux/api/bookingApi";
import {
  useGetChatFilesQuery,
  useGetMeetingFilesQuery,
} from "@/redux/api/chatApi";
import { Image, Modal } from "antd";
import { Download, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeliveryItems from "./DeliveryItems";

export default function ChattingHistorySide() {
  // Redux: selected conversation
  const {
    receiver,
    chatRoomId: roomId,
    unreadMessage,
  } = useSelector((state) => state.chat);
  const role = useSelector((state) => state.user?.role || null);
  const isUser = role === "USER";
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading } = useGetChatFilesQuery(roomId, {
    skip: !roomId,
  });
  const { data: getMeetingFiles, isLoading: isMeetingLoading } =
    useGetMeetingFilesQuery(receiver?.id, {
      skip: !receiver?.id,
    });
  const { data: deliveryRes } = useGetDeliveryProjectQuery(
    { receiverId: receiver?.id },
    {
      skip: !receiver?.id,
    }
  );
  const mediaFiles = data?.data;

  const meetingFiles = getMeetingFiles?.data;

  const downloadFile = (url) => {
    window.open(url, "_blank");
  };

  const deliveryData = deliveryRes?.data || [];
  const receiverImage = receiver?.profileImage || "";
  const receiverName = `${receiver?.firstName ?? ""} ${
    receiver?.lastName ?? ""
  }`;
  const isOnline = receiver?.isOnline;
  const profileId = receiver?.id;

  useEffect(() => {
    if (deliveryData?.length === 0) {
      setModalOpen(false);
    }
  }, [deliveryData?.length]);

  if (roomId) {
    return (
      <div
        className={` w-80 bg-white border-l border-gray-200 flex flex-col max-h-[88vh] overflow-y-auto no-scrollbar`}
      >
        <div className="p-6 text-center border-b border-gray-200">
          <img
            src={receiverImage}
            alt={receiverName}
            className="w-24 h-24 rounded-full mx-auto mb-3"
          />
          <h2 className="text-xl font-bold text-gray-900">{receiverName}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {isOnline ? "Online" : "Offline"}
          </p>
          <a
            href={`/details/${profileId}`}
            target="_blank"
            className="w-full border border-primary text-primary font-medium py-2 px-3 rounded-lg hover:bg-blue-50"
          >
            View Profile
          </a>
        </div>

        {/* Media File */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Media File
          </h3>

          {/* Responsive & Scrollable */}
          <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1 no-scrollbar">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-gray-300 aspect-square rounded-lg"
                  ></div>
                ))
              : mediaFiles?.map((file, index) => (
                  <div
                    key={index}
                    className="relative group rounded-lg overflow-hidden aspect-square bg-gray-200"
                  >
                    <Image
                      src={file}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 "
                    />
                  </div>
                ))}
          </div>
        </div>

        {/* Meeting Record */}
        <div className="p-6 flex-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Meeting Record
          </h3>

          <div className="space-y-4 max-h-64 overflow-y-auto no-scrollbar">
            {mediaFiles?.length > 0 && !isMeetingLoading
              ? meetingFiles?.map((meeting) => (
                  <div>
                    <div
                      key={meeting.id}
                      className="bg-gray-50 rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-500 rounded-lg p-2 text-white size-10">
                          {icons.videoCall}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-900">
                            {meeting.topic}
                          </h4>
                          <p className="text-xs text-gray-500">
                            Zoom Recording
                          </p>
                          {/* <p className="text-xs text-gray-500">45:32 • 285</p> */}
                        </div>
                        <button
                          onClick={() =>
                            downloadFile(meeting?.recordings?.downloadUrl)
                          }
                          className="p-2 hover:bg-gray-200 rounded-lg"
                        >
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <a
                        href={meeting?.recordings?.videoUrl}
                        target="_blank"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        Play
                      </a>
                    </div>
                  </div>
                ))
              : null}

            {/* loading skeleton */}
            {isMeetingLoading
              ? Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-gray-300 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500 rounded-lg p-2 text-white size-10">
                        {icons.videoCall}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900"></h4>
                        <p className="text-xs text-gray-500"></p>
                        {/* <p className="text-xs text-gray-500">45:32 • 285</p> */}
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>

        {/* Deliver Button */}
        <div className="p-6">
          {deliveryData?.length
            ? deliveryData?.length > 0 && (
                <div className="w-full">
                  <TealBtn
                    onClick={() => setModalOpen(true)}
                    text={isUser ? "Accept Deliveries" : "View Deliveries"}
                    className="!w-full"
                  />
                </div>
              )
            : null}
        </div>

        {/* Modal for Project Deliveries */}
        <Modal
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
          width={600}
        >
          <DeliveryItems deliveryData={deliveryData} />
        </Modal>
      </div>
    );
  }

  return null;
}
