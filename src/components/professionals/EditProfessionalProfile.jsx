'use client'
import React, { useEffect, useState } from 'react';
import SubHeadingBlack from '../ui/SubHeadingBlack';
import { Form, Input, Select, Checkbox, Button } from 'antd';
import { EnvironmentOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import TealBtn from '@/components/ui/TealBtn';
import '@/styles/Auth.css';
import '@/styles/AntCheckBox.css';
import Loading from '../shared/Loading';
import { useGetUserProfileQuery } from '@/redux/auth/authApi';
import { useEditProfileMutation } from '@/redux/api/profileApi';
import { useGetAllCategoryQuery } from '@/redux/api/categoryApi';
import  toast  from 'react-hot-toast'; // if you use react-toastify

export default function EditProfessionalProfile() {
  const [form] = Form.useForm();
  const [text, setText] = useState('');
  const { data: userData, error: userError, isLoading: isUserLoading } = useGetUserProfileQuery();
  const [editProfile, { isLoading: isEditing }] = useEditProfileMutation();
  const { data: categoryData, error: categoryError, isLoading: isCategoryLoading } = useGetAllCategoryQuery();

  // skills state initialized safely from user data when available
  const [skills, setSkills] = useState([]);

  // when user data arrives, populate form and skills
  useEffect(() => {
    const user = userData?.data;
    if (!user) return;

    console.log(user)

    // set skills
    const initialSkills = Array.isArray(user.skills) ? user.skills : [];
    setSkills(initialSkills);

    // compute availability checkbox array
    const availabilityArray = [
      user.availableOnline ? 'online' : null,
      user.availabilityInPerson ? 'in-person' : null,
    ].filter(Boolean);

    // set form fields from user object
    form.setFieldsValue({
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
    //   email: user.email ?? '',
      address: user.address ?? '',
      category: user?.category?.id ?? undefined, // select expects id
      experience: user.experience ?? '',
      language: user.language ?? '',
      about: user.about ?? '',
      availability: availabilityArray,
      skills: initialSkills,
    });
  }, [userData, form]);

  // Add skill
  const addSkill = () => {
    const trimmed = (text || '').trim();
    if (!trimmed) return;
    if (skills.includes(trimmed)) {
      setText('');
      return;
    }
    const next = [...skills, trimmed];
    setSkills(next);
    form.setFieldsValue({ skills: next }); // keep form in sync
    setText('');
  };

  // Remove skill by index
  const removeSkill = (idx) => {
    const next = skills.filter((_, i) => i !== idx);
    setSkills(next);
    form.setFieldsValue({ skills: next });
  };

  // handle Enter key in skill input
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  if (isUserLoading || isCategoryLoading) {
    return <Loading />;
  }

  const categories = categoryData?.data?.categories ?? [];

  const onFinish = (values) => {
    // map availability array to booleans expected by backend
    const availability = values.availability || [];
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      address: values.address,
      categoryId: values.category, // Select provides category id
      skills: Array.isArray(values.skills) ? values.skills : skills,
      experience: values.experience,
      about: values.about,
      language: values.language,
      availableOnline: availability.includes('online'),
      availabilityInPerson: availability.includes('in-person'),
      
    };

    editProfile(payload)
      .unwrap()
      .then(() => {
        toast.success('Profile updated successfully!'); // safe call if toast not configured
        // Optionally update local state or refetch queries depending on your RTK setup
      })
      .catch((error) => {
        console.log('error',error)
        const message = error?.data?.message || error?.message || 'Something went wrong';
        toast.error(message);
      });
  };



  return (
    <div>
      <SubHeadingBlack text="Edit Profile" />

      <div className="w-full max-w-5xl mx-auto mt-10">
        <div className="py-10 lg:py-20 bg-white rounded-[12px] border border-[#E6E6E6] shadow-[0_12px_34px_rgba(0,0,0,0.08)] px-6 md:px-8 ">
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            className="[&_.ant-form-item-label>label]:text-[13px] [&_.ant-form-item]:mb-4 !font-open-sans"
          >
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                    //   { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Enter a valid email' },
                    ]}
                  >
                    <Input disabled size="large" placeholder="you@example.com" />
                  </Form.Item>

                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please enter your address' }]}
                  >
                    <Input size="large" prefix={<EnvironmentOutlined />} placeholder="Dhaka, Bangladesh" />
                  </Form.Item>

                  {/* Availability */}
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
                    rules={[{ required: true, message: 'Please select a category' }]}
                  >
                    <Select size="large" placeholder="Please select a category" className="wa-select">
                      {categories.map((cat) => (
                        <Select.Option key={cat.id} value={cat.id}>
                          {cat.title}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Experience"
                    name="experience"
                    rules={[{ required: true, message: 'Please enter your experience in years' }]}
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
                    rules={[{ required: true, message: 'Please enter your skills' }]}
                  >
                    <div>
                      <div className="flex gap-2 items-center">
                        <Input
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          onKeyDown={onKeyDown}
                          placeholder="Type a skill and press Add"
                          className="rounded-md border-[#E6E6E6]"
                          style={{ borderWidth: 1 }}
                          size="large"
                        />
                        <Button
                          type="primary"
                          onClick={addSkill}
                          icon={<PlusOutlined />}
                          className="!bg-[#144A6C] !border-[#144A6C] !h-9.5"
                        >
                          Add
                        </Button>
                      </div>

                      {/* Skills list */}
                      <div className="mt-3 flex flex-wrap gap-3">
                        {skills.map((s, idx) => (
                          <div
                            key={s + idx}
                            className="relative bg-white border border-[#E6E6E6] rounded-md px-3 py-2 min-w-[120px] max-w-[250px]"
                          >
                            {/* close button at top-right */}
                            <button
                              type="button"
                              onClick={() => removeSkill(idx)}
                              aria-label={`Remove ${s}`}
                              className="cursor-pointer absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-[#E6E6E6] grid place-items-center shadow-sm"
                            >
                              <CloseOutlined style={{ fontSize: 12 }} />
                            </button>

                            <div className="text-sm text-[#202020] truncate">{s}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Form.Item>
                </div>
              </div>

              {/* About Yourself - full width */}
              <Form.Item className="md:col-span-2" label="About Yourself" name="about">
                <Input.TextArea placeholder="Type here...." autoSize={{ minRows: 6 }} />
              </Form.Item>
            </div>

            {/* Button centered */}
            <div className="pt-4 flex justify-center">
              <TealBtn htmlType="submit" text={isEditing? "Saving..." : "Save Changes"} />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
