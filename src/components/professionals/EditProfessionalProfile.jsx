import React from 'react'
import { useState } from 'react';
import SubHeadingBlack from '../ui/SubHeadingBlack'
import { Form, Input, Select, Checkbox } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import TealBtn from '@/components/ui/TealBtn';
import SkillsInput from '@/components/ui/SkillsInput';
import '@/styles/Auth.css'
import '@/styles/AntCheckBox.css'
import Loading from '../shared/Loading';
import { useGetUserProfileQuery } from '@/redux/auth/authApi';
import { useEditProfileMutation } from '@/redux/api/profileApi';
import { useGetAllCategoryQuery } from '@/redux/api/categoryApi';

export default function EditProfessionalProfile() {
    const [form] = Form.useForm();

    const { data: userData, error: userError, isLoading: isUserLoading } = useGetUserProfileQuery();
    const [editProfile, { isLoading }] = useEditProfileMutation();
    const { data: categoryData, error, isLoading: isCategoryLoading } = useGetAllCategoryQuery()

    if (isUserLoading || isLoading || isCategoryLoading) {
        return <Loading />
    }

    const categories = categoryData?.data?.categories


    const user = userData?.data;
    const firstName = user?.firstName;
    const lastName = user?.lastName;
    const email = user?.email;
    const address = user?.address ?? "";
    const category = user?.category?.title;
    const experience = user?.experience;
    const skills = user?.skills || [];
    const language = user?.language || "";
    const about = user?.about;
    const availableOnline = user?.availableOnline || false;
    const availabilityInPerson = user?.availabilityInPerson || false;



    console.log('from edit ', skills)

    const onFinish = (values) => {
        console.log('Save Changes:', values);
        const payload = {
            // firstName: values.firstName,
            // lastName: values.lastName,
            // jobTitle: values.job
        }

        editProfile(payload)
            .unwrap()
            .then(() => {
                toast.success("Profile updated successfully!")

            })
            .catch((error) => {
                toast.error(error?.data?.message);
            })

    };

    const initialAvailability = [
        availableOnline ? 'online' : null,
        availabilityInPerson ? "in-person" : null,
    ]

    return (
        <div>
            <SubHeadingBlack text="Edit  Profile" />

            {/* form */}
            <div className="w-full max-w-5xl mx-auto mt-10">
                <div className="py-10 lg:py-20 bg-white rounded-[12px] border border-[#E6E6E6] shadow-[0_12px_34px_rgba(0,0,0,0.08)] px-6 md:px-8 ">
                    <Form
                        form={form}
                        layout="vertical"
                        requiredMark={false}
                        onFinish={onFinish}
                        initialValues={{
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            address: address,
                            skills: [],
                            experience: experience,
                            language: language,
                            about: about,
                            category: category,
                            availability: initialAvailability,
                        }}
                        className="[&_.ant-form-item-label>label]:text-[13px] [&_.ant-form-item]:mb-4 !font-open-sans"
                    >
                        {/* grid rows */}
                        <div className="">



                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                                {/* 1st col */}
                                <div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <Form.Item
                                            label="First name"
                                            name="firstName"
                                            rules={[{ required: true, message: 'Please enter your first name' }]}
                                        >
                                            <Input size="large" placeholder="e.g. John" />
                                        </Form.Item>

                                        <Form.Item
                                            label="Last name"
                                            name="lastName"
                                            rules={[{ required: true, message: 'Please enter your last name' }]}
                                        >
                                            <Input size="large" placeholder="e.g. Doe" />
                                        </Form.Item>
                                    </div>




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

                                    <Form.Item
                                        label="Address"
                                        name="address"
                                        rules={[
                                            { required: true, message: 'Please enter your address' },

                                        ]}
                                    >
                                        <Input size="large" prefix={<EnvironmentOutlined />} placeholder="Dhaka ,Bangladesh" />
                                    </Form.Item>

                                    {/* Availability - full width */}
                                    <Form.Item
                                        className="md:col-span-2"
                                        label="Availability"
                                        name="availability"
                                        rules={[{ required: true, message: 'Please select at least one option' }]}
                                    >
                                        <Checkbox.Group>
                                            <Checkbox value="online" className="custom-green-checkbox">Online</Checkbox>
                                            <Checkbox value="in-person" className="custom-green-checkbox">In Person</Checkbox>
                                        </Checkbox.Group>
                                    </Form.Item>
                                </div>

                                {/* 2nd col */}
                                <div>
                                    <Form.Item
                                        label="Category"
                                        name="category"
                                        rules={[
                                            { required: true, message: 'Please select a category' },

                                        ]}
                                    >


                                        <Select size="large" placeholder="Please select a category" className="wa-select">
                                            {
                                                categories?.map((category) => {

                                                    return (
                                                        <Select.Option value={category.id}>{category.title}</Select.Option>
                                                    )

                                                })
                                            }
                                        </Select>


                                    </Form.Item>



                                    <Form.Item
                                        label="Experience"
                                        name="experience"
                                        rules={[
                                            { required: true, message: 'Please enter your experience in years' },

                                        ]}
                                    >
                                        <Input size="large" placeholder="5 years" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Language"
                                        name="language"
                                        rules={[{ required: true, message: 'Please enter your language' }]}
                                    >
                                        <Input size="large" placeholder="eg: Bangla, English" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Skills"
                                        name="skills"
                                        rules={[
                                            { required: true, message: 'Please enter your skills' },

                                        ]}
                                    >
                                        <SkillsInput skill={skills}/>
                                    </Form.Item>
                                </div>
                            </div>








                            {/* About Yourself - full width */}
                            <Form.Item
                                className="md:col-span-2"
                                label="About Yourself"
                                name="about"
                            >
                                <Input.TextArea
                                    placeholder="Type here...."
                                    autoSize={{ minRows: 6 }}
                                // className="!rounded-[8px]"
                                />
                            </Form.Item>


                        </div>

                        {/* Button centered */}
                        <div className="pt-4 flex justify-center">

                            <TealBtn htmlType="submit" text="Save Changes" />
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
