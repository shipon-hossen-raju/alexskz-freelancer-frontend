'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Paragraph from '../ui/Paragraph'
import GreenPara from '../ui/GreenPara'
import TealBtn from '../ui/TealBtn'
import ScheduleAppointmentModal from '../modals/ScheduleAppointmentModal'
import edit from '@/assets/icons/edit.svg'
import trash from '@/assets/icons/trash.svg'
import { useDeleteServiceMutation } from '@/redux/api/serviceApi'
import toast from 'react-hot-toast'
import { useDispatch } from 'node_modules/react-redux/dist/react-redux'
import { serviceIdForBooking } from '@/redux/slices/bookingSlice'
import { useGetUserProfileQuery } from '@/redux/auth/authApi'

export default function OfferedServicesCard({
    service,
    profile = false,
    onEdit = () => { },
    onDelete = () => { },

}) {
    const [bookingModal, setBookingModal] = useState(false)
    const [deleteService, { isLoading: isDeleteLoading }] = useDeleteServiceMutation();
    const dispatch = useDispatch();
    const { data: userData, error, isLoading } = useGetUserProfileQuery();
    if (isLoading) {
        return;
    }

    // console.log('services', service?.id)
    const serviceId = service?.id;

    const handleDeleteService = () => {
        if (profile) {
            const payload = service?.id
            deleteService(payload)
                .unwrap()
                .then((res) => {
                    toast.success("Successfully Deleted!")
                })
                .catch((err) => {
                    toast.error(err?.data?.message || err?.message || "Failed")
                })

        }
    }




    const handleBooking = () => {
        if (!userData) {
            return toast.error("Please login to book a service");
        }
        dispatch(serviceIdForBooking(serviceId));
        setBookingModal(true);


    }

   
    return (
        <div className='flex flex-col md:flex-row gap-4 justify-between items-center md:items-start   bg-white border border-[#E5E5E5] rounded-[10px] p-2'>
            <div className='flex flex-col md:flex-row gap-4 '>
                <div className='flex justify-center md:justify-start  '>
                    <Image src={service.thumbnail} alt="image" className='rounded-[10px] w-[137px] min-h-[127px] object-cover' width={100} height={100} />
                </div>
                <div className='flex flex-col gap-2 justify-between items-center md:items-start flex-1'>
                    <h3 className='font-open-sans font-semibold text-black text-xl'>{service.title}</h3>
                    <Paragraph text={service.description} />
                    <GreenPara text={`${service.price}$`} />
                </div>
            </div>

            {/* button */}

            <div>
                {
                    profile && (
                        <div className="flex items-center gap-1">
                            <button onClick={onEdit} className="cursor-pointer p-1 rounded-md hover:bg-gray-100 focus:outline-none">
                                <Image src={edit} alt="icon" className="w-10" />

                            </button>

                            <button onClick={handleDeleteService} className="cursor-pointer p-1 rounded-md hover:bg-gray-100 focus:outline-none">
                                <Image src={trash} alt="icon" className="w-10" />
                            </button>
                        </div>
                    )
                }
            </div>

            <div>
                {
                    !profile && (
                        <div>
                            <TealBtn text="Book now" onClick={handleBooking} />
                        </div>

                    )
                }
            </div>
            {/* Shcedule Modal */}
            <ScheduleAppointmentModal
                openBookingModal={bookingModal}
                onCloseBookingModal={() => setBookingModal(false)}
                serviceId={serviceId}


            />
        </div>
    )
}
