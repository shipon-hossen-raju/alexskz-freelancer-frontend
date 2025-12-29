'use client';

import { Modal } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import ConfirmBookingModal from './ConfirmBookingModal';
import { useGetAvailableSlotsQuery } from '@/redux/api/bookingApi';

// helpers
const WEEKDAY_NAMES = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
const WEEKDAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// return array of next 7 days including today
function getNext7Days() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const weekdayIndex = d.getDay(); // 0 = Sunday
    const dayOfWeekName = WEEKDAY_NAMES[weekdayIndex]; // e.g. 'MONDAY'
    const dayLabel = WEEKDAY_SHORT[weekdayIndex]; // e.g. 'Mon'
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // 01..12
    const date = String(d.getDate()).padStart(2, '0'); // 01..31
    const isoDate = `${year}-${month}-${date}`; // YYYY-MM-DD
    const display = `${dayLabel}, ${date} ${d.toLocaleString('default', { month: 'short' })} ${year}`;
    days.push({
      dateObj: d,
      isoDate,
      dayLabel,
      dayOfWeekName,
      date,
      month,
      year,
      display,
    });
  }
  return days;
}

// generate 24 hourly times in "HH:MM AM/PM" format
function generateHourlyTimes() {
  const times = [];
  for (let h = 0; h < 24; h++) {
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const hourStr = String(hour12).padStart(2, '0');
    const ampm = h < 12 ? 'AM' : 'PM';
    times.push(`${hourStr}:00 ${ampm}`);
  }
  return times;
}

// parse API "slot" field like "12:00 AM - 01:00 AM" or "00:00 AM - 00:00 PM"
// -> return hour index 0..23 (integer) for the start time
function parseStartHourFromSlot(slotStr) {
  if (!slotStr) return null;
  const startPart = slotStr.split('-')[0].trim(); // e.g. "00:00 AM" or "12:00 AM" or "13:00 AM"
  const m = startPart.match(/^(\d{1,2}):\d{2}\s*(AM|PM)?/i);
  if (!m) return null;
  let hour = parseInt(m[1], 10);
  const ampm = m[2] ? m[2].toUpperCase() : null;

  if (ampm === 'AM') {
    if (hour === 12) hour = 0;
  } else if (ampm === 'PM') {
    if (hour !== 12) hour = hour + 12;
  } else {
    // no AM/PM suffix — treat as 24-hour value, normalize
    hour = hour % 24;
  }

  return hour % 24;
}

// convert UI label like "12:00 AM" or "01:00 PM" -> hour 0..23
function convertLabelToHour(label) {
  if (!label) return null;
  const m = label.match(/^(\d{1,2}):\d{2}\s*(AM|PM)$/i);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const ampm = m[2].toUpperCase();
  if (ampm === 'AM') {
    if (h === 12) h = 0;
  } else {
    // PM
    if (h !== 12) h = h + 12;
  }
  return h % 24;
}

