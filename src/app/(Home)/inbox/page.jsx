"use client";
import ChatSidebar from "@/components/features/Chat/ChatSidebar";
import ChatWindow from "@/components/features/Chat/ChatWindow";
import ChattingHistorySide from "@/components/features/Chat/RightSidebar";
import RateReviewModal from "@/components/modals/RateReviewModal";
import CustomContainer from "@/components/ui/CustomContainer";
import "@/styles/Auth.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const MessagingInterface = () => {
  const user = useSelector((state) => state.user.user ?? null);
  const receiver = useSelector((state) => state.chat.receiver ?? null);
  const [mobileView, setMobileView] = useState("sidebar");
  const [visible, setVisible] = useState(false);
  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const handleConversationClick = () => {
    setMobileView("chat");
  };

  const handleAvatarClick = () => {
    setMobileView("profile");
  };

  const handleBackToSidebar = () => {
    setMobileView("sidebar");
  };

  console.log("mobileView -", mobileView);

  return (
    <CustomContainer>
      <div className="flex min-h-screen bg-white rounded-md font-poppins ">
        {/* Left Sidebar - Inbox */}
        <div
          className={`hidden ${
            mobileView === "sidebar" ? "!block" : "!hidden sm:!block"
          }`}
        >
          <ChatSidebar onBack={handleConversationClick} />
        </div>

        {receiver?.id ? (
          <>
            {/* Main Chat Area */}
            <div className="flex-1">
              <ChatWindow onBack={handleBackToSidebar} />
            </div>

            {/* Right Sidebar - Profile responsive view hidden */}
            <div
              className={`hidden sm:block ${
                mobileView === "sidebar" ? "!block" : "!hidden sm:!block"
              }`}
            >
              <ChattingHistorySide />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              No Conversation Selected
            </h1>
            <p className="text-gray-600">
              Please select a conversation to start messaging.
            </p>
          </div>
        )}
      </div>

      <RateReviewModal />
    </CustomContainer>
  );
};

export default MessagingInterface;
