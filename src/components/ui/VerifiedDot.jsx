import React from 'react'
import tick from '@/assets/icons/greenTick.svg'
import Image from 'node_modules/next/image'
import { TiTick } from "react-icons/ti";

export default function VerifiedDot() {
    return (
       
        <div className='bg-[#bcebc4] rounded-full p-0.5 w-5 h-5'>
                    <TiTick className="text-[#1e863a]"/>
                   </div>
    )
}
