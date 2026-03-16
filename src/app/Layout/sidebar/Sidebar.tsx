"use client";

import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { BaseButton, BaseText, Icons } from "_components/custom";
import { MobileSidebar } from "./components/MobileSidebar";
import { ASSETS } from "_assets/images";
import Image from "next/image";
import { SideBarProps } from "./types";
import { UserModule } from "_store/state-management";
import { BO_SIDE_ROUTES } from "./routes/routes";
import { RenderGroupedLinks } from "./components/RenderGroupedLinks";
import { useAuth } from "_hooks/useAuth";
import { SideToolTip } from "./components/SideToolTip";
import { useSessionRefreshContext } from "_context/SessionRefresh-context";
import { useMemo } from "react";
import { useColorMode } from "_components/ui/color-mode";

export const Sidebar = ({ data, onShowSidebar, sideToggled }: SideBarProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { logout } = useAuth();
  const { dismissToast } = useSessionRefreshContext();
  const { colorMode } = useColorMode();

  const { data: user } = UserModule.getUserInfo({
    queryOptions: { enabled: false },
  });

  const badgesByPath = useMemo(() => {
    return {};
  }, []);

  const sidebarLinks = useMemo(() => {
    return BO_SIDE_ROUTES.map((group) => ({
      ...group,
      links: group.links.map((link) => {
        // const badgeValue = badgesByPath[link.path as string];
        return {
          ...link,
          badge: typeof 1 === "number" && 1 > 0 ? 1 : undefined,
        };
      }),
    }));
  }, [data?.user?.role, user?.role, badgesByPath]);

  return (
    <Box>
      {isMobile ? (
        <MobileSidebar
          isOpen={!sideToggled}
          onClose={onShowSidebar}
          links={sidebarLinks}
          handleLogout={() => {
            dismissToast?.();
            logout();
          }}
        />
      ) : (
        <Box
          w={!sideToggled ? "80px" : "230px"}
          h="100vh"
          position="fixed"
          transition="width 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)"
          overflow="hidden"
          boxShadow="lg"
          borderRight="1px solid"
          borderColor={colorMode === "light" ? "gray.200" : "gray.900"}
          display="flex"
          flexDirection="column"
          zIndex="10"
          data-tour="sidebar"
        >
          <Flex
            align="center"
            justifyContent={!sideToggled ? "center" : "flex-start"}
            gap={3}
            px={3}
            py={2}
            borderBottom="1px solid"
            borderColor={colorMode === "light" ? "gray.200" : "gray.900"}
          >
            <Image
              src={colorMode === "light" ? ASSETS.LOGO : ASSETS.LOGO_DARK}
              alt="logo"
              width={45}
              height={45}
            />
            {sideToggled && (
              <BaseText fontSize="sm" fontWeight="medium">
                MyImmo
              </BaseText>
            )}
          </Flex>

          {/* LINKS */}

          <RenderGroupedLinks isCollapsed={sideToggled} links={sidebarLinks} />
          <SideToolTip disabled={sideToggled} label={"Déconnexion"}>
            <Box
              p={3}
              borderTop="1px solid"
              borderColor={colorMode === "light" ? "gray.200" : "gray.900"}
            >
              <BaseButton
                width={"full"}
                colorType={"danger"}
                leftIcon={<Icons.Logout />}
                onClick={() => {
                  dismissToast?.();
                  logout();
                }}
              >
                {sideToggled ? "Déconnexion" : null}
              </BaseButton>
            </Box>
          </SideToolTip>
        </Box>
      )}
    </Box>
  );
};
