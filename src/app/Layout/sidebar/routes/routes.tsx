import { SidebarNavGroupProps } from "../types";
import { BO_ROUTES } from "../../../routes";
import { Icons } from "_components/custom";

export const BO_SIDE_ROUTES: SidebarNavGroupProps[] = [
  {
    links: [
      {
        path: BO_ROUTES.DASHBOARD,
        label: "SIDE_BAR.DASHBOARD",
        icon: Icons.Home,
      },

      {
        label: "Mes utilisateurs",
        path: BO_ROUTES.USERS.LIST,
        icon: Icons.User,
      },
      // {
      //   label: "Voir la page d'accueil",
      //   path: APP_ROUTES.ROOT,
      //   icon: Icons.IoIosArrowRoundBack,
      // },
    ],
    title: "Principal",
    icon: Icons.GridHome,
  },
  // {
  //   title: "Analytiques",
  //   icon: Icons.Chart,
  //   links: [
  //     { label: "Rapports", path: "/dashboard/reports", icon: Icons.Chart },
  //     { label: "Revenus", path: "/dashboard/revenue", icon: Icons.Payment },
  //     {
  //       label: "Taux d'occupation",
  //       path: "/dashboard/occupancy",
  //       icon: Icons.Chart,
  //     },
  //   ],
  // },
];
