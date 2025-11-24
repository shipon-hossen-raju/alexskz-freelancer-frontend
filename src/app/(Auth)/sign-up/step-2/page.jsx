'use client';

import { Form, Input, message, Avatar, Space } from 'antd';
import AuthShell from '@/components/shared/AuthShell';
import AuthButton from '@/components/ui/AuthButton';
import { useState } from 'react';
import Link from 'next/link';
import '@/styles/Auth.css'
import { Select } from 'antd';
import toast from 'react-hot-toast';

import { useParams, useRouter } from 'node_modules/next/navigation';
import { useGetAllCategoryQuery } from '@/redux/api/categoryApi';
import Loading from '@/components/shared/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useSignUpForProfessionalMutation } from '@/redux/auth/authApi';
import { clearInitialRole, clearStepOne } from '@/redux/auth/userSlice';



export default function RegisterPageStep2({  }) {
    const [form] = Form.useForm();
    const router = useRouter();
    const dispatch = useDispatch();
    const { data: categoryData, error, isLoading } = useGetAllCategoryQuery()
   
    const stepOneValues = useSelector((state) => state.user.stepOne ?? null)

    dispatch(clearInitialRole())

    const [signUpForProfessional, {isLoading: createUserLoading}] = useSignUpForProfessionalMutation();

    if (error) {
        throw new Error(error?.message);
    }

    if (isLoading) {
        return <Loading />
    }

    // console.log(error)

    const categories = categoryData?.data?.categories
    

    const onFinish = async (values) => {
        
        
        const payload = {
            firstName: stepOneValues.firstName,
            lastName: stepOneValues.lastName,
            password: stepOneValues.password,
            email: stepOneValues.email,
            address: stepOneValues.address,
            categoryId: values.category,
            experience: values.experience,
            language: values.language,
            role: "FREELANCER"
        }

        // console.log(payload)
        signUpForProfessional(payload)
        .unwrap()
        .then(() => {
          toast.success('Account created successfully');
          localStorage.setItem('email', payload.email)
          router.push('/verify-code');
       
        })
        .catch((error) =>{
          console.log(error)
          toast.error(error?.data?.message);
         
        })

    };





    return (
        <AuthShell
            title="Create a new account"
            subtitle={
                <>
                    Already have an account?{' '}
                    <Link href="/sign-in" className="text-[#1F4E78] hover:underline">
                        Sign in
                    </Link>
                </>
            }

            backHref="/sign-up"
            step="Step 2"

        >
            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={onFinish}

                className="[&_.ant-form-item-label>label]:text-[13px] [&_.ant-form-item]:mb-4"
            >

                <Form.Item
                    label="Categories"
                    name="category"
                    rules={[
                        { required: true, message: 'Please enter your category' },

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

                <div className='md:pt-6'>

                    <AuthButton htmlType="submit"  text={`${createUserLoading? "Creating Profile..." : "Create Profile"}`}>

                    </AuthButton>

                </div>
            </Form>
        </AuthShell>
    );
}
