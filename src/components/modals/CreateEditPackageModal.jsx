
// 'use client';

// import React, { useEffect } from 'react';
// import { Modal, Form, Input, Upload, Select, Checkbox, message } from 'antd';
// import { PictureOutlined } from '@ant-design/icons';
// import '@/styles/Auth.css';
// import '@/styles/AntCheckBox.css';
// import Loading from '../shared/Loading';
// import { useGetAllCategoryQuery } from '@/redux/api/categoryApi';
// import { useCreateServiceMutation, useUpdateServiceMutation } from '@/redux/api/serviceApi';
// import toast from 'react-hot-toast';

// export default function CreateEditPackageModal({
//   open,
//   onClose,
//   onPublish,
//   create = false,
//   edit = false,
//   heading,
//   serviceData = null,
// }) {
//   const [form] = Form.useForm();
//   const { data: categoryData, isLoading } = useGetAllCategoryQuery();
//   const [createService, { isLoading: isCreatingLoading }] = useCreateServiceMutation();
//   const [updateService, { isLoading: isUpdatingLoading }] = useUpdateServiceMutation();

//   const categories = categoryData?.data?.categories || [];

//   // helper to get a safe string message from possible error shapes
//   const getErrorMessage = (err) => {
//     try {
//       if (!err) return 'Something went wrong';
//       if (typeof err === 'string') return err;
//       if (err?.data?.message) return err.data.message;
//       if (err?.message) return err.message;
//       if (err?.status) return `Request failed (${err.status})`;
//       // last resort: try stringify
//       return JSON.stringify(err);
//     } catch (e) {
//       return 'Something went wrong';
//     }
//   };

//   // Prefill when editing. Use a unique uid for preview so previews don't collide between different services.
//   useEffect(() => {
//     if (!open) {
//       form.resetFields();
//       return;
//     }

//     if (edit && serviceData) {
//       const previewUid = serviceData?.id ? `thumb-${serviceData.id}` : `thumb-${Date.now()}`;
//       form.setFieldsValue({
//         name: serviceData.title ?? '',
//         description: serviceData.description ?? '',
//         price: serviceData.price ?? '',
//         // If your category is nested you already changed to serviceData.category?.id — keep it
//         category: serviceData.category?.id ?? undefined,
//         active: serviceData.isActive ?? true,
//         // image preview
//         image: serviceData.thumbnail
//           ? [
//               {
//                 uid: previewUid,
//                 name: 'thumbnail.jpg',
//                 status: 'done',
//                 url: serviceData.thumbnail,
//                 thumbUrl: serviceData.thumbnail,
//               },
//             ]
//           : [],
//       });
//     }
//   }, [open, edit, serviceData, form]);

//   if (isLoading) return <Loading />;

//   const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

//   const uploadProps = {
//     name: 'file',
//     multiple: false,
//     accept: 'image/*',
//     showUploadList: true,
//     beforeUpload: (file) => {
//       if (file.size / 1024 / 1024 > 5) {
//         message.error('File must be smaller than 5MB!');
//         return Upload.LIST_IGNORE;
//       }
//       return false; // prevent auto upload
//     },
//     onChange: (info) => {
//       const file = info.file;
//       const fileList = info.fileList;

//       if (file && file.originFileObj && !file.thumbUrl) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           // set thumbUrl so AntD can show preview
//           file.thumbUrl = e.target.result;
//           form.setFieldsValue({ image: fileList });
//         };
//         reader.readAsDataURL(file.originFileObj);
//       } else {
//         form.setFieldsValue({ image: fileList });
//       }
//     },
//     onRemove: (file) => {
//       const current = form.getFieldValue('image') || [];
//       const next = (current || []).filter((f) => f.uid !== file.uid);
//       form.setFieldsValue({ image: next });
//       return true;
//     },
//   };

//   const dataUrlToFile = async (dataUrl, filename = 'image.jpg') => {
//     const res = await fetch(dataUrl);
//     const blob = await res.blob();
//     return new File([blob], filename, { type: blob.type });
//   };

//   const onFinish = async (values) => {
//     console.log(' values ',values)
//     try {
//       const fileList = values.image || [];

//       const dataObj = {
//         title: values.name || '',
//         description: values.description || '',
//         categoryId: values.category || '',
//         price: values.price ? Number(values.price) : 0,
//         isActive: !!values.active,
//       };

