import { SidebarNavGroupProps } from '../types';
import { BO_ROUTES } from '@/app/routes';
import { Icons } from '_components/custom';

export const BO_SIDE_ROUTES: SidebarNavGroupProps[] = [
  {
    title: 'Gestion',
    icon: Icons.GridHome,
    links: [
      {
        path: BO_ROUTES.DASHBOARD,
        label: 'SIDE_BAR.DASHBOARD',
        icon: Icons.Home,
      },
      {
        path: BO_ROUTES.AGENCIES.LIST,
        label: 'Agences',
        icon: Icons.RiBuildingLine,
      },

      {
        label: 'Utilisateurs',
        path: BO_ROUTES.USERS.LIST,
        icon: Icons.User,
      },
      {
        label: 'Offres',
        path: BO_ROUTES.PLANS.LIST,
        icon: Icons.Paper,
      },
      {
        label: 'Transactions',
        path: BO_ROUTES.PAYMENT_ADMIN.LIST,
        icon: Icons.Wallet,
      },
    ],
  },
];
