"use client";
import icon2 from "@/assets/icons/icon2.svg";
import icon3 from "@/assets/icons/icon3.svg";
import icon4 from "@/assets/icons/icon4.svg";
import icon5 from "@/assets/icons/Profile2.svg";
import { useGetMyProjectsQuery } from "@/redux/api/portfolioApi";
import { useGetFreelancerHomeQuery } from "@/redux/api/profileApi";
import Link from "node_modules/next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import HomeBooking from "../HomeBooking";
import AddEditProjectModal from "../modals/AddEditProjectModal";
import Loading from "../shared/Loading";
import PortfolioCard from "../shared/PortfolioCard";
import WhiteBoxCard from "../shared/WhiteBoxCard";
import CustomContainer from "../ui/CustomContainer";
import Heading from "../ui/Heading";
import Paragraph from "../ui/Paragraph";
import TealBtn from "../ui/TealBtn";

export default function ProfessionalHome() {
  const role = useSelector((state) => state.user?.role || null);

  const [openModal, setOpenModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [heading, setHeading] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const { data: projectData, isLoading } = useGetMyProjectsQuery();
  const projects = projectData?.data?.projects;
  const {
    data: homeData,
    error: userError,
    isLoading: isUserHomeLoading,
  } = useGetFreelancerHomeQuery();
  const home = homeData?.data;

  if (isLoading || isUserHomeLoading) {
    return <Loading />;
  }

  const firstName = home?.firstName || "";
  const lastName = home?.lastName || "";

  const items = [
    {
      id: 1,
      icon: icon2,
      title: "Messages",
      count: home?.unReadMessageCount || 0,
      status: "unread",
    },
    {
      id: 2,
      icon: icon4,
      title: "Pending Request",
      count: home?.bookingRequestPending || 0,
      status: "waiting",
    },
    {
      id: 3,
      icon: icon4,
      title: "Active Bookings",
      count: home?.activeBookings || 0,
      status: "Ongoing ",
    },
    {
      id: 4,
      icon: icon3,
      title: "Client Ratings",
      count: home?.ratingAvg || 0,
      status: "Average Rating",
    },
    {
      id: 5,
      icon: icon5,
      title: "Profile View",
      count: home?.profileVisitorCount || 0,
      status: "This Month",
    },
  ];

  const name = `${firstName} ${lastName}`.trim();

  const handleCloseModal = () => {
    setOpenModal(false);
    setCreateModal(false);
    setEditModal(false);
    setSelectedProject(null);
  };

  return (
    <>
      <CustomContainer>
        {/* Heading */}
        <div
          className="flex w-full items-center gap-4 rounded-2xl p-6 shadow-sm border border-transparent"
          style={{
            // base pale blue-gray background with two soft green radial highlights (left small, right large)
            backgroundColor: "#EAF3F6",
            backgroundImage: `radial-gradient(circle at 6% 50%, rgba(139,207,154,0.08) 0%, rgba(139,207,154,0.02) 25%, transparent 40%),
                                  radial-gradient(circle at 85% 55%, rgba(139,207,154,0.18) 0%, rgba(139,207,154,0.08) 20%, rgba(139,207,154,0.02) 45%, transparent 65%)`,
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Waving hand emoji */}
          <span className="text-3xl">👋</span>

          {/* Text content */}
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-[#333333] font-open-sans">
              Welcome back, {name}!
            </h2>

            <Paragraph text="Here's what's happening in your account today" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 my-16">
          {items.map((item) => (
            <WhiteBoxCard item={item} key={item.id} />
          ))}
        </div>

        {/* booking card */}
        <HomeBooking />

        {/* portfolios */}
        <div className="flex flex-col gap-4 md:flex-row justify-between my-10">
          {/* heading */}
          <Heading text="Your Latest Projects" />
          <Link href="/profile/portfolio">
            <TealBtn text="Manage Portfolio" />
          </Link>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 lg:mt-14">
          {projects.map((project) => (
            <PortfolioCard
              key={project.id ?? project._id ?? idx}
              project={project}
              onView={(id) => console.log("view", id)}
              onEdit={(p) => {
                setOpenModal(true);
                setEditModal(true);
                setCreateModal(false);
                setHeading("Edit Projects");
                setSelectedProject(p);
                //   console.log('p-', p)
              }}
              onDelete={(id) => console.log("delete", id)}
              profile={true}
            />
          ))}
        </div>

        {/* modal */}
        <AddEditProjectModal
          open={openModal}
          onClose={handleCloseModal}
          create={createModal}
          edit={editModal}
          heading={heading}
          project={selectedProject}
        />
      </CustomContainer>

      {/* foot */}
      <div className=" w-full bg-gradient-to-br from-pink-200 via-green-200 to-blue-300 flex items-center justify-center py-8 px-4  md:py-24 md:px-10">
        <div className="w-full max-w-4xl bg-transparent bg-opacity-40 backdrop-blur-md rounded-2xl shadow-xl p-12 md:p-16 text-center border border-[#0000000D]">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-400 mb-4">
            Want to reach more clients?
          </h1>
          <p className="text-gray-400 text-opacity-100 text-lg mb-8">
            Get verified and boost your visibility to attract more clients
            today.
          </p>
          <Link href="/profile/verify-account">
            <TealBtn text="Verify Now" />
          </Link>
        </div>
      </div>
    </>
  );
}
