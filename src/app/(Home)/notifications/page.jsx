"use client"

import CustomContainer from "@/components/ui/CustomContainer"
import Heading from "@/components/ui/Heading"
import { useGetAllCategoryQuery } from "@/redux/api/categoryApi"
import React, { useMemo } from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import isToday from "dayjs/plugin/isToday"
import isYesterday from "dayjs/plugin/isYesterday"
import { useGetAllNotificationQuery } from "@/redux/api/notificationApi"

dayjs.extend(relativeTime)
dayjs.extend(isToday)
dayjs.extend(isYesterday)

function Icon({ type }) {
  if (type === "BOOKING_REQUEST") {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2.5" y="7" width="19" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 11h19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function NotificationsPanel() {
  const { data: notificationData, isLoading, isError } = useGetAllNotificationQuery()

  // console.log('notifications', notificationData)

  // Transform notifications to group by date
  const groupedNotifications = useMemo(() => {
    if (!notificationData?.data?.notifications) return []

    const groups = {}

    notificationData.data.notifications.forEach((notif) => {
      const dateObj = dayjs(notif.createdAt)
      let dateKey = dateObj.format("DD/MM/YYYY")

      if (dateObj.isToday()) dateKey = "Today"
      else if (dateObj.isYesterday()) dateKey = "Yesterday"

      if (!groups[dateKey]) groups[dateKey] = []
      groups[dateKey].push({
        id: notif.id,
        type: notif.type,
        title: notif.title,
        subtitle: notif.body,
      })
    })

    // Convert to array of { date, items }
    return Object.keys(groups)
      .sort((a, b) => dayjs(b, ["DD/MM/YYYY"]).unix() - dayjs(a, ["DD/MM/YYYY"]).unix())
      .map((date) => ({ date, items: groups[date] }))
  }, [notificationData])

  if (isLoading) return <p>Loading notifications...</p>
  if (isError) return <p>Failed to load notifications.</p>

  return (
    <CustomContainer>
      <div className="w-full md:px-[10%]">
        <div className="mb-6 md:mb-10">
          <Heading text="Notifications" />
          <hr className="text-[#E9E9E9] mt-4" />
        </div>

        {groupedNotifications.map((group) => (
          <section key={group.date} className="mb-6 font-open-sans">
            <h3 className="text-sm font-medium text-gray-700 mb-3">{group.date}</h3>

            <div className="space-y-4">
              {group.items.map((item) => (
                <article
                  key={item.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-[6px_6px_0_rgba(0,0,0,0.04)] ring-1 ring-gray-100"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <Icon type={item.type} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </CustomContainer>
  )
}
