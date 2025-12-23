"use client";
import AddEditProjectModal from "@/components/modals/AddEditProjectModal";
import Loading from "@/components/shared/Loading";
import PortfolioCard from "@/components/shared/PortfolioCard";
import CustomContainer from "@/components/ui/CustomContainer";
import Heading from "@/components/ui/Heading";
import TealBtn from "@/components/ui/TealBtn";
import { useGetMyProjectsQuery } from "@/redux/api/portfolioApi";
import { Divider } from "antd";
import Link from "node_modules/next/link";
import { useState } from "react";

export default function PortfolioPage() {
  // for create and edit project
  const [openModal, setOpenModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [heading, setHeading] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const { data: projectData, isLoading } = useGetMyProjectsQuery();

  if (isLoading) {
    return <Loading />;
  }

  const projects = projectData?.data?.projects;
  // console.log('projects', projects)

  const handleCloseModal = () => {
    setOpenModal(false);
    setCreateModal(false);
    setEditModal(false);
    setSelectedProject(null);
  };

  return (
    <CustomContainer>
      {/* links */}
      <div className="mb-8">
        <Link href="/profile" className="font-nunito text-gray-400 font-medium">
          Profile
        </Link>
        <Divider type="vertical" />
        <Link href="" className="font-nunito text-gray-700 font-medium">
          Portfolio
        </Link>
      </div>

      {/* portfolio section */}
      <div className="flex  justify-between">
        <Heading text="Portfolio" />
        <TealBtn
          text="Add New projects"
          onClick={() => {
            setOpenModal(true);
            setCreateModal(true);
            setEditModal(false);
            setHeading("Add New Projects");
            setSelectedProject(null);
          }}
        />
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 lg:mt-14 ">
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
  );
}
