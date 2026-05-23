import { SidebarNavGroupProps } from '../types';
import { BO_ROUTES } from '@/app/routes';
import { Icons } from '_components/custom';

export const BO_SIDE_ROUTES: SidebarNavGroupProps[] = [
  {
    title: 'Principal',
    icon: Icons.GridHome,
    links: [
      {
        path: BO_ROUTES.DASHBOARD,
        label: 'SIDE_BAR.DASHBOARD',
        icon: Icons.Home,
      },

      {
        label: 'Mes utilisateurs',
        path: BO_ROUTES.USERS.LIST,
        icon: Icons.User,
      },
      {
        label: 'Mes packs',
        path: BO_ROUTES.PACKS.LIST,
        icon: Icons.Paper,
      },
    ],
  },
];
