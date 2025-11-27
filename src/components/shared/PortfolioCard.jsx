
import React, { useState } from 'react'
import Image from 'next/image'
import Paragraph from '../ui/Paragraph'
import arrow from '@/assets/icons/arrow-right.svg'
import edit from '@/assets/icons/edit.svg'
import trash from '@/assets/icons/trash.svg'
import PortfolioViewModal from '../modals/PortfolioViewModal'
import { useDeleteProjectMutation } from '@/redux/api/portfolioApi'
import toast from 'react-hot-toast'

export default function PortfolioCard({
    id,
    title,
    description,
    imgSrc,
    imgAlt,
    showPlay = false,

    project = null,

    onEdit = () => { },
    onDelete = () => { },
    profile = false

}) {
    const [open, setOpen] = useState(false);
    const [deleteProject, { isLoading }] = useDeleteProjectMutation();
    console.log('project for delte', project)

    const handleDeleteProject = () => {
        if (profile) {
            const payload = project?.id;
            deleteProject(payload)
                .unwrap()
                .then(() => {
                    toast.success("Successfully deleted!")
                })
                .catch((err) => {
                    console.log('delete error', err)
                    toast.error(err?.data?.message || err?.message || 'Failed')
                })
        }
    }

    const isVideo = (url) => {
        return /\.(mp4|webm|ogg)$/i.test(url);
    }

    return (
        <article className="flex flex-col  overflow-hidden">


            {/* image */}
            <div className='relative ' style={{
                // background: 'linear-gradient(135deg, rgba(254,99,110,0.85) 0%, rgba(251,140,0,0.85) 100%)',

            }}>

                {isVideo(project?.thumbnail) ? (
                    <video src={project?.thumbnail} className="rounded-[10px] w-full" controls poster="" />) : (
                    <Image src={project?.thumbnail} alt={title} className="rounded-[10px]" width={200} height={100} />

                )}



            </div>


            {/* content */}
            <div className=" pb-4 pt-4 flex-1 flex flex-col">
                <h3 className="text-[18px] font-semibold text-gray-800 font-open-sans">{project?.title}</h3>
                <p className="mt-4  text-[#9F9C96] leading-relaxed flex-1 font-open-sans">{project?.description}</p>


                <div className="mt-4 flex items-center justify-between">
                    <button
                        onClick={() => setOpen(true)}
                        className="cursor-pointer text-gray-600 font-open-sans font-medium inline-flex items-center gap-2 focus:outline-none"
                    >
                        <span className='text-xl'>View</span>
                        <Image src={arrow} alt="icon" />
                    </button>

                    {
                        profile && (
                            <div className="flex items-center gap-3">
                                <button onClick={() => onEdit(project)} aria-label={`Edit ${title}`} className="cursor-pointer p-1 rounded-md hover:bg-gray-100 focus:outline-none">
                                    <Image src={edit} alt="icon" />

                                </button>

                                <button onClick={handleDeleteProject} aria-label={`Delete ${title}`} className="cursor-pointer p-1 rounded-md hover:bg-gray-100 focus:outline-none">
                                    <Image src={trash} alt="icon" />
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>

            <PortfolioViewModal
                open={open}
                onClose={() => setOpen(false)}
                project={project}
            />
        </article>
    )
}


