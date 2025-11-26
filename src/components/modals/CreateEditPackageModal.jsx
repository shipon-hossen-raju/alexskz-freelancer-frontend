// 'use client';

// import React from 'react';
// import { Modal, Form, Input, Upload } from 'antd';
// import { PictureOutlined } from '@ant-design/icons';
// import { PlusOutlined } from '@ant-design/icons';
// import '@/styles/Auth.css'
// import { useGetAllCategoryQuery } from '@/redux/api/categoryApi';
// import Loading from '../shared/Loading';
// import { Select, Checkbox } from 'antd';
// import '@/styles/AntCheckBox.css';
// import { useCreateServiceMutation } from '@/redux/api/serviceApi';

// export default function CreateEditPackageModal({ open, onClose, onPublish, create = false, edit = false, heading }) {
//     const [form] = Form.useForm();
//     const { data: categoryData, error, isLoading } = useGetAllCategoryQuery()
//     const [createService, {isLoading: isCreatingLoading}] = useCreateServiceMutation();


//     if (isLoading) {
//         return <Loading />
//     }
//     const categories = categoryData?.data?.categories;
//     if (!categories) {
//         return
//     }

//     // console.log('create', create)
//     // console.log('edit', edit)

//     const onFinish = (values) => {
        
//         console.log('create service',values);

//         if(create){

//         }
//     };

//     const normFile = e => {
//         if (Array.isArray(e)) {
//             return e;
//         }
//         return e?.fileList;
//     };

//     return (
//         <Modal
//             open={open}
//             onCancel={onClose}
//             footer={null}
//             centered
//             width={760}
//             title={<span className="text-[18px] font-semibold text-[#202020]">{heading}</span>}
//             closeIcon={
//                 <span className="inline-grid place-items-center w-6 h-6 rounded-full bg-white border border-[#E06565]">
//                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
//                         <path d="M6 6l12 12M18 6L6 18" stroke="#E06565" strokeWidth="2" strokeLinecap="round" />
//                     </svg>
//                 </span>
//             }
//             className=""

//             maskClosable={false}
//         >



//             {/* Right form */}
//             <Form
//                 form={form}
//                 layout="vertical"
//                 requiredMark={false}
//                 onFinish={onFinish}
//                 initialValues={{ name: 'Finance', price: '50.00 EUR', description: '' }}
//                 className="[&_.ant-form-item-label>label]:text-[13px] [&_.ant-form-item]:mb-3"
//             >
//                 <div className='grid md:grid-cols-3 gap-2 '>
//                     <div className='mt-7 flex justify-center md:justify-start'>
//                         {/* image upload */}



//                         <Form.Item name="image" valuePropName="fileList" getValueFromEvent={normFile}>

//                             <Upload action="/api/upload" name="file" listType="picture-card">
//                                 <button
//                                     style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
//                                     type="button"
//                                 >
//                                     <PictureOutlined />
//                                     <div style={{ marginTop: 8 }}>Upload</div>
//                                 </button>
//                             </Upload>
//                         </Form.Item>

//                     </div>


//                     <div className='md:col-span-2'>
//                         <Form.Item
//                             label="Categories"
//                             name="category"
//                             rules={[
//                                 { required: true, message: 'Please enter your category' },

//                             ]}
//                         >


//                             <Select size="large" placeholder="Please select a category" className="wa-select">

//                                 {
//                                     categories?.map((category) => {

//                                         return (
//                                             <Select.Option value={category.id}>{category.title}</Select.Option>
//                                         )

//                                     })
//                                 }
//                             </Select>


//                         </Form.Item>
//                         <Form.Item label="Package name" name="name">
//                             <Input size="large" placeholder="Finance" />
//                         </Form.Item>

//                         <Form.Item label="Price" name="price">
//                             <Input size="large" placeholder="50.00 EUR" />
//                         </Form.Item>

//                         <Form.Item label="Description" name="description">
//                             <Input.TextArea
//                                 placeholder="Type here...."
//                                 autoSize={{ minRows: 4 }}
//                                 className="!rounded-[8px]"
//                             />
//                         </Form.Item>

                        
//                         <Form.Item
//                             name="active"
//                             valuePropName="checked"
//                         >
//                             <Checkbox className="custom-green-checkbox">Active</Checkbox>
//                         </Form.Item>

//                         <Form.Item>
//                             {/* Publish button (bottom-right) */}
//                             <div className="mt-4 flex justify-end">
//                                 <button
//                                     onClick={() => form.submit()}
//                                     className="cursor-pointer px-6 py-2 rounded-[6px] text-white font-semibold bg-[#144A6C]
//                      shadow-[0_8px_14px_rgba(20,74,108,0.35)] hover:opacity-95 active:opacity-90"
//                                 >
//                                     {create ? "Publish" : "Done"}
//                                 </button>
//                             </div>
//                         </Form.Item>

//                     </div>
//                 </div>
//             </Form>



//         </Modal>
//     );
// }

'use client';

import React, { useEffect } from 'react';
import { Modal, Form, Input, Upload, Select, Checkbox, message } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import '@/styles/Auth.css';
import { useGetAllCategoryQuery } from '@/redux/api/categoryApi';
import Loading from '../shared/Loading';
import '@/styles/AntCheckBox.css';
import { useCreateServiceMutation } from '@/redux/api/serviceApi';
import toast from 'react-hot-toast';

