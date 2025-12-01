// 'use client'
// import CustomContainer from '@/components/ui/CustomContainer'
// import Link from 'next/link'
// import React, { useEffect } from 'react'
// import { Divider } from 'antd';
// import SubHeadingBlack from '@/components/ui/SubHeadingBlack';
// import { Form, Input, Switch } from 'antd';
// import TealBtn from '@/components/ui/TealBtn';
// import "@/styles/AntSwitch.css"
// import { useGetAvailabilityQuery, useUpsertAvailabilityMutation } from '@/redux/api/availabilityApi';
// // import Loading from '@/components/shared/Loading'; // keep for UI but avoid returning it early

// export default function SetAvailabilityPage() {
//   const [form] = Form.useForm();
//   const { data: availabilityData, isLoading, isError } = useGetAvailabilityQuery();
//   const [upsertAvailability, { isLoading: isSaving }] = useUpsertAvailabilityMutation();

//   // availability array from backend
//   const availabilitySchedule = availabilityData?.data || [];

//   // full week
//   const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//   // Populate form values when availabilitySchedule changes
//   useEffect(() => {
//     // build a map by dayOfWeek (UPPERCASE in your response)
//     const map = (Array.isArray(availabilitySchedule) ? availabilitySchedule : []).reduce((acc, item) => {
//       if (item && item.dayOfWeek) acc[item.dayOfWeek.toUpperCase()] = item;
//       return acc;
//     }, {});

//     // build values object for setFieldsValue
//     const values = days.reduce((acc, day) => {
//       const key = day.toLowerCase();
//       const backendItem = map[day.toUpperCase()];

//       acc[`${key}StartTime`] = backendItem?.startTime ?? '';
//       acc[`${key}EndTime`] = backendItem?.endTime ?? '';
//       acc[`${key}MaxAppointment`] = backendItem?.maxAppointments != null ? String(backendItem.maxAppointments) : '';
//       acc[`${key}Toggle`] = !!backendItem?.isAvailable;

//       return acc;
//     }, {});

//     form.setFieldsValue(values);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [availabilitySchedule, form]);

//   const onFinish = (values) => {
//     const scheduleArray = days.map((day) => {
//       const key = day.toLowerCase();
//       const startTime = values[`${key}StartTime`] ?? "";
//       const endTime = values[`${key}EndTime`] ?? "";
//       const maxAppRaw = values[`${key}MaxAppointment`];
//       const maxAppointments = maxAppRaw === undefined || maxAppRaw === null || maxAppRaw === ''
//         ? 0
//         : parseInt(String(maxAppRaw).trim(), 10) || 0;
//       const isAvailable = !!values[`${key}Toggle`];

//       return {
//         id: "",
//         isAvailable,
//         startTime,
//         endTime,
//         dayOfWeek: day.toUpperCase(),
//         maxAppointments
//       };
//     });

//     console.log('Save Changes (payload):', scheduleArray);

//     return scheduleArray;
//   };

//   // Render a consistent tree always — show inline loading/error UI rather than early returns
//   return (
//     <CustomContainer>
//       {/* links */}
//       <div className='mb-8'>
//         <Link href="/profile" className="font-nunito text-gray-400 font-medium">Profile</Link>
//         <Divider type="vertical" />
//         <Link href="" className="font-nunito text-gray-700 font-medium">Availability</Link>
//       </div>

//       {/* content */}
//       <div className="w-full ">
//         <SubHeadingBlack text="Set Availability" />

//         <div className="mt-6 bg-white rounded-[12px] border border-[#E6E6E6] shadow-[0_12px_34px_rgba(0,0,0,0.08)] px-6 py-8">

//           {/* Show inline loading or error (no early returns) */}
//           {isLoading && (
//             <div className="mb-4 text-center text-gray-500">Loading availability…</div>
//           )}
//           {isError && (
//             <div className="mb-4 text-center text-red-500">Failed to load availability. Please try again.</div>
//           )}

//           {/* Form */}
//           <Form
//             form={form}
//             layout="vertical"
//             requiredMark={false}
//             onFinish={onFinish}
//             className="[&_.ant-form-item-label>label]:text-[13px] [&_.ant-form-item]:mb-0 !font-open-sans"
//           >
//             <div className="mt-6">
//               {days.map((day, idx) => {
//                 const key = day.toLowerCase();
//                 const toggleFieldName = `${key}Toggle`;

