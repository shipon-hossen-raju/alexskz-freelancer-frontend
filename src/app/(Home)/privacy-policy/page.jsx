'use client'
import Loading from '@/components/shared/Loading';
import CustomContainer from '@/components/ui/CustomContainer'
import Heading from '@/components/ui/Heading'
import Paragraph from '@/components/ui/Paragraph'
import { useGetPrivacyPolicyQuery } from '@/redux/api/legalApi';
import React from 'react'

export default function PrivacyPolicyPage() {
    const { data, isError, error, isLoading } = useGetPrivacyPolicyQuery();

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        throw new Error(error?.data?.message)
    }
    const content = data?.data?.content;

    return (
        <CustomContainer >
            <div className='space-y-4 lg:space-y-8'>
                {/* Heading */}
                <div>
                    <Heading text="Privacy Policy" />
                </div>

                {/* para one */}

                <div
                    dangerouslySetInnerHTML={{
                        __html: content || 'No Privacy Policy available.',
                    }}
                    className="text-justify"
                ></div>

                
            </div>
        </CustomContainer>
    )
}
