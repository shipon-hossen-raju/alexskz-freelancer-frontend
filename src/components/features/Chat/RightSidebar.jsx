import React, { useState } from 'react'
import { Search, Video, Paperclip, Send, Download, Play, ChevronLeft } from "lucide-react"
import { useGetUserProfileQuery } from '@/redux/auth/authApi'
import Loading from '@/components/shared/Loading';
import TealBtn from '@/components/ui/TealBtn';
import Link from 'node_modules/next/link';

export default function RightSidebar({ receiver }) {
  const {data: userData, isLoading: isUserLoading, error: isUserError} = useGetUserProfileQuery();

  if(isUserLoading){
    return <Loading />
  }

  console.log('receiver', receiver)
  const role = userData?.data?.role;
  
  
    //   const [visible, setVisible] = useState(false);
  
    //   const [mobileView, setMobileView] = useState("sidebar")
  
    // const openModal = () => setVisible(true);
    // const closeModal = () => setVisible(false);
  
    // const handleConversationClick = () => {
    //   setMobileView("chat")
    // }
  
    // const handleAvatarClick = () => {
    //   setMobileView("profile")
    // }
  
    // const handleBackToChat = () => {
    //   setMobileView("chat")
    // }
  
    // const handleBackToSidebar = () => {
    //   setMobileView("sidebar")
    // }
  
  return (
    <div>
       
        {/* <div
          className={`w-full lg:w-80 border-l border-gray-200 flex flex-col 
            ${mobileView === "profile" ? "flex" : "hidden"} 
          lg:flex`}
        > */}
        <div
          className={`w-full lg:w-80 border-l border-gray-200 flex flex-col 
          lg:flex`}
        >
          <div className="p-6 text-center border-b border-gray-200">
            {/* <button onClick={handleBackToChat} className="lg:hidden mb-4 p-2 hover:bg-gray-100 rounded-lg"> */}
            {/* <button  className="lg:hidden mb-4 p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button> */}
            <img
            src={receiver?.profileImage}
              alt="User"
              className="w-24 h-24 rounded-full mx-auto mb-3"
            />
            <h2 className="text-xl font-bold text-gray-900 mb-4">{receiver?.firstName} {receiver?.lastName}</h2>
            {/* <p className="text-sm text-gray-500 mb-4">Online</p> */}
            <Link href={`/details/${receiver?.id}`} className="w-full border !border-[#144A6C] !text-[#144A6C] font-semibold font-open-sans py-2 rounded-lg hover:bg-blue-50 cursor-pointer px-4">
              View Profile
            </Link>
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
            {role === "USER" ? (
              // <TealBtn text="Accept Delivery" onClick={openModal} />
              <TealBtn text="Accept Delivery"  />
            ) : (
              <TealBtn text="Deliver the project" />
            )}
          </div>
        </div>
    </div>
  )
}
