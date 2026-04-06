"use client";
import { FormContainer } from "@/app/components/FormContainer";
import { BO_ROUTES } from "@/app/routes";
import { BaseAccordion, Icons } from "@/components/custom";
import { UserModule } from "@/store/state-management";
import { useState } from "react";
import { ProfileSection } from "./ProfileSection";
import { SecuritySection } from "./SecuritySection";
import { SessionSection } from "./SessionSection";
import { AgenceSection } from "./AgenceSection";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import { Box } from "@chakra-ui/react";

export const UserDetails = ({ userId }: { userId: string }) => {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: userData, isLoading } = UserModule.getUserQueries({
    params: { userId },
    queryOptions: { enabled: !!userId },
  });

  const handleOpenDoc = (url: string) => {
    setSelectedDoc(url);
    setIsOpen(true);
  };

  const getFileNameFromUrl = (url: string) => {
    try {
      return url.split("/").pop()?.split("?")[0];
    } catch {
      return "document";
    }
  };

  if (!userId) {
    return (window.location.href = BO_ROUTES.ROOT);
  }

  const userDetailsAccordions = [
    // ================= PROFILE =================
    {
      label: "Profile",
      icon: <Icons.User />,
      content: <ProfileSection data={userData} />,
    },

    // ================= SECURITY =================
    {
      label: "Sécurité",
      icon: <Icons.Shield />,
      content: <SecuritySection data={userData} />,
    },

    // ================= SESSIONS =================
    {
      label: "Sessions",
      icon: <Icons.Desktop />,
      content: <SessionSection data={userData} />,
    },

    // ================= AGENCE =================
    {
      label: "Agence",
      icon: <Icons.RiBuildingLine />,
      content: (
        <AgenceSection
          data={userData}
          handleOpenDoc={handleOpenDoc}
          getFileNameFromUrl={getFileNameFromUrl}
        />
      ),
    },
  ];

  return (
    <Box width={"full"}>
      <FormContainer
        pageTitle={"Détail de l'utilisateur"}
        pageDescription={"Visualisation des informations utilisateur"}
        isLoading={false}
      >
        <BaseAccordion
          items={userDetailsAccordions}
          multipleOpen
          isLoading={isLoading}
        />
      </FormContainer>
      <DocumentPreviewModal
        isOpen={isOpen}
        onChange={setIsOpen}
        data={selectedDoc}
      />
    </Box>
  );
};