export default function CreateEditPackageModal({
  open,
  onClose,
  onPublish, // optional callback after successful publish
  create = false,
  edit = false,
  heading,
}) {
  const [form] = Form.useForm();
  const { data: categoryData, isLoading } = useGetAllCategoryQuery();
  const [createService, { isLoading: isCreatingLoading }] = useCreateServiceMutation();

  useEffect(() => {
    // Reset form when modal closes to clear previous preview/thumbs
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  if (isLoading) return <Loading />;

  const categories = categoryData?.data?.categories || [];

  // Normalize Upload event to fileList
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // Upload props - prevent auto upload and enable preview list
  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    showUploadList: true, // show AntD preview thumbnails
    beforeUpload: (file) => {
      // prevent automatic upload by returning false
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('File must be smaller than 5MB!');
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onChange: (info) => {
      // Ensure preview (thumbUrl) exists for files with originFileObj
      const file = info.file;
      const fileList = info.fileList;

      // If the file has an originFileObj and no thumbUrl, create one via FileReader
      if (file && file.originFileObj && !file.thumbUrl) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // Set generated data URL as thumbUrl so AntD can render preview
          file.thumbUrl = e.target.result;
          // Update the form field so your onFinish reads the fileList
          form.setFieldsValue({ image: fileList });
        };
        reader.readAsDataURL(file.originFileObj);
      } else {
        // Update the form field in other cases (remove, existing thumb, etc.)
        form.setFieldsValue({ image: fileList });
      }
    },
    onRemove: (file) => {
      // Remove file from form value when user removes it
      const current = form.getFieldValue('image') || [];
      const next = (current || []).filter((f) => f.uid !== file.uid);
      form.setFieldsValue({ image: next });
      return true;
    },
  };

  // Helper: convert a dataURL/thumbUrl to a File (if originFileObj is not present)
  const dataUrlToFile = async (dataUrl, filename = 'image.jpg') => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  };

  const onFinish = async (values) => {
    try {
      console.log('form values', values);

      if (create) {
        // image comes as fileList (because valuePropName="fileList" + getValueFromEvent)
        const fileList = values.image || [];
        if (!fileList || fileList.length === 0) {
          toast.error('Please upload an image for the package.');
          return;
        }

        // Pick first file
        const firstFile = fileList[0];

        // Extract an actual File object:
        // Prefer originFileObj (real File). If not present, but thumbUrl exists, convert it back to File.
        let fileForUpload = null;

        if (firstFile.originFileObj) {
          fileForUpload = firstFile.originFileObj;
        } else if (firstFile.thumbUrl) {
          // thumbUrl is usually a data URL (data:image/...)
          fileForUpload = await dataUrlToFile(firstFile.thumbUrl, firstFile.name || 'image.jpg');
        } else {
          // last resort: maybe the file has a 'url' (already uploaded), but we want an actual file
          toast.error('Could not obtain file data for upload.');
          return;
        }

        // Prepare data object expected by backend
        const dataObj = {
          title: values.name || '', // package name -> title
          description: values.description || '',
          categoryId: values.category || '',
          // price: convert to number if possible. Backend example uses 99 (number)
          price: values.price ? Number(values.price) : 0,
          isActive: !!values.active, // boolean
        };

        // Build FormData
        const formData = new FormData();
        // Append image file under key 'image' (as backend expects this key)
        formData.append('image', fileForUpload);
        // Append other fields under key 'data' as JSON string (backend expects data key)
        formData.append('data', JSON.stringify(dataObj));

        // Call RTK Query mutation with FormData
        const res = await createService(formData).unwrap();
        toast.success('Package created successfully!');
        form.resetFields();

        // optional callbacks
       if (typeof onPublish === 'function') {
          try { onPublish(); } catch (e) { /* ignore errors from parent callback */ }
        }
        if (typeof onClose === 'function') {
          onClose();
        }
      } else {
        // If not create, you can handle edit flow here
        console.log('edit flow not implemented yet', values);
      }
    } catch (err) {
      console.error('create service error', err);
      toast.error(err?.data?.message || err?.message || 'Failed to create package');
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={760}
      title={<span className="text-[18px] font-semibold text-[#202020]">{heading}</span>}
      closeIcon={
        <span className="inline-grid place-items-center w-6 h-6 rounded-full bg-white border border-[#E06565]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="#E06565" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      }
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        initialValues={{ name: '', price: '', description: '', active: true }}
        className="[&_.ant-form-item-label>label]:text-[13px] [&_.ant-form-item]:mb-3"
      >
        <div className="grid md:grid-cols-3 gap-2">
          <div className="mt-7 flex justify-center md:justify-start">
            <Form.Item
              name="image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Please upload an image' }]}
            >
              <Upload {...uploadProps} listType="picture-card">
                <div style={{ color: 'inherit', cursor: 'pointer', border: 0, background: 'none' }}>
                  <PictureOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </div>

          <div className="md:col-span-2">
            <Form.Item
              label="Categories"
              name="category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select size="large" placeholder="Please select a category" className="wa-select">
                {categories.map((category) => (
                  <Select.Option value={category.id} key={category.id}>
                    {category.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Package name" name="name" rules={[{ required: true, message: 'Enter package name' }]}>
              <Input size="large" placeholder="Finance" />
            </Form.Item>

            <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Enter price' }]}>
              <Input size="large" placeholder="50.00" />
            </Form.Item>

            <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Enter description' }]}>
              <Input.TextArea placeholder="Type here...." autoSize={{ minRows: 4 }} className="!rounded-[8px]" />
            </Form.Item>

            <Form.Item name="active" valuePropName="checked">
              <Checkbox className="custom-green-checkbox">Active</Checkbox>
            </Form.Item>

            <Form.Item>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => form.submit()}
                  className="cursor-pointer px-6 py-2 rounded-[6px] text-white font-semibold bg-[#144A6C]
                     shadow-[0_8px_14px_rgba(20,74,108,0.35)] hover:opacity-95 active:opacity-90"
                >
                  {create ? (isCreatingLoading ? 'Publishing…' : 'Publish') : 'Done'}
                </button>
              </div>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

