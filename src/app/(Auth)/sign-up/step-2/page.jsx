'use client';

import { Form, Input, message, Avatar, Space } from 'antd';
import AuthShell from '@/components/shared/AuthShell';
import AuthButton from '@/components/ui/AuthButton';
import { useState } from 'react';
import Link from 'next/link';
import '@/styles/Auth.css'
import { Select } from 'antd';


import { useRouter } from 'node_modules/next/navigation';



export default function RegisterPageStep2() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);


    const router = useRouter();




    const onFinish = async (values) => {

        console.log(values)

        setLoading(true);
        try {
            // TODO: signup
            message.success('Account created successfully');
        } finally {
            setLoading(false);
        }

        router.push('/price')



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
                            <Select.Option value="finance-expert">Finance Expert</Select.Option>
                            <Select.Option value="web-developer">Web Developer</Select.Option>
                            <Select.Option value="graphic-designer">Graphic Designer</Select.Option>
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

                    <AuthButton htmlType="submit" loading={loading} text="Create Profile">

                    </AuthButton>

                </div>
            </Form>
        </AuthShell>
    );
}