//                 return (
//                   <div key={idx} className="flex flex-col md:flex-row items-center justify-between mb-4 py-4 px-4 rounded-lg border border-[#F0F2F3] bg-white">
//                     {/* Left: Day label */}
//                     <div className="w-1/6 min-w-[110px] text-center">
//                       <div className="text-[#202020] font-medium text-[18px]">{day}</div>
//                     </div>

//                     {/* Middle */}
//                     <div className=" text-center  lg:flex lg:gap-20 ">
//                       <div className='lg:flex gap-4'>
//                         <div className="flex flex-col ">
//                           <label className="text-[14px] text-[#848A8C] mb-2">Set Start time</label>
//                           <Form.Item name={`${key}StartTime`} className="m-0">
//                             <Input size="large" className="!w-24 !rounded-[6px] text-sm  !bg-[#E8EDF0] !border !border-gray-300 placeholder-[#9AA0A2]" placeholder="9:00 AM" />
//                           </Form.Item>
//                         </div>

//                         <div className="flex flex-col ">
//                           <label className="text-[14px] text-[#848A8C] mb-2 ">Set End time</label>
//                           <Form.Item name={`${key}EndTime`} className="m-0">
//                             <Input size="large" className="!w-24 !rounded-[6px] text-sm  !bg-[#E8EDF0] !border !border-gray-300 placeholder-[#9AA0A2]" placeholder="5:00 PM" />
//                           </Form.Item>
//                         </div>
//                       </div>

//                       <div className="flex flex-col ">
//                         <label className="text-[14px] text-[#848A8C] mb-2">Max appointment per day</label>
//                         <Form.Item name={`${key}MaxAppointment`} className="m-0">
//                           <Input size="large" className=" !rounded-[6px] text-sm  !bg-[#E8EDF0] !border !border-gray-300 placeholder-[#9AA0A2]" placeholder="Type here" />
//                         </Form.Item>
//                       </div>
//                     </div>

//                     {/* Right: Toggle */}
//                     <div className="">
//                       <Form.Item name={toggleFieldName} valuePropName="checked" className="m-0">
//                         <Switch
//                           onChange={(checked) => {
//                             form.setFieldsValue({ [toggleFieldName]: checked });
//                           }}
//                         />
//                       </Form.Item>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>

//             {/* Save Button */}
//             <div className="mt-6 flex justify-center">
//               <TealBtn htmlType="submit" text="Save Changes" className="shadow-[0_10px_18px_rgba(20,74,108,0.28)]" />
//             </div>
//           </Form>
//         </div>
//       </div>
//     </CustomContainer>
//   )
// }


'use client'
import CustomContainer from '@/components/ui/CustomContainer'
import Link from 'next/link'
import React, { useEffect, useMemo } from 'react'
import { Divider, TimePicker } from 'antd';
import dayjs from 'dayjs';
import SubHeadingBlack from '@/components/ui/SubHeadingBlack';
import { Form, Input, Switch } from 'antd';
import TealBtn from '@/components/ui/TealBtn';
import "@/styles/AntSwitch.css"
import { useGetAvailabilityQuery, useUpsertAvailabilityMutation } from '@/redux/api/availabilityApi';
import toast from 'react-hot-toast';

// desired format: "09:00 AM" (hh:mm A)
const TIME_FORMAT = 'hh:mm A';

