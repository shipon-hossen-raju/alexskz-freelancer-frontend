'use client'
import React, { useState } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import TealBtn from "@/components/ui/TealBtn";
import { useSelector } from "react-redux";
import RateReviewModal from "@/components/modals/RateReviewModal";
import { Search, Video, Paperclip, Send, Download, Play, ChevronLeft } from "lucide-react"
import { Input } from 'antd';
import '@/styles/Auth.css'

const MessagingInterface = () => {
    const user = useSelector((state) => state.user.user ?? null);
    const role = useSelector((state) => state.user.role ?? null);

    const [visible, setVisible] = useState(false);

    const [mobileView, setMobileView] = useState("sidebar")

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const handleConversationClick = () => {
    setMobileView("chat")
  }

  const handleAvatarClick = () => {
    setMobileView("profile")
  }

  const handleBackToChat = () => {
    setMobileView("chat")
  }

  const handleBackToSidebar = () => {
    setMobileView("sidebar")
  }


  return (
    

  <CustomContainer>
      <div className="flex min-h-screen bg-white rounded-md font-poppins ">
        {/* Left Sidebar - Inbox */}
        <div
          className={`w-full lg:w-80 border-r border-gray-200 flex flex-col ${
            mobileView === "sidebar" ? "flex" : "hidden"
          } lg:flex`}
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Inbox</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#144A6C]"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto">
            {/* Contact 1 - Online */}
            <div
              onClick={handleConversationClick}
              className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 cursor-pointer"
            >
              <div className="relative">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=ahamad1"
                  alt="Ahamad musa"
                  className="w-12 h-12 rounded-full"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">Ahamad musa</h3>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
                <p className="text-xs text-gray-500 truncate">tur risus ut neque tellus vitae....</p>
              </div>
            </div>

            {/* Contact 2 - 6 min ago */}
            <div
              onClick={handleConversationClick}
              className="flex items-center gap-3 px-6 py-4 hover:bg-gray-50 cursor-pointer"
            >
              <div className="relative">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=ahamad2"
                  alt="Ahamad musa"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">Ahamad musa</h3>
                  <span className="text-xs text-gray-500">6 min ago</span>
                </div>
                <p className="text-xs text-gray-500 truncate">tur risus ut neque tellus vitae....</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
  <div className={`flex-1 flex flex-col ${mobileView === "chat" ? "flex" : "hidden"} lg:flex`}>
          {/* Chat Header */}
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center  flex-1">
              <button onClick={handleBackToSidebar} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
             <button className="flex items-center gap-2 cursor-pointer" onClick={handleAvatarClick}>
               <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=ahamad1"
                alt="Ahamad musa"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Ahamad musa</h2>
                <p className="text-sm text-gray-500 flex">Online</p>
              </div>
             </button>
            </div>
           
            <button className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg">
              <Video className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-hidden px-4 py-6 space-y-8">
            {/* Message 1 - Other user */}
            <div className="flex items-start gap-3">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=other1"
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={handleAvatarClick}
            />
              <div>
              <div className="bg-gray-200 rounded-2xl rounded-tl-none px-4 py-3 ">
                  <p className="text-sm text-gray-800">Hlw Jhon, How Can I Help You??</p>
                </div>
                <p className="text-xs text-gray-400 mt-1 ml-2">Musa-9:30 Pm</p>
              </div>
            </div>

            {/* Message 2 - Current user */}
            <div className="flex gap-3 justify-end">
              <div>
                <div className=" bg-green-100 rounded-2xl rounded-tr-none px-4 py-3 ">
                  <p className="text-sm text-gray-800">Hlw Jhon, How Can I Help You??</p>
                </div>
                <p className="text-xs text-gray-400 mt-1 mr-2 text-right">You-9:30</p>
              </div>
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=ahamad1"
                alt="You"
                className="w-10 h-10 rounded-full cursor-pointer border"
                onClick={handleAvatarClick}
              />
            </div>

            {/* Message 3 - Other user */}
            <div className="flex items-start gap-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=other1"
                alt="User"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={handleAvatarClick}
              />
              <div>
                <div className="bg-gray-200 rounded-2xl rounded-tl-none px-4 py-3 ">
                  <p className="text-sm text-gray-800">Hlw Jhon, How Can I Help You??</p>
                </div>
                <p className="text-xs text-gray-400 mt-1 ml-2">Sanvar-9:30 Pm</p>
              </div>
            </div>

            {/* Meeting Card */}
            <div className="flex justify-end">
              <div className="flex flex-col md:flex-row items-center gap-4 border border-gray-200 rounded-xl p-4 max-w-full md:max-w-md shadow-sm">
                <div className="bg-blue-500 rounded-lg p-3">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-sm font-semibold text-gray-900">Project Sync - Q4 Planning</h4>
                  <p className="text-xs text-gray-500">Zoom Meeting</p>
                  <p className="text-xs text-gray-500">Tuesday, Oct 21, 2025 • 2:00 PM - 3:00 PI</p>
                </div>
                <button className="bg-[#1DBF73] cursor-pointer text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2">
                  Join
                </button>
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=ahamad1"
                  alt="You"
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </div>

            <p className="text-xs text-gray-400 text-right mr-2">You-9:30</p>

            {/* Unread Messages Indicator */}
            <div className="flex items-center justify-center py-2">
              <div className="border border-gray-200 rounded-full px-4 py-1 text-xs text-gray-600 shadow-sm">
                2 unread messages
              </div>
            </div>

            {/* Message 4 - Other user */}
            <div className="flex items-start gap-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=other1"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div className="bg-gray-200 rounded-2xl rounded-tl-none px-4 py-3 ">
                <p className="text-sm text-gray-800">Hlw Jhon, How Can I Help You??</p>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center gap-3">
            
              <Input size="large" placeholder="Send Message" />
              <button className="p-3 hover:bg-gray-100 rounded-full cursor-pointer">
                <Paperclip className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-3 bg-[#144A6C] cursor-pointer rounded-full">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Profile */}
        <div
          className={`w-full lg:w-80 border-l border-gray-200 flex flex-col ${
            mobileView === "profile" ? "flex" : "hidden"
          } lg:flex`}
        >
          <div className="p-6 text-center border-b border-gray-200">
            <button onClick={handleBackToChat} className="lg:hidden mb-4 p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=ahamad1"
              alt="Ahamad musa"
              className="w-24 h-24 rounded-full mx-auto mb-3"
            />
            <h2 className="text-xl font-bold text-gray-900">Ahamad musa</h2>
            <p className="text-sm text-gray-500 mb-4">Online</p>
            <button className="w-full border border-[#144A6C] text-[#144A6C] font-semibold font-open-sans py-2 rounded-lg hover:bg-blue-50 cursor-pointer">
              View Profile
            </button>
          </div>

          {/* Media File */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Media File</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=200&fit=crop"
                  alt="Finance"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <span className="text-white text-xs font-semibold">FINANCE</span>
                </div>
              </div>
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=200&h=200&fit=crop"
                  alt="Workspace"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop"
                  alt="Person"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Meeting Record */}
          <div className="p-6 flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Meeting Record</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 rounded-lg p-2">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">Finance meeting</h4>
                  <p className="text-xs text-gray-500">Zoom Recording</p>
                  <p className="text-xs text-gray-500">45:32 • 285</p>
                </div>
                <button className="p-2 hover:bg-gray-200 rounded-lg">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <button className="w-full bg-[#1DBF73] cursor-pointer text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2">
                <Play className="w-4 h-4 fill-white" />
                Play
              </button>
            </div>
          </div>

          {/* Deliver Button */}
          <div className="p-6 flex justify-center">
            {role === "Client" ? (
              <TealBtn text="Accept Delivery" onClick={openModal} />
            ) : (
              <TealBtn text="Deliver the project" />
            )}
          </div>
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
