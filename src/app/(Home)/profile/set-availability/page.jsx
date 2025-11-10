

'use client'
import CustomContainer from '@/components/ui/CustomContainer'
import Link from 'next/link'
import React from 'react'
import { Divider } from 'antd';
import SubHeadingBlack from '@/components/ui/SubHeadingBlack';
import { Form, Input, Switch } from 'antd';
import TealBtn from '@/components/ui/TealBtn';
import "@/styles/AntSwitch.css"

export default function SetAvailabilityPage() {
    const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Save Changes:', values);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <CustomContainer>
            {/* links */}
            <div className='mb-8'>
                <Link href="/profile" className="font-nunito text-gray-400 font-medium">Profile</Link>
                <Divider type="vertical" />
                <Link href="" className="font-nunito text-gray-700 font-medium">Availability</Link>

            </div>

            {/* content */}


            <div className="w-full ">
                <SubHeadingBlack text="Set Availability" />
                <div className="mt-6 bg-white rounded-[12px] border border-[#E6E6E6] shadow-[0_12px_34px_rgba(0,0,0,0.08)] px-6 py-8">
                    {/* Title */}
                    

              {/* Form */}
                    <Form
                        form={form}
                        layout="vertical"
                        requiredMark={false}
                        onFinish={onFinish}
                        initialValues={{
                            // mondayStartTime: '9:00 AM',
                            // mondayEndTime: '5:00 PM',
                            // tuesdayStartTime: '9:00 AM',
                            // tuesdayEndTime: '5:00 PM',
                        }}
                        className="[&_.ant-form-item-label>label]:text-[13px] [&_.ant-form-item]:mb-0 !font-open-sans"
                    >

                        {/* Weekdays (from Monday to Saturday) */}
                        <div className="mt-6">
                            {days.map((day, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row items-center justify-between mb-4 py-4 px-4 rounded-lg border border-[#F0F2F3] bg-white">
                                    {/* Left: Day label */}
                                    <div className="w-1/6 min-w-[110px] text-center">
                                        <div className="text-[#202020] font-medium text-[18px]">{day}</div>
                                    </div>

                                    {/* Middle: three inputs with small labels stacked horizontally */}
                                    <div className=" text-center  lg:flex lg:gap-20 ">
                                        <div className='lg:flex gap-4'>
                                            <div className="flex flex-col ">
                                            <label className="text-[14px] text-[#848A8C] mb-2">Set Start time</label>
                                            <Form.Item name={`${day.toLowerCase()}StartTime`} className="m-0">
                                                <Input size="large" className="!w-22 !rounded-[6px] text-sm  !bg-[#E8EDF0] !border !border-gray-300 placeholder-[#9AA0A2]" placeholder="9:00 AM" />
                                            </Form.Item>
                                        </div>

                                        <div className="flex flex-col ">
                                            <label className="text-[14px] text-[#848A8C] mb-2 ">Set End time</label>
                                            <Form.Item name={`${day.toLowerCase()}EndTime`} className="m-0">
                                                <Input size="large" className="!w-22 !rounded-[6px] text-sm  !bg-[#E8EDF0] !border !border-gray-300 placeholder-[#9AA0A2]" placeholder="5:00 PM" />
                                            </Form.Item>
                                        </div>
                                        </div>

                                        <div className="flex flex-col ">
                                            <label className="text-[14px] text-[#848A8C] mb-2">Max appointment per day</label>
                                            <Form.Item name={`${day.toLowerCase()}MaxAppointment`} className="m-0">
                                                <Input size="large" className=" !rounded-[6px] text-sm  !bg-[#E8EDF0] !border !border-gray-300 placeholder-[#9AA0A2]" placeholder="Type here" />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    {/* Right: Toggle in its own small area */}
                                    <div className=" ">
                                        <Form.Item name={`${day.toLowerCase()}Toggle`} valuePropName="checked" className="m-0">
                                            <div className="">
                                                <Switch size="" />
                                            </div>
                                        </Form.Item>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Save Button */}
                        <div className="mt-6 flex justify-center">
                            <TealBtn htmlType="submit" text="Save Changes" className="shadow-[0_10px_18px_rgba(20,74,108,0.28)]" />
                        </div>
                    </Form>
                </div>
            </div>

        </CustomContainer>
    )
}

