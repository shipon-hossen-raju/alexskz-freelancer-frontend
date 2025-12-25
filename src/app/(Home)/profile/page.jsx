"use client";
import ClientProfile from "@/components/clients/ClientProfile";
import ProfessionalProfile from "@/components/professionals/ProfessionalProfile";
import CustomContainer from "@/components/ui/CustomContainer";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const role = useSelector((state) => state.user?.role || null);

  return (
    <div>
      <CustomContainer>
        {role === "USER" && <ClientProfile />}

        {role === "FREELANCER" && <ProfessionalProfile />}
      </CustomContainer>
    </div>
  );
}