//       if (edit && serviceData?.id) {
//         dataObj.id = serviceData.id;
//       }

//       const formData = new FormData();

//       // detect new file upload vs kept existing remote URL
//       let shouldAppendImage = false;
//       let fileForUpload = null;

//       if (fileList.length > 0) {
//         const first = fileList[0];
//         if (first.originFileObj) {
//           // new file uploaded by user
//           fileForUpload = first.originFileObj;
//           shouldAppendImage = true;
//         } else if ((first.thumbUrl || first.url) && !edit) {
//           // rare case for create flow where thumb/url exists: convert to File
//           fileForUpload = await dataUrlToFile(first.thumbUrl || first.url, first.name || 'image.jpg');
//           shouldAppendImage = true;
//         } else {
//           // existing remote URL kept during edit -> do not re-upload (backend will keep existing)
//           shouldAppendImage = false;
//         }
//       } else {
//         // no file list
//         if (create) {
//           toast.error('Please upload an image for the package.');
//           return;
//         }
//         // edit + no file => user removed the image preview; we are not appending an image (backend will keep existing unless you want to signal removal)
//       }

//       if (shouldAppendImage && fileForUpload) {
//         // create -> key 'image'; edit -> key 'thumbnail' (as you requested)
//         if (create) {
//           formData.append('image', fileForUpload);
//         } else if (edit) {
//           formData.append('thumbnail', fileForUpload);
//         }
//       }

//       formData.append('data', JSON.stringify(dataObj));

//       if (create) {
//         await createService(formData).unwrap();
//         toast.success('Service created successfully!');
//       } else if (edit) {
//         await updateService({ id: serviceData.id, formData }).unwrap();
//         toast.success('Service updated successfully!');
//       }

//       form.resetFields();
//       if (typeof onPublish === 'function') onPublish();
//       if (typeof onClose === 'function') onClose();
//     } catch (err) {
//       const msg = getErrorMessage(err);
//       console.error('service error', err);
//       toast.error(msg);
//     }
//   };

//   return (
//     <Modal
//       open={open}
//       onCancel={onClose}
//       footer={null}
//       centered
//       width={760}
//       title={<span className="text-[18px] font-semibold text-[#202020]">{heading}</span>}
//       maskClosable={false}
//       closeIcon={
//         <span className="inline-grid place-items-center w-6 h-6 rounded-full bg-white border border-[#E06565]">
//           <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
//             <path d="M6 6l12 12M18 6L6 18" stroke="#E06565" strokeWidth="2" strokeLinecap="round" />
//           </svg>
//         </span>
//       }
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         requiredMark={false}
//         onFinish={onFinish}
//         initialValues={{ name: '', price: '', description: '', active: true }}
//         className="[&_.ant-form-item-label>label]:text-[13px] [&_.ant-form-item]:mb-3"
//       >
//         <div className="grid md:grid-cols-3 gap-2">
//           <div className="mt-7 flex justify-center md:justify-start">
//             <Form.Item
//               name="image"
//               valuePropName="fileList"
//               getValueFromEvent={normFile}
//               rules={edit ? [] : [{ required: true, message: 'Please upload an image' }]}
//             >
//               <Upload {...uploadProps} listType="picture-card">
//                 <div style={{ color: 'inherit', cursor: 'pointer', border: 0, background: 'none' }}>
//                   <PictureOutlined />
//                   <div style={{ marginTop: 8 }}>Upload</div>
//                 </div>
//               </Upload>
//             </Form.Item>
//           </div>

//           <div className="md:col-span-2">
//             <Form.Item
//               label="Categories"
//               name="category"
//               rules={[{ required: true, message: 'Please select a category' }]}
//             >
//               <Select size="large" placeholder="Please select a category" className="wa-select">
//                 {categories.map((category) => (
//                   <Select.Option value={category.id} key={category.id}>
//                     {category.title}
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item label="Package name" name="name" rules={[{ required: true, message: 'Enter package name' }]}>
//               <Input size="large" placeholder="Finance" />
//             </Form.Item>

//             <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Enter price' }]}>
//               <Input size="large" placeholder="50.00" />
//             </Form.Item>

//             <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Enter description' }]}>
//               <Input.TextArea placeholder="Type here...." autoSize={{ minRows: 4 }} className="!rounded-[8px]" />
//             </Form.Item>

