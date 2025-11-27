'use client';

import React from 'react';
import { Modal } from 'antd';
import Image from 'next/image';
import Heading from '@/components/ui/Heading';
import Paragraph from '@/components/ui/Paragraph';

export default function PortfolioViewModal({
  open,
  onClose,
  project,
}) {
  const images = project?.photos ?? [];
  const createdAt = project?.createdAt;

  const dateObj = createdAt ? new Date(createdAt) : null;
  const formattedDate = dateObj
    ? dateObj.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    : '';

  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={1040}
      maskClosable
      styles={{
        content: {
          borderRadius: 10,
          padding: 0,
          boxShadow: '0 24px 80px rgba(0,0,0,0.28)',
          overflow: 'hidden',
          background: '#ffffff',
        },
        body: { padding: 0 },
      }}
      className="case-study-modal"
    >
      <div className="w-full">
        {/* Top: Title + date */}
        <div className="flex items-start justify-between gap-4 px-6 md:px-8 pt-16">
          <div className="flex-1">
            <Heading text={project?.title} />
          </div>
          <span className="text-xs md:text-sm text-gray-500 select-none pt-1">
            {formattedDate}
          </span>
        </div>

        {/* Description */}
        <div className="px-6 md:px-8 pt-4">
          <Paragraph text={project?.description} />
        </div>

        {/* Thumbnail (make sure it has its own stacking & spacing) */}
        <div className="px-4 md:px-6 pt-6">
          <div className="relative w-full h-[360px] mb-6 z-20 overflow-hidden rounded-[10px]">
            {isVideo(project?.thumbnail) ? (
              <video
                src={project?.thumbnail}
                className="w-full h-full object-cover"
                controls
                poster=""
              />
            ) : (
              <Image
                src={project?.thumbnail || '/fallback.jpg'}
                alt={project?.title || 'thumbnail'}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1040px) 100vw, 1040px"
                priority
              />
            )}
          </div>
        </div>

        {/* Canvas area (image gallery) */}
        <div className="px-4 md:px-6 pb-6 md:pb-8">
          {images.length === 0 && (
            <p className="text-sm text-gray-500">No images available</p>
          )}

          {images.map((image, idx) => (
            <div
              key={`${image}-${idx}`}
              className="relative w-full h-[300px] mb-6 overflow-hidden rounded-[10px]"
            >
              {/* Use fill — parent is relative + has height */}
              <Image
                src={image}
                alt={`project-image-${idx}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1040px) 100vw, 1040px"
              />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
