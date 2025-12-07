'use client';

import { useMemo, useState, useEffect } from 'react';
import { Modal, Input, Checkbox, Form } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';
import '@/styles/Auth.css';
import TealBtn from '../ui/TealBtn';
import '@/styles/AntCheckBox.css';
import { useGetAllCategoryQuery } from '@/redux/api/categoryApi';
import GreenBtn from '../ui/GreenBtn';
import { useDispatch } from 'node_modules/react-redux/dist/react-redux';
import { setCategoryIds, setIsCertified, setIsOnline, setMaxPrice, setMinPrice, setTopRated } from '@/redux/slices/filterSlice';

export default function FiltersModal({ open, onClose, onApply }) {
  const [form] = Form.useForm();
  const { data: categoryData } = useGetAllCategoryQuery();
  const dispatch = useDispatch();

  const ALL_CATEGORIES = categoryData?.data?.categories || [];

  const [selected, setSelected] = useState([]);

  const canApply = useMemo(() => true, []);

  useEffect(() => {
    if (!open) return;
    
  }, [open]);

  const onFinish = (values) => {
    
    // console.log('values: ', values);

    dispatch(setCategoryIds(values?.categoryIds))
    dispatch(setMinPrice(values?.min))
    dispatch(setMaxPrice(values?.max))
    dispatch(setIsOnline(values?.online))
    dispatch(setTopRated(values?.topRated))
    dispatch(setIsCertified(values?.inPerson))

    // form.resetFields();
    setSelected([]);
    onApply?.(values);
  };

  const reset = () => {
    form.resetFields();
    setSelected([]);
  };

  // keep categoryIds as the single source of truth
  const toggleCat = (catId) => {
    const prev = form.getFieldValue('categoryIds') || [];
    const next = prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId];
    form.setFieldsValue({ categoryIds: next });
    setSelected(next);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={620}
      centered
      bodyStyle={{ padding: 20 }}
      className="font-open-sans"
      title={null}
      // destroyOnClose
      styles={{
        content: {
          borderRadius: 12,
          overflow: 'hidden',
        },
      }}
    >
      <div className="font-open-sans">
        <div className="mb-3">
          <h3 className="text-[18px] font-semibold text-gray-900">Filters</h3>
        </div>

        {/* Use categoryIds in initialValues */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ min: '', max: '', categoryIds: [], online: false, topRated: false, inPerson: false }}
        >
          {/* Price Filter */}
          <div className="mt-2">
            <div className="text-[14px] font-semibold text-gray-800">Price Filter</div>

            <div className="mt-3 flex items-center gap-3">
              <Form.Item name="min" noStyle>
                <Input placeholder="Min" className="h-10 w-28" type="number" />
              </Form.Item>

              <span className="text-gray-400">—</span>

              <Form.Item name="max" noStyle>
                <Input placeholder="Max" className="h-10 w-28" type="number" />
              </Form.Item>

              {/* decorative apply */}
              <button
                type="button"
                onClick={() => {/* decorative: no-op */}}
                disabled={!canApply}
                className="ml-2 inline-flex h-10 w-48 items-center justify-center rounded-md bg-[#144A6C] text-white shadow hover:bg-[#0f3a55] disabled:opacity-60 cursor-pointer"
                title="Apply"
              >
                <CaretRightFilled className="text-[18px]" />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6">
            <div className="text-[14px] font-semibold text-gray-800">All categories</div>

            <Form.Item name="categoryIds" className="mt-3 mb-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ALL_CATEGORIES.map((cat) => {
                  // compute active from categoryIds (NOT categories/title)
                  const active = (form.getFieldValue('categoryIds') || []).includes(cat?.id);
                  return (
                    <button
                      key={cat?.id}
                      type="button"
                      onClick={() => toggleCat(cat?.id)}
                      className={[
                        'cursor-pointer text-[13px] px-3 py-2 rounded-md text-left transition',
                        active
                          ? 'bg-[#6BB37A] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                      ].join(' ')}
                    >
                      {cat?.title}
                    </button>
                  );
                })}
              </div>
            </Form.Item>
          </div>

          {/* Freelancer details */}
          <div className="mt-6">
            <div className="text-[14px] font-semibold text-gray-800">Freelancer details</div>

            <div className="mt-3 flex items-center gap-6">
              <Form.Item name="online" valuePropName="checked" noStyle>
                <label className="inline-flex items-center gap-2 text-[14px] text-gray-700">
                  <Checkbox className="custom-green-checkbox" />
                  Online
                </label>
              </Form.Item>

              <Form.Item name="topRated" valuePropName="checked" noStyle>
                <label className="inline-flex items-center gap-2 text-[14px] text-gray-700">
                  <Checkbox className="custom-green-checkbox" />
                  Top rated
                </label>
              </Form.Item>

              <Form.Item name="inPerson" valuePropName="checked" noStyle>
                <label className="inline-flex items-center gap-2 text-[14px] text-gray-700">
                  <Checkbox className="custom-green-checkbox" />
                  In Person
                </label>
              </Form.Item>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-between">
            {/* ensure TealBtn renders a type="button" */}
            <TealBtn htmlType="button" text="Reset Filter" onClick={reset} />

            <div>
              {/* ensure GreenBtn is type="button" so click doesn't accidentally auto-submit;
                  we explicitly call form.submit() */}
              <GreenBtn htmlType="button" text="Find" onClick={() => form.submit()} />
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
