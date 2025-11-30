'use client';

import { Modal } from 'antd';
import React, { useMemo, useState } from 'react';
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

// parse API "slot" field like "12:00 AM - 01:00 AM" -> "12:00 AM"
function parseStartTimeFromSlot(slotStr) {
  if (!slotStr) return null;
  const parts = slotStr.split('-');
  return parts[0].trim();
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

  // normalize server response
  const apiSlotsArray = useMemo(() => {
    if (!rawResp) return [];
    return Array.isArray(rawResp) ? rawResp : rawResp.data ?? [];
  }, [rawResp]);

  // Build availability map: dayOfWeek -> { id, slots: Map(startTime => isFullyBooked) }
  const availabilityByDay = useMemo(() => {
    const map = new Map();
    for (const dayEntry of apiSlotsArray) {
      const dow = dayEntry.dayOfWeek?.toUpperCase();
      if (!dow) continue;
      const inner = new Map();
      (dayEntry.availableSlots || []).forEach((s) => {
        const start = parseStartTimeFromSlot(s.slot);
        inner.set(start, !!s.isFullyBooked);
      });
      map.set(dow, { id: dayEntry.id, slots: inner });
    }
    return map;
  }, [apiSlotsArray]);

  console.log('api slot array', apiSlotsArray)

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
    const isFullyBooked = dayInfo?.slots?.get(timeStr) ?? null;
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

          <div className="overflow-x-auto">
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
                      const isFullyBooked = dayInfo?.slots?.get(t) ?? null;
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
        onConfirm={(payload) => {
          console.log('Booking payload:', payload);
          setConfirmOpen(false);
        }}
      />
    </>
  );
}
