"use client";
import { FormContainer } from "@/app/components/FormContainer";
import { Flex } from "@chakra-ui/react";

export const UserDetails = ({ userId }: { userId: string }) => {
  return (
    <FormContainer
      pageTitle={"Detail de l'utilisateur"}
      pageDescription={"Renseignez les informations de votre propriété"}
      isLoading={false}
    >
      <Flex>Info : {userId}</Flex>
    </FormContainer>
  );
};