export default function SetAvailabilityPage() {
  const [form] = Form.useForm();
  const { data: availabilityData, isLoading, isError } = useGetAvailabilityQuery();
  const [upsertAvailability, { isLoading: isSaving }] = useUpsertAvailabilityMutation();

  // availability array from backend
  const availabilitySchedule = availabilityData?.data || [];

  // full week
  const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Build a lookup map from backend items by DAY uppercase for quick access (stable reference via useMemo)
  const backendMap = useMemo(() => {
    return (Array.isArray(availabilitySchedule) ? availabilitySchedule : []).reduce((acc, item) => {
      if (item && item.dayOfWeek) acc[item.dayOfWeek.toUpperCase()] = item;
      return acc;
    }, {});
  }, [availabilitySchedule]);

  // Populate form values when availabilitySchedule changes
  useEffect(() => {
    const values = days.reduce((acc, day) => {
      const key = day.toLowerCase();
      const backendItem = backendMap[day.toUpperCase()];

      // For TimePicker, use dayjs object or null
      acc[`${key}StartTime`] = backendItem?.startTime ? dayjs(backendItem.startTime, TIME_FORMAT) : null;
      acc[`${key}EndTime`] = backendItem?.endTime ? dayjs(backendItem.endTime, TIME_FORMAT) : null;
      acc[`${key}MaxAppointment`] = backendItem?.maxAppointments != null ? String(backendItem.maxAppointments) : '';
      acc[`${key}Toggle`] = !!backendItem?.isAvailable;

      return acc;
    }, {});

    form.setFieldsValue(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backendMap, form]);

  const onFinish = async (values) => {
    const errors = [];
    const payload = [];

    for (const day of days) {
      const key = day.toLowerCase();
      const toggleKey = `${key}Toggle`;
      const startKey = `${key}StartTime`;
      const endKey = `${key}EndTime`;
      const maxKey = `${key}MaxAppointment`;

      const isAvailable = !!values[toggleKey];

      // values from form (TimePicker returns dayjs or null)
      const formStart = values[startKey]; // dayjs or null
      const formEnd = values[endKey]; // dayjs or null
      const formMaxRaw = values[maxKey];

      // parse max if present
      const formMax = (formMaxRaw === undefined || formMaxRaw === null || formMaxRaw === '')
        ? null
        : (parseInt(String(formMaxRaw).trim(), 10) || 0);

      const existing = backendMap[day.toUpperCase()]; // may be undefined

      // Helper: convert dayjs to string
      const fmt = (djs) => (djs ? djs.format(TIME_FORMAT) : '');

      if (existing) {
        // Existing backend record: always include it in payload when:
        // - user changed anything for this day (made it available or updated times),
        // - OR user explicitly turned isAvailable to false (we still send with preserved times).
        if (!isAvailable) {
          // preserve existing times and max appointments (unless user explicitly changed them while toggling)
          const startTimeToSend = existing.startTime ?? '';
          const endTimeToSend = existing.endTime ?? '';
          const maxAppToSend = (existing.maxAppointments != null) ? existing.maxAppointments : 0;

          payload.push({
            id: existing.id ?? "",
            isAvailable: false,
            startTime: startTimeToSend,
            endTime: endTimeToSend,
            dayOfWeek: day.toUpperCase(),
            maxAppointments: maxAppToSend
          });
          continue;
        }

        // isAvailable === true for existing item:
        // prefer form values if provided, otherwise fall back to existing data
        const startToUse = formStart ? fmt(formStart) : (existing.startTime ?? '');
        const endToUse = formEnd ? fmt(formEnd) : (existing.endTime ?? '');
        const maxToUse = (formMax != null) ? formMax : ((existing.maxAppointments != null) ? existing.maxAppointments : 0);

        // require start & end to be present when making available
        if (!startToUse) errors.push(`${day}: start time missing (existing: ${existing.startTime ?? 'none'})`);
        if (!endToUse) errors.push(`${day}: end time missing (existing: ${existing.endTime ?? 'none'})`);

        payload.push({
          id: existing.id ?? "",
          isAvailable: true,
          startTime: startToUse,
          endTime: endToUse,
          dayOfWeek: day.toUpperCase(),
          maxAppointments: maxToUse
        });
      } else {
        // No existing backend item
        // If user did not provide start, end and max (all empty) and isAvailable false: omit this day
        const anyFilled = !!formStart || !!formEnd || (formMax != null);
        if (!anyFilled && !isAvailable) {
          // omit entirely
          continue;
        }

        // If user wants to create (isAvailable true) or filled values, treat as create only if has required times
        if (isAvailable) {
          // require form start & end (no existing fallback)
          if (!formStart) errors.push(`${day}: please select start time (use the TimePicker)`);
          if (!formEnd) errors.push(`${day}: please select end time (use the TimePicker)`);

          const startToSend = fmt(formStart);
          const endToSend = fmt(formEnd);
          const maxToSend = (formMax != null) ? formMax : 0;

          payload.push({
            id: "", // create
            isAvailable: true,
            startTime: startToSend,
            endTime: endToSend,
            dayOfWeek: day.toUpperCase(),
            maxAppointments: maxToSend
          });
        } else {
          // isAvailable false and anyFilled maybe true (user typed but didn't toggle) — omit as per rule
          // (If you prefer to create an unavailable day when user filled fields but left toggle off, change behavior.)
          continue;
        }
      }
    }

    if (errors.length > 0) {
      // show first few errors, stop submit
      toast.error(
        <div>
          <div className="font-semibold">Fix the following:</div>
          <div style={{ marginTop: 6 }}>
            {errors.slice(0, 6).map((e, i) => <div key={i}>{e}</div>)}
            {errors.length > 6 && <div>...and {errors.length - 6} more</div>}
          </div>
        </div>,
        { duration: 7000 }
      );
      return;
    }

    if (payload.length === 0) {
      toast.info('Nothing to save (no days selected or filled).');
      return;
    }

    try {
      // console.log('Upsert payload:', payload);
      await upsertAvailability(payload).unwrap();
      toast.success('Availability saved successfully.');
    } catch (err) {
      console.error('Failed to save availability', err);
      const errMsg = err?.data?.message || err?.message || 'Failed to save availability';
      toast.error(errMsg);
    }
  };

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

          {/* Inline load/error UI */}
          {isLoading && (
            <div className="mb-4 text-center text-gray-500">Loading availability…</div>
          )}
          {isError && (
            <div className="mb-4 text-center text-red-500">Failed to load availability. Please try again.</div>
          )}

          {/* Form */}
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            className="[&_.ant-form-item-label>label]:text-[13px] [&_.ant-form-item]:mb-0 !font-open-sans"
          >
            <div className="mt-6">
              {days.map((day, idx) => {
                const key = day.toLowerCase();
                const toggleFieldName = `${key}Toggle`;

                return (
                  <div key={idx} className="flex flex-col md:flex-row items-center justify-between mb-4 py-4 px-4 rounded-lg border border-[#F0F2F3] bg-white">
                    {/* Left: Day label */}
                    <div className="w-1/6 min-w-[110px] text-center">
                      <div className="text-[#202020] font-medium text-[18px]">{day}</div>
                    </div>

                    {/* Middle */}
                    <div className=" text-center  lg:flex lg:gap-20 ">
                      <div className='lg:flex gap-4'>
                        <div className="flex flex-col ">
                          <label className="text-[14px] text-[#848A8C] mb-2">Set Start time</label>
                          <Form.Item name={`${key}StartTime`} className="m-0">
                            <TimePicker
                              format={TIME_FORMAT}
                              use12Hours
                              minuteStep={5}
                              placeholder="09:00 AM"
                              className="!w-28 !rounded-[6px]"
                              size="large"
                            />
                          </Form.Item>
                        </div>

                        <div className="flex flex-col ">
                          <label className="text-[14px] text-[#848A8C] mb-2 ">Set End time</label>
                          <Form.Item name={`${key}EndTime`} className="m-0">
                            <TimePicker
                              format={TIME_FORMAT}
                              use12Hours
                              minuteStep={5}
                              placeholder="05:00 PM"
                              className="!w-28 !rounded-[6px]"
                              size="large"
                            />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="flex flex-col ">
                        <label className="text-[14px] text-[#848A8C] mb-2">Max appointment per day</label>
                        <Form.Item name={`${key}MaxAppointment`} className="m-0">
                          <Input size="large" className=" !rounded-[6px] text-sm  !bg-[#E8EDF0] !border !border-gray-300 placeholder-[#9AA0A2]" placeholder="Type here" />
                        </Form.Item>
                      </div>
                    </div>

                    {/* Right: Toggle */}
                    <div className="">
                      <Form.Item name={toggleFieldName} valuePropName="checked" className="m-0">
                        <Switch
                          onChange={(checked) => {
                            // If toggled off, clear times for clarity (optional)
                            if (!checked) {
                              form.setFieldsValue({
                                [`${key}StartTime`]: null,
                                [`${key}EndTime`]: null,
                              });
                            }
                            form.setFieldsValue({ [toggleFieldName]: checked });
                          }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-center">
              <TealBtn htmlType="submit" text={isSaving ? 'Saving...' : 'Save Changes'} disabled={isSaving} className="shadow-[0_10px_18px_rgba(20,74,108,0.28)]" />
            </div>
          </Form>
        </div>
      </div>
    </CustomContainer>
  )
}
