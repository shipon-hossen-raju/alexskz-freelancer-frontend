'use client';

import CustomContainer from '@/components/ui/CustomContainer'
import React from 'react'

import { Form, Input, message } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import AuthButton from '@/components/ui/AuthButton';
import { useState } from 'react';
import '@/styles/Auth.css'
import { useGetContactUsQuery, useGetInTouchMutation } from '@/redux/api/legalApi';
import Loading from '@/components/shared/Loading';
import toast from 'react-hot-toast';

export default function ContactPage() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { data: contactUsData, error: contactUsError, isLoading: contactUsIsLoading } = useGetContactUsQuery();
    const [getInTouch, { isLoading }] = useGetInTouchMutation();

    if (contactUsIsLoading) {
        return <Loading />
    }

    const contactData = contactUsData?.data;

    const onFinish = async (values) => {
        // console.log('contact us from', values)
        const payload = {
            name: values.name,
            email: values.email,
            contactNo: values.phone,
            subject: values.subject,
            opinions: values.message
        }

        getInTouch(payload)
            .unwrap()
            .then(() => {
                toast.success("Your message is sent successfully!")
                form.resetFields()
            })
            .catch((error) => {
                // console.log(error)
                toast.error(error?.data?.message);

            })
    };


    return (
        <CustomContainer >

            <div className=' bg-white py-8 rounded-2xl shadow-lg '>
                <div className="mx-auto max-w-2xl px-4">
                    {/* Top contact info */}
                    <div className='flex flex-col gap-4 md:flex-row md:justify-between mb-10 lg:mb-14'>
                        {/* 1st col */}
                        <div className='flex gap-2'>
                            <div className='flex gap-1  items-start'>
                                <MailOutlined className="!text-[#8BCF9A] pt-1" />
                                <p className='text-[#8BCF9A] font-open-sans'>Email:</p>
                            </div>

                            <div>

                                {Array.isArray(contactData) && contactData.map(d => {
                                    if (d?.type !== 'GENERAL') return null;
                                    return (
                                        <p key={d.id ?? d.value} className='text-[#6F6F6F] font-open-sans'>
                                            {d.value ?? ''}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 2nd col */}
                        <div className='flex gap-2'>
                            <div className='flex gap-1  items-start'>
                                <PhoneOutlined className="!text-[#8BCF9A] pt-1" />
                                <p className='text-[#8BCF9A] font-open-sans'>Phone:</p>
                            </div>

                            <div>
                                <p className='text-[#6F6F6F] font-open-sans'>( +1 ) (888) 750-6866</p>
                                <p className='text-[#6F6F6F] font-open-sans'>( +1 ) (888) 785-3986</p>
                            </div>
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-center text-3xl md:text-[34px] font-semibold text-[#202020] font-open-sans">
                        Get in Touch
                    </h1>
                    <p className="text-center font-open-sans lg:text-[18px] text-[#6F6F6F] mt-4">Contact with us</p>

                    {/* Form */}
                    <div className="mt-6 md:mt-8">
                        <Form
                            form={form}
                            layout="vertical"
                            requiredMark={false}
                            onFinish={onFinish}
                            className="[&_.ant-form-item-label>label]:text-[13px] [&_.ant-form-item-label>label]:font-medium"
                        >
                            {/* Name */}
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please enter your first name' }]}
                            >
                                <Input size="large" placeholder="e.g. John Doe" />
                            </Form.Item>

                            {/* Email */}
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Please enter your email' },
                                    { type: 'email', message: 'Enter a valid email' },
                                ]}
                            >
                                <Input size="large" placeholder="you@example.com" />
                            </Form.Item>

                            {/* Phone */}
                            <Form.Item
                                label="Contact no"
                                name="phone"

                                rules={[
                                    { required: true, message: 'Enter your contact number' },
                                    { pattern: /^[0-9\s\-()+]{6,20}$/, message: 'Enter a valid phone number' },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="+1 111 467 378 399"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Subject"
                                name="subject"
                                rules={[{ required: true, message: 'Please enter a subject' }]}
                                className="mb-4"
                            >
                                <Input
                                    size="large"
                                    placeholder="Type here.."
                                    className="rounded-md"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Opinions"
                                name="message"
                                rules={[{ required: true, message: 'Please write your message' }]}
                                className="mb-5"
                            >
                                <Input.TextArea
                                    rows={6}
                                    placeholder="What can we help with?"
                                    className="rounded-md"
                                />
                            </Form.Item>

                            {/* Send button */}
                            <div className="pt-1">
                                <AuthButton text={isLoading? "Sending..." : "Send" } />
                            </div>
                        </Form>
                    </div>
                </div>
            </div>

        </CustomContainer>
    )
}
