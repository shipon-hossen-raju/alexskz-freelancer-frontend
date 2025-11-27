

'use client';

import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Upload } from 'antd';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';
import '@/styles/Auth.css';
import { useCreateProjectMutation, useUpdateProjectMutation } from '@/redux/api/portfolioApi';
import toast from 'react-hot-toast';

function makeRemoteFileObj(url, idx = 0) {
  // Build a preview object compatible with AntD Upload list
  const name = url.split('/').pop()?.split('?')[0] || `file-${idx}`;
  return {
    uid: `remote-${idx}-${Date.now()}`, // unique id
    name,
    status: 'done',
    url, // Upload will use this for preview
  };
}

export default function AddEditProjectModal({
  open,
  onClose,
  create = false,
  edit = false,
  heading = '',
  project = null,
}) {
  const [form] = Form.useForm();
  const [thumbnailFileList, setThumbnailFileList] = useState([]); // single file (thumbnail)
  const [photosFileList, setPhotosFileList] = useState([]); // multiple photos
  const [createProject, { isLoading: creating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: updating }] = useUpdateProjectMutation();

  // Normalize incoming (local) file entry to ensure consistent shape
  const normalizeFile = (f) => {
    // If it already has url (remote), keep it
    if (f.url) return f;
    // If it's a native File object (from input) AntD wraps it; keep originFileObj so you can append to FormData later
    return {
      ...f,
      uid: f.uid || `local-${Date.now()}`,
      name: f.name || f.originFileObj?.name || 'file',
      status: f.status || 'done',
    };
  };

//   console.log('project', project)
  // Prefill form and file-lists when editing
  useEffect(() => {
    if (edit && project) {
      form.setFieldsValue({
        name: project?.title ?? '',
        description: project?.description ?? '',
      });

      // Prefill thumbnail preview with remote URL if exists
      if (project?.thumbnail) {
        setThumbnailFileList([makeRemoteFileObj(project.thumbnail)]);
      } else {
        setThumbnailFileList([]);
      }

      // Prefill photos preview array from project.photos (if array)
      if (Array.isArray(project?.photos) && project.photos.length > 0) {
        setPhotosFileList(project.photos.map((p, i) => makeRemoteFileObj(p, i)));
      } else {
        setPhotosFileList([]);
      }
    } else {
      // Create mode or modal closed: reset
      form.resetFields();
      setThumbnailFileList([]);
      setPhotosFileList([]);
    }
  }, [edit, project, form, open]);

  // Prevent auto upload; also use customRequest noop to avoid network
  const beforeUploadPrevent = (file) => {
    return false;
  };
  const noopRequest = ({ onSuccess }) => {
    // immediately succeed to avoid builtin upload behavior
    setTimeout(() => onSuccess && onSuccess('ok'));
  };

  // single thumbnail change (normalize and keep only last)
  const onThumbnailChange = ({ fileList }) => {
    const normalized = fileList.map(normalizeFile);
    setThumbnailFileList(normalized.slice(-1));
  };

  // photos change (multiple)
  const onPhotosChange = ({ fileList }) => {
    const normalized = fileList.map(normalizeFile);
    setPhotosFileList(normalized);
  };

  const buildFormDataForCreate = (values) => {
    const fd = new FormData();

    // Add thumbnail (required for create)
    if (thumbnailFileList.length > 0) {
      const f = thumbnailFileList[0];
      const fileObj = f.originFileObj || f; // remote preview won't have originFileObj
      // If preview is remote URL, you may need to fetch it first on client or let backend accept url.
      // For now we only append if user uploaded a real File (originFileObj exists)
      if (f.originFileObj) {
        fd.append('thumbnail', fileObj);
      }
    }

    // Add photos
    photosFileList.forEach((f) => {
      const fileObj = f.originFileObj || f;
      if (f.originFileObj) {
        fd.append('photos', fileObj);
      }
    });

    // Add other data as JSON string under `data`
    const data = {
      title: values.name,
      description: values.description,
    };
    fd.append('data', JSON.stringify(data));

    return fd;
  };

  const buildFormDataForEdit = (values) => {
    const fd = new FormData();

    // If thumbnail was uploaded (local file), include it (replace)
    if (thumbnailFileList.length > 0 && thumbnailFileList[0].originFileObj) {
      fd.append('thumbnail', thumbnailFileList[0].originFileObj);
    }

    // If photos include local files, append them
    photosFileList.forEach((f) => {
      if (f.originFileObj) {
        fd.append('photos', f.originFileObj);
      }
    });

    // Only include textual data if changed
    const data = {};
    if (typeof values.name === 'string' && values.name.trim() !== '' && values.name !== project?.title) {
      data.title = values.name;
    }
    if (typeof values.description === 'string' && values.description.trim() !== '' && values.description !== project?.description) {
      data.description = values.description;
    }
    if (Object.keys(data).length > 0) {
      fd.append('data', JSON.stringify(data));
    }

    return fd;
  };

  const onFinish = async (values) => {
    try {
      if (create) {
        // required validations
        if (!values.name || !values.description) {
          toast.error('Please fill all required fields.');
          return;
        }
        // Ensure a real file is uploaded for thumbnail (not just remote preview)
        const hasLocalThumbnail = thumbnailFileList.length > 0 && !!thumbnailFileList[0].originFileObj;
        if (!hasLocalThumbnail) {
          toast.error('Please upload a thumbnail (image or video).');
          return;
        }

        const fd = buildFormDataForCreate(values);
        await createProject(fd).unwrap();
        toast.success('Project created successfully.');
        onClose();
        form.resetFields();
        setThumbnailFileList([]);
        setPhotosFileList([]);
        return;
      }

      if (edit && project) {
        const fd = buildFormDataForEdit(values);

        // If no files or data appended, don't call API
        const hasChanges = fd.has('thumbnail') || fd.has('photos') || fd.has('data');
        if (!hasChanges) {
          toast.info('No changes to update.');
          return;
        }

        // IMPORTANT: call shape expected by your RTK endpoint:
        // updateProject expects { id, formData }
        await updateProject({ id: project.id || project._id || project?.id, formData: fd }).unwrap();
        toast.success('Project updated successfully.');
        onClose();
        return;
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setThumbnailFileList([]);
    setPhotosFileList([]);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      centered
      width={760}
      title={<span className="text-[18px] font-semibold text-[#202020]">{heading}</span>}
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        className="[&_.ant-form-item-label>label]:text-[13px] [&_.ant-form-item]:mb-3"
      >
        <div className="grid md:grid-cols-3 gap-2">
          {/* LEFT: Thumbnail upload */}
          <div className="mt-7 flex justify-center md:justify-start">
            <Form.Item label="Thumbnail (image or video)" name="thumbnail">
              <Upload
                beforeUpload={beforeUploadPrevent}
                customRequest={noopRequest}
                accept="image/*,video/*"
                fileList={thumbnailFileList}
                onChange={onThumbnailChange}
                listType="picture-card"
                maxCount={1}
                // ensure different key/attr for this Upload than photos
                data-testid="upload-thumbnail"
              >
                {thumbnailFileList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload Thumbnail</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </div>

          {/* RIGHT: Text inputs and photos upload */}
          <div className="md:col-span-2">
            <Form.Item label="Project Title" name="name" rules={[{ required: create, message: 'Title is required' }]}>
              <Input size="large" placeholder="Project title" />
            </Form.Item>

            <Form.Item label="Description" name="description" rules={[{ required: create, message: 'Description is required' }]}>
              <Input.TextArea placeholder="Type here...." autoSize={{ minRows: 4 }} className="!rounded-[8px]" />
            </Form.Item>

            <Form.Item label="Photos (images only)" name="photos">
              <Upload.Dragger
                multiple
                beforeUpload={beforeUploadPrevent}
                customRequest={noopRequest}
                fileList={photosFileList}
                onChange={onPhotosChange}
                accept="image/*"
                data-testid="upload-photos"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag images to this area to upload</p>
                <p className="ant-upload-hint">You can upload multiple images. No videos allowed here.</p>
              </Upload.Dragger>
            </Form.Item>

            <Form.Item>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => form.submit()}
                  disabled={creating || updating}
                  className="cursor-pointer px-6 py-2 rounded-[6px] text-white font-semibold bg-[#144A6C] shadow-[0_8px_14px_rgba(20,74,108,0.35)] hover:opacity-95 active:opacity-90"
                >
                  {create ? (creating ? 'Publishing...' : 'Publish') : edit ? (updating ? 'Updating...' : 'Update') : 'Submit'}
                </button>
              </div>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
