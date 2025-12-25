"use client";

import clock from "@/assets/icons/clock.svg";
import sub from "@/assets/icons/crown.svg";
import edit from "@/assets/icons/edit.svg";
import star from "@/assets/icons/star.svg";
import port from "@/assets/icons/task-square.svg";
import msg from "@/assets/icons/whatsapp.svg";
import {
  useUploadCoverPhotoMutation,
  useUploadProfileImageMutation,
} from "@/redux/api/profileApi";
import { useDeleteServiceMutation } from "@/redux/api/serviceApi";
import { useGetUserProfileQuery } from "@/redux/auth/authApi";
import Avatar from "@mui/material/Avatar";
import { Skeleton, Upload } from "antd";
import Image from "next/image";
import Link from "node_modules/next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowForward } from "react-icons/io";
import AddWhatsAppModal from "../modals/AddWhatsAppModal";
import CreateEditPackageModal from "../modals/CreateEditPackageModal";
import OfferedServicesCard from "../shared/OfferedServicesCard";
import Paragraph from "../ui/Paragraph";
import SubHeadingBlack from "../ui/SubHeadingBlack";
import TealBtn from "../ui/TealBtn";

import circleMark from "@/assets/icons/checkmark-circle.svg";
import location from "@/assets/icons/location.svg";
import msg2 from "@/assets/icons/messages-2.svg";
import skills from "@/assets/icons/skills.png";
import { useGetMyProjectsQuery } from "@/redux/api/portfolioApi";
import RatingsHeader from "../features/Professiona-details/RatingsHeader";
import Reviews from "../features/Professiona-details/Reviews";
import ScheduleSection from "../features/Professiona-details/ScheduleSection";
import AddEditProjectModal from "../modals/AddEditProjectModal";
import NoDataFount from "../notFount/NoDataFount";
import PortfolioCard from "../shared/PortfolioCard";
import Heading from "../ui/Heading";
import SubHeading from "../ui/SubHeading";
import VerifiedDot from "../ui/VerifiedDot";
import Loading from "../shared/Loading";

const linkItems = [
  {
    id: 1,
    icon: edit,
    text: "Edit profile",
    path: "/profile/edit",
  },
  {
    id: 2,
    icon: clock,
    text: "Set Availability",
    path: "/profile/set-availability",
  },
  {
    id: 3,
    icon: msg,
    text: "Add Whats-app",
    path: "/profile/add/whats-app",
  },
  {
    id: 4,
    icon: sub,
    text: "Subscription",
    path: "/profile/subscription",
  },
  {
    id: 5,
    icon: port,
    text: "Portfolio",
    path: "/profile/portfolio",
  },
];

