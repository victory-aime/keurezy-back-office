"use client";

import React, { useCallback, useMemo } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BaseButton } from "../base/baseButton";
import { ActionButtonTypes, Icons } from "_components/custom";
import { useTranslation } from "react-i18next";

export const ActionsButton = React.memo(
  ({
    cancelTitle = "COMMON.CANCEL",
    validateTitle = "COMMON.VALIDATE",
    downloadTitle = "COMMON.DOWNLOAD",
    refreshTitle = "COMMON.REFRESH",
    requestId,
    isLoading = false,
    isDisabled = false,
    cancelColor = "danger",
    cancelVariant,
    validateColor = "primary",
    icon,
    cancelIcon,
    onClick,
    onToggleFilter,
    onReload,
    onCancel,
    onDownload,
    downloadPermission = true,
    validatePermission = true,
    reloadPermission = true,
    withGradient = true,
    ...rest
  }: ActionButtonTypes) => {
    const { t } = useTranslation();
    const router = useRouter();

    // icon memo
    const validateIcon = useMemo(() => {
      if (icon) return icon;
      return requestId ? <Icons.Save /> : <Icons.PlusMinus />;
    }, [icon, requestId]);

    const cancelBtnIcon = useMemo(() => {
      return cancelIcon ?? <Icons.Close />;
    }, [cancelIcon]);

    // handlers memo
    const handleCancel = useCallback(() => {
      if (onCancel) {
        onCancel();
      } else {
        router.back();
      }
    }, [onCancel, router]);

    return (
      <Flex gap={3} {...rest}>
        {isLoading ? (
          <BaseButton isLoading />
        ) : (
          <>
            {/* DOWNLOAD */}
            {onDownload && downloadPermission && (
              <BaseButton
                px={{ base: "10px", md: "15px" }}
                minW={{ base: "40px", md: "auto" }}
                withGradient={withGradient}
                colorType="info"
                variant="outline"
                onClick={onDownload}
                isLoading={isLoading}
                disabled={isLoading || isDisabled}
                leftIcon={<Icons.Paper />}
              >
                <Box display={{ base: "none", md: "inline" }}>
                  {t(downloadTitle)}
                </Box>
              </BaseButton>
            )}

            {/* CANCEL */}
            {onCancel && (
              <BaseButton
                px={{ base: "10px", md: "15px" }}
                minW={{ base: "40px", md: "auto" }}
                withGradient={withGradient}
                disabled={isLoading}
                colorType={cancelColor}
                variant={cancelVariant}
                leftIcon={cancelBtnIcon}
                onClick={handleCancel}
              >
                <Box display={{ base: "none", md: "inline" }}>
                  {t(cancelTitle)}
                </Box>
              </BaseButton>
            )}

            {/* FILTER */}
            {onToggleFilter && reloadPermission && (
              <BaseButton
                px={{ base: "10px", md: "15px" }}
                minW={{ base: "40px", md: "auto" }}
                colorType="tertiary"
                withGradient={withGradient}
                leftIcon={<Icons.Filter />}
                onClick={onToggleFilter}
              >
                <Box display={{ base: "none", md: "inline" }}>
                  {t("COMMON.FILTER")}
                </Box>
              </BaseButton>
            )}

            {/* VALIDATE */}
            {onClick && validatePermission && (
              <BaseButton
                px={{ base: "10px", md: "15px" }}
                minW={{ base: "40px", md: "auto" }}
                colorType={validateColor}
                withGradient={withGradient}
                isLoading={isLoading}
                disabled={isLoading || isDisabled}
                leftIcon={validateIcon}
                onClick={onClick}
              >
                <Box display={{ base: "none", md: "inline" }}>
                  {t(validateTitle)}
                </Box>
              </BaseButton>
            )}

            {/* RELOAD */}
            {onReload && reloadPermission && (
              <BaseButton
                px={{ base: "10px", md: "15px" }}
                minW={{ base: "40px", md: "auto" }}
                colorType="secondary"
                withGradient={withGradient}
                isLoading={isLoading}
                disabled={isLoading || isDisabled}
                leftIcon={<Icons.Refresh size={14} />}
                onClick={onReload}
              >
                <Box display={{ base: "none", md: "inline" }}>
                  {t(refreshTitle)}
                </Box>
              </BaseButton>
            )}
          </>
        )}
      </Flex>
    );
  },
);

ActionsButton.displayName = "ActionsButton";
