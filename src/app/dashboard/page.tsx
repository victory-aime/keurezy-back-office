"use client";

import { BaseContainer, BaseText } from "_components/custom";
import { Span } from "@chakra-ui/react";
import { authClient } from "../lib/auth-client";
import { SignIn } from "../components/SignIn";

export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <>
      {session ? (
        <BaseContainer
          title="Tableau de bord"
          description={
            <BaseText fontSize={"lg"}>
              Bievenue,
              <Span
                textTransform={"capitalize"}
                color={"primary.500"}
                fontWeight={"bold"}
              >
                {session?.user?.name}
              </Span>
            </BaseText>
          }
          border={"none"}
        >
          <BaseText>Welcome to dashboard</BaseText>
        </BaseContainer>
      ) : (
        <SignIn />
      )}
    </>
  );
}
