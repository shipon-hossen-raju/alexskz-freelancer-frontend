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

    return (
        <CustomContainer >
            <div className='space-y-4 lg:space-y-8'>
                {/* Heading */}
                <div>
                    <Heading text="Privacy Policy" />
                </div>

                {/* para one */}
                <div>
                    <Paragraph text={data?.data?.content}/>
                </div>

                {/* <div>
                    <Paragraph text="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum." />
                </div> */}
            </div>
        </CustomContainer>
    )
}