export default function ProfessionalProfile() {
  const [serviceToEdit, setServiceToEdit] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [heading, setHeading] = useState("");
  const [openWhatsAppModal, setopenWhatsAppModal] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [createProjectModal, setCreateProjectModal] = useState(false);
  const [editProjectModal, setEditProjectModal] = useState(false);
  const {
    data: myData,
    error: myError,
    isLoading: amILoading,
    refetch,
  } = useGetUserProfileQuery();
  const [uploadProfileImage, { isLoading }] = useUploadProfileImageMutation();
  const [uploadCoverPhoto, { isLoading: isCoverPhotoLoading }] =
    useUploadCoverPhotoMutation();
  const [deleteService, { isLoading: isDeleteLoading }] =
    useDeleteServiceMutation();
  const { data: projectData, isLoading: isProjectsLoading } =
    useGetMyProjectsQuery();
  const projects = projectData?.data?.projects || [];

  const me = myData?.data;

  useEffect(() => {
    if (!me) {
      return;
    }
  }, [me]);
  const isVerified = me?.isVerify || false;

  useEffect(() => {
    if (me?.profileImage) {
      setAvatar(me.profileImage);
    }
  }, [me?.profileImage]);

  useEffect(() => {
    if (me?.cover) {
      setCoverPhoto(me.cover);
    }
  }, [me?.cover]);

  const professionalAboutLists = [
    {
      id: 1,
      icon: clock,
      text: `Experience: ${me?.experience || "N/A"}`,
    },
    {
      id: 2,
      icon: msg2,
      text: `Language: ${me?.language}  `,
    },
    ...(isVerified
      ? [
          {
            id: 3,
            icon: circleMark,
            text: "Verified Pro",
          },
        ]
      : []),
    {
      id: 4,
      icon: location,
      text: `Location: ${me?.address}`,
    },
    {
      id: 5,
      icon: skills,
      text: `Skills: ${me?.skills?.join(", ") || "N/A"}`,
    },
  ];

  const handleWhatsApp = () => {
    setopenWhatsAppModal(true);
  };

  const handleCloseWhatsAppModal = () => {
    setopenWhatsAppModal(false);
  };

  // profile pic upload
  const beforeUpload = async (file) => {
    const isImage = file.type && file.type.startsWith("image/");
    if (!isImage) {
      toast.error("You can only upload image files");
      return Upload.LIST_IGNORE;
    }

    // show immediate preview using object URL
    const localPreview = URL.createObjectURL(file);
    setAvatar(localPreview);
    const fd = new FormData();
    fd.append("image", file);
    try {
      const res = await uploadProfileImage(fd).unwrap();
      const returnedUrl = res?.data?.profileImage || res?.profileImage || null;
      if (returnedUrl) {
        setAvatar(returnedUrl);
      } else {
        await refetch();
      }
      toast.success("Successfully uploaded!");
    } catch (err) {
      // console.error("Upload failed:", err);
      toast.error("Upload failed. Try again.");
      // optionally revert preview
      if (me?.profileImage) setAvatar(me.profileImage);
      else setAvatar("");
    }

    return false;
  };

  // cover photo upload
  const beforeUploadCoverPhoto = async (file) => {
    const isImage = file.type && file.type.startsWith("image/");
    if (!isImage) {
      toast.error("You can only upload image files");
      return Upload.LIST_IGNORE;
    }

    // show immediate preview using object URL
    const localPreview = URL.createObjectURL(file);
    setCoverPhoto(localPreview);
    const fdCover = new FormData();
    fdCover.append("image", file);
    try {
      const res = await uploadCoverPhoto(fdCover).unwrap();
      const returnedUrl = res?.data?.cover || res?.cover || null;
      if (returnedUrl) {
        setCoverPhoto(returnedUrl);
      } else {
        await refetch();
      }
      toast.success("Successfully uploaded!");
    } catch (err) {
      // console.error("Upload failed:", err);
      toast.error("Upload failed. Try again.");
      // optionally revert preview
      if (me?.cover) setCoverPhoto(me.cover);
      else setCoverPhoto("");
    }

    return false;
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCreateModal(false);
    setEditModal(false);
  };

  const handleCloseProjectModal = () => {
    setOpenProjectModal(false);
    setCreateProjectModal(false);
    setEditProjectModal(false);
    setSelectedProject(null);
  };

  const firstName = me?.firstName || "";
  const lastName = me?.lastName || "";
  const name = `${firstName} ${lastName}`.trim();
  const about = me?.about || "";
  const services = me?.Service;
  const reviewCount = me?.reviewCount || 0;
  const reviewAvg = me?.avgRating || 0;
  const reviews = me?.reviews;

  return (
    <>
      {amILoading ? (
        <Loading />
      ) : (
        <div>
          <div className=" p-4 bg-white rounded-[12px] border border-[#E6E6E6] shadow-[0_12px_34px_rgba(0,0,0,0.10)] overflow-hidden">
            {/* Cover */}
            <div className="relative h-[140px] lg:h-[290px] w-full">
              <Image
                src={coverPhoto}
                alt="cover"
                fill
                className="object-cover rounded-[12px]"
              />
              <div className="absolute bottom-1 right-1">
                {/* upload cover photo */}
                <Upload
                  accept="image/*"
                  showUploadList={false}
                  beforeUpload={beforeUploadCoverPhoto}
                >
                  <button
                    type="button"
                    aria-label="Upload avatar"
                    className="cursor-pointer w-7 h-7 rounded-full bg-white border border-[#8BCF9A] grid place-items-center shadow-sm"
                  >
                    {/* camera icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                        stroke="#8BCF9A"
                        strokeWidth="2"
                      />
                      <path
                        d="M4 8h3l2-3h6l2 3h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z"
                        stroke="#8BCF9A"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </Upload>
              </div>
            </div>

            {/* Body */}
            <div className=" pt-4 pb-5">
              {/* Avatar + camera */}
              <div className="relative -mt-12 lg:-mt-20 mb-2 w-[72px] h-[72px] lg:w-[142px] lg:h-[142px]">
                <div className="relative w-full h-full rounded-full ring-2 ring-[#8BCF9A] overflow-hidden bg-gray-100">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 grid place-items-center">
                      <Avatar sx={{ width: "100%", height: "100%" }} />
                    </div>
                  )}
                </div>

                {/* camera upload */}
                <div className="absolute -bottom-1 -right-1 lg:bottom-2 lg:right-2">
                  <Upload
                    accept="image/*"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                  >
                    <button
                      type="button"
                      aria-label="Upload avatar"
                      className="cursor-pointer w-7 h-7 rounded-full bg-white border border-[#8BCF9A] grid place-items-center shadow-sm"
                    >
                      {/* camera icon */}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                          stroke="#8BCF9A"
                          strokeWidth="2"
                        />
                        <path
                          d="M4 8h3l2-3h6l2 3h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z"
                          stroke="#8BCF9A"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                  </Upload>
                </div>
              </div>

              <div className="font-open-sans mt-4">
                {/* name + rating */}
                <div className="flex justify-between items-center">
                  {/* Name */}
                  <div className="flex gap-2 items-center">
                    <Heading text={name} />
                    {isVerified && <VerifiedDot />}
                  </div>

                  {/* rating */}
                  <div className="flex  gap-1 items-center">
                    <Image src={star} alt="icon " className="lg:w-5" />
                    <p className="text-[#333333] font-open-sans text-sm lg:text-xl">
                      {reviewAvg}
                    </p>
                    <Paragraph text={`(${reviewCount})`} />
                  </div>
                </div>

                <div className="mt-3">
                  <SubHeading text={me?.category?.title} />
                </div>

                {/* about lists */}
                <div className="mt-4">
                  <ul className="space-y-2 lg:space-y-6">
                    {professionalAboutLists?.map((list) => (
                      <li className="flex gap-2 items-center">
                        <Image
                          src={list.icon}
                          alt="icon"
                          className="w-7 h-7 object-cover"
                        />
                        <Paragraph text={list.text} />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* About */}
                <div className="mt-4">
                  <div className="text-[16px] font-semibold text-[#202020]">
                    About me
                  </div>

                  <Paragraph text={about} />
                </div>

                {/* Divider */}
                <div className="mt-6 h-px w-full bg-[#E9E9E9]" />

                {/* Menu list */}
                <ul className="mt-2 space-y-1">
                  {linkItems.map((item) => {
                    if (item.id === 3) {
                      return (
                        <li
                          key={item.id}
                          className=" mb-4 cursor-pointer"
                          onClick={handleWhatsApp}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2 mb-4">
                              <Image src={item.icon} alt="icon" />
                              {item.text}
                            </div>
                            <IoIosArrowForward className="text-xl" />
                          </div>

                          <hr className="text-[#E9E9E9] " />
                        </li>
                      );
                    }

                    return (
                      <Link href={item.path}>
                        <li key={item.id} className=" mb-4">
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2 mb-4">
                              <Image src={item.icon} alt="icon" />
                              {item.text}
                            </div>
                            <IoIosArrowForward className="text-xl" />
                          </div>
                          <hr className="text-[#E9E9E9] " />
                        </li>
                      </Link>
                    );
                  })}
                </ul>

                {/* Verify + Change Password pills */}
                <div className="mt-10 space-y-4">
                  {/* Verify your account */}
                  <Link
                    href="/profile/verify-account"
                    className="w-full rounded-[10px] bg-[#E9F4EE] border border-[#D6EAD9] flex items-center justify-between px-4 py-3"
                  >
                    <span className="text-[14px] text-[#202020]">
                      Verify your account
                    </span>
                    <div className="">
                      <IoIosArrowForward className="text-[#8BCF9A]" />
                    </div>
                  </Link>

                  {/* Change Password */}
                  <Link
                    href="/profile/change-password"
                    className="w-full rounded-[10px] bg-[#E5E5E5] border border-[#D9D9D9] flex items-center justify-between px-4 py-3"
                  >
                    <span className="text-[14px] text-[#6F6F6F]">
                      Change Password
                    </span>
                    <div className=" ">
                      <IoIosArrowForward />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* portfolios */}
          <div className="my-20 ">
            <div className="flex flex-col gap-4 md:flex-row justify-between my-10">
              {/* heading */}
              <Heading text="My Latest Projects" />
            </div>

            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 lg:mt-14">
              {projects?.slice(0, 4).map((project) => (
                <PortfolioCard
                  key={project.id ?? project._id ?? idx}
                  project={project}
                  onView={(id) => console.log("view", id)}
                  onEdit={(p) => {
                    setOpenProjectModal(true);
                    setEditProjectModal(true);
                    setCreateProjectModal(false);
                    setHeading("Edit Projects");
                    setSelectedProject(p);
                    //   console.log('p-', p)
                  }}
                  onDelete={(id) => console.log("delete", id)}
                  profile={true}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-8 xl:flex-row ">
            {/* Packages */}
            <div className="xl:w-3/5 p-4 bg-white rounded-[12px] border border-[#E6E6E6] shadow-[0_12px_34px_rgba(0,0,0,0.10)] overflow-hidden">
              {/* text + button */}
              <div className="flex flex-col gap-4 md:flex-row  justify-between items-center">
                <SubHeadingBlack text="Offered Services" />
                <TealBtn
                  text="Add Service"
                  onClick={() => {
                    setOpenModal(true);
                    setCreateModal(true);
                    setHeading("Create Service");
                  }}
                />
              </div>

              {/* services */}
              <div className="space-y-8 mt-10 ">
                {services?.map((service) => {
                  // setServiceId(service?.id)
                  return (
                    <OfferedServicesCard
                      service={service}
                      profile={true}
                      onEdit={() => {
                        setOpenModal(true);
                        setEditModal(true);
                        setHeading("Edit Service");
                        setServiceToEdit(service);
                      }}
                    />
                  );
                })}
              </div>
            </div>
            {/* availability */}
            <div className="xl:w-2/5  p-4 bg-white rounded-[12px] border border-[#E6E6E6] shadow-[0_12px_34px_rgba(0,0,0,0.10)] overflow-hidden">
              <div className="">
                <ScheduleSection availability={me?.AvailabilityTime} />
              </div>
            </div>
          </div>

          {/* reviews */}
          <div className="mt-8  p-4 bg-white rounded-[12px] border border-[#E6E6E6] shadow-[0_12px_34px_rgba(0,0,0,0.10)] overflow-hidden">
            {/* heading */}
            <div className="mb-4">
              <RatingsHeader rating={reviewAvg} total={reviewCount} />
            </div>
            <div className="grid grid-cols-1  gap-4 md:gap-5">
              {reviewCount > 0 ? (
                reviews?.map((review, i) => (
                  <div key={review.id}>
                    <Reviews review={review} />
                  </div>
                ))
              ) : (
                <NoDataFount text="No Reviews Found!" />
              )}
            </div>
          </div>

          <CreateEditPackageModal
            open={openModal}
            onClose={handleCloseModal}
            create={createModal}
            edit={editModal}
            heading={heading}
            serviceData={serviceToEdit}
            // onPublish={() => refetch()}
          />

          {/* Add whats app modal */}
          <AddWhatsAppModal
            open={openWhatsAppModal}
            onClose={handleCloseWhatsAppModal}
          />

          {/* modal */}
          <AddEditProjectModal
            open={openProjectModal}
            onClose={handleCloseProjectModal}
            create={createProjectModal}
            edit={editProjectModal}
            heading={heading}
            project={selectedProject}
          />
        </div>
      )}
    </>
  );
}