//             <Form.Item name="active" valuePropName="checked">
//               <Checkbox className="custom-green-checkbox">Active</Checkbox>
//             </Form.Item>

//             <Form.Item>
//               <div className="mt-4 flex justify-end">
//                 <button
//                   type="button"
//                   onClick={() => form.submit()}
//                   className="cursor-pointer px-6 py-2 rounded-[6px] text-white font-semibold bg-[#144A6C]
//                      shadow-[0_8px_14px_rgba(20,74,108,0.35)] hover:opacity-95 active:opacity-90"
//                 >
//                   {create ? (isCreatingLoading ? 'Publishing…' : 'Publish') : (isUpdatingLoading ? 'Updating…' : 'Update')}
//                 </button>
//               </div>
//             </Form.Item>
//           </div>
//         </div>
//       </Form>
//     </Modal>
//   );
// }


'use client';

import React, { useEffect } from 'react';
import { Modal, Form, Input, Upload, Select, Checkbox, message } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import '@/styles/Auth.css';
import '@/styles/AntCheckBox.css';
import Loading from '../shared/Loading';
import { useGetAllCategoryQuery } from '@/redux/api/categoryApi';
import { useCreateServiceMutation, useUpdateServiceMutation } from '@/redux/api/serviceApi';
import toast from 'react-hot-toast';