export default function ScheduleAppointmentModal({
  openBookingModal,
  onCloseBookingModal,
  serviceId,
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // query
  const { data: rawResp, isLoading, isFetching, isError, refetch } =
    useGetAvailableSlotsQuery(serviceId, {
      skip: !serviceId,
    });

  // debug
  // console.log('availability slots', rawResp)

  useEffect(() => {
    if (openBookingModal && serviceId) {
      refetch();
    }
  }, [openBookingModal, serviceId, refetch]);

  // normalize server response
  const apiSlotsArray = useMemo(() => {
    if (!rawResp) return [];
    // rawResp might be { success: ..., data: [...] } or already an array
    if (Array.isArray(rawResp)) return rawResp;
    if (rawResp.data && Array.isArray(rawResp.data)) return rawResp.data;
    return [];
  }, [rawResp]);

  // Build availability map: dayOfWeek -> { id, slots: Map(hourIndex => isFullyBooked) }
  const availabilityByDay = useMemo(() => {
    const map = new Map();
    for (const dayEntry of apiSlotsArray) {
      // support both 'dayOfWeek' and 'day' keys
      const dowRaw = (dayEntry.dayOfWeek ?? dayEntry.day ?? '').toString().toUpperCase();
      if (!dowRaw) continue;

      const inner = new Map();
      // support both 'availableSlots' and 'slots' arrays
      const slotList = dayEntry.availableSlots ?? dayEntry.slots ?? [];
      (slotList || []).forEach((s) => {
        const startHour = parseStartHourFromSlot(s.slot);
        if (startHour === null || startHour === undefined) return;
        inner.set(startHour, !!s.isFullyBooked);
      });

      map.set(dowRaw, { id: dayEntry.id ?? null, slots: inner });
    }
    return map;
  }, [apiSlotsArray]);

  const days = useMemo(() => getNext7Days(), []);
  const times = useMemo(() => generateHourlyTimes(), []);

  const pillBase =
    'min-w-[88px] inline-flex items-center justify-center rounded-md px-3 py-2 text-[12px] leading-none transition';
  const clsAvailable = `${pillBase} bg-[#DBF0E0] text-[#108a55] hover:bg-[#A1D7B6] hover:text-[#0C6F44] active:bg-[#c9e8da] cursor-pointer`;
  const clsBooked = `${pillBase} bg-black/10 text-black cursor-not-allowed`;

  // when user picks a slot
  const onSelect = (dayObj, timeStr, dayId) => {
    const datetimeStr = `${dayObj.isoDate} ${timeStr}`;
    const payload = {
      dayId,
      date: dayObj.isoDate,
      display: dayObj.display,
      time: timeStr,
      datetime: datetimeStr,
    };

    onCloseBookingModal?.();
    setSelectedSlot(payload);

    setTimeout(() => setConfirmOpen(true), 0);
  };

  const handleSelect = (dayObj, timeStr) => {
    const dayInfo = availabilityByDay.get(dayObj.dayOfWeekName);
    const hourIndex = convertLabelToHour(timeStr);
    const isFullyBooked = hourIndex === null ? null : dayInfo?.slots?.get(hourIndex) ?? null;
    const isAvailable = dayInfo ? isFullyBooked === false : false;

    if (!isAvailable) return;
    onSelect(dayObj, timeStr, dayInfo?.id ?? null);
  };

  return (
    <>
      {/* Schedule modal */}
      <Modal
        open={openBookingModal}
        onCancel={onCloseBookingModal}
        footer={null}
        centered
        width={760}
        title={null}
        destroyOnClose
        className="font-open-sans"
        styles={{ content: { borderRadius: 12, overflow: 'hidden', padding: 0 } }}
      >
        <div className="p-4 sm:p-5 font-open-sans">
          <div className="mb-3">
            <div className="text-[15px] font-semibold text-gray-900">Schedule an appointment</div>
          </div>
 
          <div className="overflow-x-auto overflow-y-scroll max-h-[70vh]">
            <div className="min-w-[680px]">
              {/* header row */}
              <div className="grid grid-cols-7 gap-3 mb-2">
                {days.map((d) => (
                  <div key={d.isoDate} className="text-center">
                    <div className="text-[13px] font-semibold text-gray-800">{d.dayLabel}</div>
                    <div className="text-[11px] text-gray-500">{d.display}</div>
                  </div>
                ))}
              </div>

              {/* time grid */}
              <div className="grid grid-cols-7 gap-3">
                {days.map((d) => (
                  <div key={d.isoDate} className="space-y-2">
                    {times.map((t) => {
                      const dayInfo = availabilityByDay.get(d.dayOfWeekName);
                      const hourIndex = convertLabelToHour(t);
                      const isFullyBooked = hourIndex === null ? null : dayInfo?.slots?.get(hourIndex) ?? null;
                      const isAvailable = dayInfo ? isFullyBooked === false : false;

                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => handleSelect(d, t)}
                          className={isAvailable ? clsAvailable : clsBooked}
                          disabled={!isAvailable}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Confirm Booking modal */}
      <ConfirmBookingModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        slot={selectedSlot}
        serviceId={serviceId}
        onConfirm={(payload) => {
          // console.log('Booking payload:', payload);
          setConfirmOpen(false);
        }}
      />
    </>
  );
}
