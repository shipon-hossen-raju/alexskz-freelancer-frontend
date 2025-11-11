import CustomContainer from '@/components/ui/CustomContainer'
import React from 'react'

export default function loading() {
    return (
        <CustomContainer>
            <div className="col-span-full flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 [border-top-color:#144A6C] [border-bottom-color:#144A6C]"></div>
            </div>
        </CustomContainer>
    )
}
