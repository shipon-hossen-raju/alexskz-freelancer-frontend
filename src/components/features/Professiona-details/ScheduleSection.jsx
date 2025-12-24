'use client';

import React from 'react';

const WEEKDAY_FROM_API = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

function parseTimeToMinutes(t) {
  if (!t) return null;
  const m = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return null;
  let hour = parseInt(m[1], 10);
  const minute = parseInt(m[2], 10);
  const ampm = m[3].toUpperCase();
  if (ampm === 'PM' && hour !== 12) hour += 12;
  if (ampm === 'AM' && hour === 12) hour = 0;
  return hour * 60 + minute;
}

function formatMinutesToLabel(mins) {
  const hour24 = Math.floor(mins / 60);
  const minute = mins % 60;
  const ampm = hour24 >= 12 ? 'PM' : 'AM';
  let hour12 = hour24 % 12;
  if (hour12 === 0) hour12 = 12;
  return `${String(hour12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${ampm}`;
}

function all24Hours() {
  return Array.from({ length: 24 }, (_, i) => i);
}

function buildWeekdayHourMaps(availability) {
  const maps = new Map();
  if (!Array.isArray(availability)) return maps;

  availability.forEach((entry) => {
    if (!entry) return;
    const weekdayIndex = WEEKDAY_FROM_API[(entry.dayOfWeek || '').toUpperCase()];
    if (weekdayIndex == null) return;

    const sMin = parseTimeToMinutes(entry.startTime);
    const eMin = parseTimeToMinutes(entry.endTime);
    if (sMin == null || eMin == null) return;

    const startHour = Math.floor(sMin / 60);
    const endHour = Math.floor(eMin / 60);

    if (!maps.has(weekdayIndex)) {
      maps.set(weekdayIndex, {
        availableHoursSet: new Set(),
        sourcePresentHoursSet: new Set(),
      });
    }
    const bucket = maps.get(weekdayIndex);

    for (let h = 0; h < 24; h++) {
      if (h >= startHour && h <= endHour) {
        bucket.sourcePresentHoursSet.add(h);
        if (!!entry.isAvailable && !entry.isFullyBooked) {
          bucket.availableHoursSet.add(h);
        }
      }
    }
  });

  return maps;
}

function getNextDays(daysToShow = 7) {
  const out = [];
  const today = new Date();
  for (let i = 0; i < daysToShow; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push({
      dateObj: d,
      iso: d.toISOString().slice(0, 10),
      weekdayIndex: d.getDay(),
      label: d.toLocaleDateString(undefined, { weekday: 'short' }),
      dateLabel: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    });
  }
  return out;
}

export default function ScheduleSection({ availability = [], daysToShow = 7 }) {
  const weekdayMaps = buildWeekdayHourMaps(availability);
  const days = getNextDays(daysToShow);

  const slotBase = 'flex items-center justify-center text-[12px] leading-none select-none w-16 h-12';
  const slotAvailable = `${slotBase} bg-[#DBF0E0] text-[#108a55] rounded-md`;
  const slotDisabled = `${slotBase} bg-black/5 text-black/50 rounded-md`;

  return (
    <div className="bg-white rounded-md p-4 w-full flex justify-center">
      <div className="overflow-auto max-w-full h-100 ">
        {/* Title */}
        <div className=" text-[15px] font-semibold text-gray-900 mb-4 text-center">
          Schedule 
        </div>

        {/* Grid */}
        <div className="inline-block min-w-max">
          {/* Days header */}
          <div className="flex sticky top-0 bg-white z-10 mb-1">
            {days.map((d) => (
              <div
                key={d.iso}
                className="w-16 text-center text-sm font-semibold text-gray-800 px-1 m-1"
              >
                <div>{d.label}</div>
                <div className="text-xs text-gray-500">{d.dateLabel}</div>
              </div>
            ))}
          </div>

          {/* Slots */}
          <div className="flex flex-col">
            {all24Hours().map((hour) => (
              <div key={hour} className="flex">
                {days.map((d) => {
                  const weekdayIndex = d.weekdayIndex;
                  const maps = weekdayMaps.get(weekdayIndex) || {
                    availableHoursSet: new Set(),
                    sourcePresentHoursSet: new Set(),
                  };

                  const inSource = maps.sourcePresentHoursSet.has(hour);
                  const isAvailable = inSource && maps.availableHoursSet.has(hour);

                  return (
                    <div
                      key={d.iso + hour}
                      className={`${isAvailable ? slotAvailable : slotDisabled} m-1`}
                      title={
                        inSource
                          ? isAvailable
                            ? 'Available'
                            : 'Not available/fully booked'
                          : 'Outside provider hours'
                      }
                    >
                      {formatMinutesToLabel(hour * 60)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
