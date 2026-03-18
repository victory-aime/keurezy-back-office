"use client";
import { BO_ROUTES } from "@/app/routes";
import {
  BaseContainer,
  BaseTag,
  ColumnsDataTable,
  DataTableContainer,
} from "@/components/custom";
import { Avatar } from "@/components/ui/avatar";
import { UserModule } from "@/store/state-management";
import { CONSTANTS } from "@/types";
import { Flex, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const UsersList = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: allUsers,
    isLoading,
    refetch: refetchAllUsers,
  } = UserModule.getAllUserQueries({
    params: {
      initialPage: currentPage,
      limitPerPage: CONSTANTS.PAGINATION.FIVE_ITEMS_PER_PAGE,
    },
  });

  const usersColumns: ColumnsDataTable[] = [
    {
      header: "",
      accessor: "select",
    },
    {
      header: "Utilisateur",
      accessor: "fullObject",
      cell: (value: { name: string; image: string; email: string }) => {
        return (
          <Flex alignItems={"center"} gap={2} textTransform={"capitalize"}>
            <Avatar
              name={value.name}
              src={value.image}
              bgColor={"primary.100"}
            />
            <VStack gap={0}>
              {value?.name}
              {value?.email}
            </VStack>
          </Flex>
        );
      },
    },
    {
      header: "Role",
      accessor: "role",
    },
    {
      header: "Status",
      accessor: "status",
      cell: (status) => <BaseTag status={status} />,
    },
    {
      header: "Email verifiée",
      accessor: "emailVerified",
      cell: (x) => (
        <BaseTag color={x ? "green" : "red"} label={x ? "x" : "v"} />
      ),
    },
    {
      header: "2FA",
      accessor: "twoFactorEnabled",
      cell: (x) => (
        <BaseTag color={x ? "green" : "red"} label={x ? "x" : "v"} />
      ),
    },

    {
      header: "Actions",
      accessor: "actions",
      actions: [
        {
          name: "view",
          handleClick: (value: { id: string }) =>
            router.push(`${BO_ROUTES.USERS.DETAILS}?userId=${value?.id}`),
        },
      ],
    },
  ];

  const paginationAction = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <BaseContainer
      title="Liste des utilisateurs"
      border={"none"}
      withActionButtons
      actionsButtonProps={{
        onReload() {
          refetchAllUsers();
        },
      }}
    >
      <DataTableContainer
        data={allUsers?.content ?? []}
        columns={usersColumns}
        isLoading={isLoading}
        initialPage={currentPage}
        paginationData={{
          lazy: true,
          currentPage,
          onLazyLoad: (index) => paginationAction(index),
          totalDataPerPage: allUsers?.totalDataPerPages || 5,
          totalItems: allUsers?.totalItems,
          totalPages: allUsers?.totalPages,
        }}
        hidePagination={allUsers?.totalPages === 1}
      />
    </BaseContainer>
  );
};
