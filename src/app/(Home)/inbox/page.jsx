"use client";
import ChatSidebar from "@/components/features/Chat/ChatSidebar";
import ChatWindow from "@/components/features/Chat/ChatWindow";
import RightSidebar from "@/components/features/Chat/RightSidebar";
import RateReviewModal from "@/components/modals/RateReviewModal";
import CustomContainer from "@/components/ui/CustomContainer";
import "@/styles/Auth.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const MessagingInterface = () => {
  const user = useSelector((state) => state.user.user ?? null);
  const role = useSelector((state) => state.user.role ?? null);

  const [visible, setVisible] = useState(false);

  const [mobileView, setMobileView] = useState("sidebar");

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const handleConversationClick = () => {
    setMobileView("chat");
  };

  const handleAvatarClick = () => {
    setMobileView("profile");
  };

  const handleBackToChat = () => {
    setMobileView("chat");
  };

  const handleBackToSidebar = () => {
    setMobileView("sidebar");
  };

  return (
    <CustomContainer>
      <div className="flex min-h-screen bg-white rounded-md font-poppins ">
        {/* Left Sidebar - Inbox */}
        <div className="">
          <ChatSidebar />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1">
          <ChatWindow />
        </div>

        {/* Right Sidebar - Profile */}

        <div>
          <RightSidebar />
        </div>
      </div>

      <RateReviewModal
        visible={visible}
        onCancel={closeModal}
        // onSubmit={handleSubmit}
      />
    </CustomContainer>
  );
};

export default MessagingInterface;
