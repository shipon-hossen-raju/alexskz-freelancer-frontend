import CustomContainer from '@/components/ui/CustomContainer'
import Heading from '@/components/ui/Heading';
import React from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function page() {
    return (
        <div>
            <CustomContainer>
                <div className='flex flex-col gap-8 justify-center items-center'>
                    <div className='text-8xl text-red-600'>
                        <AiOutlineCloseCircle />
                    </div>

                    <Heading text="Subscription Failed!" />
                </div>
            </CustomContainer>
        </div>
    )
}
