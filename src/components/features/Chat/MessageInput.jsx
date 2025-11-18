import React from 'react'
import { Input } from 'antd';
import {  Paperclip, Send } from "lucide-react"


export default function MessageInput() {
    
  return (
  
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
    
  )
}