export default function CreateEditPackageModal({
  open,
  onClose,
  onPublish,
  create = false,
  edit = false,
  heading,
  serviceData = null,
}) {
  const [form] = Form.useForm();
  const { data: categoryData, isLoading } = useGetAllCategoryQuery();
  const [createService, { isLoading: isCreatingLoading }] = useCreateServiceMutation();
  const [updateService, { isLoading: isUpdatingLoading }] = useUpdateServiceMutation();

  const categories = categoryData?.data?.categories || [];

  // console.log('service',serviceData)

  const getErrorMessage = (err) => {
    try {
      if (!err) return 'Something went wrong';
      if (typeof err === 'string') return err;
      if (err?.data?.message) return err.data.message;
      if (err?.message) return err.message;
      if (err?.status) return `Request failed (${err.status})`;
      return JSON.stringify(err);
    } catch {
      return 'Something went wrong';
    }
  };

  // helper to generate unique uid (stable-ish)
  const makeUid = (prefix = 'uid') => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  // Prefill when editing. Use unique uid so previews don't collide.
  useEffect(() => {
    if (!open) {
      form.resetFields();
      return;
    }

    if (edit && serviceData) {
      const previewUid = serviceData?.id ? `thumb-${serviceData.id}-${Date.now()}` : makeUid('thumb');
      form.setFieldsValue({
        name: serviceData.title ?? '',
        description: serviceData.description ?? '',
        price: serviceData.price ?? '',
        category: serviceData.category?.id ?? undefined,
        active: serviceData.isActive ?? true,
        image: serviceData.thumbnail
          ? [
              {
                uid: previewUid,
                name: 'thumbnail.jpg',
                status: 'done',
                url: serviceData.thumbnail,
                thumbUrl: serviceData.thumbnail,
              },
            ]
          : [],
      });
    }
  }, [open, edit, serviceData, form]);

  if (isLoading) return <Loading />;

  const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

  // convert dataURL to File if ever needed
  const dataUrlToFile = async (dataUrl, filename = 'image.jpg') => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  };

  // central place to normalize a file list before putting into form state
  const normalizeFileListForForm = (rawFileList) => {
    // Map to new objects to avoid mutating originals
    return rawFileList.map((f) => {
      // clone minimal props AntD needs
      const uid = f.uid || makeUid('f');
      const name = f.name || (f.originFileObj && f.originFileObj.name) || 'file.jpg';
      const status = f.status || (f.originFileObj ? 'done' : 'done');
      // thumbUrl might be present already or be added by FileReader
      const thumbUrl = f.thumbUrl || f.url || undefined;
      // keep originFileObj if present (real File)
      const originFileObj = f.originFileObj || undefined;
      return { uid, name, status, thumbUrl, url: f.url, originFileObj };
    });
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    showUploadList: true,
    beforeUpload: (file) => {
      if (file.size / 1024 / 1024 > 5) {
        message.error('File must be smaller than 5MB!');
        return Upload.LIST_IGNORE;
      }
      // return false to prevent automatic upload
      return false;
    },

    onChange: async (info) => {
      try {
        const file = info.file;
        // clone fileList for safe mutation
        const incomingList = info.fileList.slice();

        // ensure each file has a unique uid and (if originFileObj) a thumbUrl
        for (let i = 0; i < incomingList.length; i += 1) {
          const f = incomingList[i];
          if (!f.uid) f.uid = makeUid('f');
          // If the file has originFileObj and no thumbUrl, create one via FileReader
          if (f.originFileObj && !f.thumbUrl) {
            // eslint-disable-next-line no-await-in-loop
            const reader = new FileReader();
            // eslint-disable-next-line no-loop-func
            await new Promise((resolve, reject) => {
              reader.onload = (e) => {
                try {
                  f.thumbUrl = e.target.result;
                  resolve();
                } catch (e) {
                  reject(e);
                }
              };
              reader.onerror = () => reject(new Error('File read error'));
              reader.readAsDataURL(f.originFileObj);
            });
          }
        }

        const normalized = normalizeFileListForForm(incomingList);
        form.setFieldsValue({ image: normalized });
      } catch (e) {
        console.error('upload onChange error', e);
        toast.error('Failed to process the selected file. Try again.');
      }
    },

    onRemove: (file) => {
      try {
        const current = form.getFieldValue('image') || [];
        // filter by uid (ensure comparison with normalized uids)
        const next = (current || []).filter((f) => f.uid !== file.uid);
        form.setFieldsValue({ image: next });
        return true;
      } catch (e) {
        console.error('onRemove error', e);
        // still allow removal
        return true;
      }
    },
  };

  const onFinish = async (values) => {
    // console.log(' values ', values);
    try {
      const fileList = values.image || [];

      const dataObj = {
        title: values.name || '',
        description: values.description || '',
        categoryId: values.category || '',
        price: values.price ? Number(values.price) : 0,
        isActive: !!values.active,
      };

      // Note: do NOT put id inside data for Prisma update — id is passed via URL (updateService expects id)
      if (edit && serviceData?.id) {
        // do not set dataObj.id here
      }

      const formData = new FormData();

      // detect new file upload vs kept existing remote URL
      let shouldAppendImage = false;
      let fileForUpload = null;

      if (fileList.length > 0) {
        const first = fileList[0];
        if (first.originFileObj) {
          // new file uploaded by user
          fileForUpload = first.originFileObj;
          shouldAppendImage = true;
        } else if ((first.thumbUrl || first.url) && !edit) {
          // create flow with a thumb/url present: fallback convert to File
          // (rare) — convert only for create
          fileForUpload = await dataUrlToFile(first.thumbUrl || first.url, first.name || 'image.jpg');
          shouldAppendImage = true;
        } else {
          // existing remote URL kept during edit -> do not re-upload
          shouldAppendImage = false;
        }
      } else {
        // no file list
        if (create) {
          toast.error('Please upload an image for the package.');
          return;
        }
        // edit + no file (user removed preview) -> not appending an image (server keeps existing unless you want explicit removal)
      }

      if (shouldAppendImage && fileForUpload) {
        if (create) {
          formData.append('image', fileForUpload);
        } else if (edit) {
          // formData.append('thumbnail', fileForUpload);
          formData.append('image', fileForUpload);
        }
      }

      // Build data JSON to send. For updates, don't include id; backend reads id from URL.
      // For create we include categoryId; for update you might prefer nested category - keep as your backend expects.
      formData.append('data', JSON.stringify(dataObj));

      if (create) {
        await createService(formData).unwrap();
        toast.success('Service created successfully!');
      } else if (edit) {
        await updateService({ id: serviceData.id, formData }).unwrap();
        toast.success('Service updated successfully!');
      }

      form.resetFields();
      if (typeof onPublish === 'function') onPublish();
      if (typeof onClose === 'function') onClose();
    } catch (err) {
      const msg = getErrorMessage(err);
      console.error('service error', err);
      toast.error(msg);
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
      maskClosable={false}
      closeIcon={
        <span className="inline-grid place-items-center w-6 h-6 rounded-full bg-white border border-[#E06565]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="#E06565" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      }
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
              rules={edit ? [] : [{ required: true, message: 'Please upload an image' }]}
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
                  {create ? (isCreatingLoading ? 'Publishing…' : 'Publish') : (isUpdatingLoading ? 'Updating…' : 'Update')}
                </button>
              </div>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
