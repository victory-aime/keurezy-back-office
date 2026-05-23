import { usePathname } from 'next/navigation';
import { subItems } from '../types';
import { BO_ROUTES } from '@/app/routes';

export const useIsActive = () => {
  const pathname = usePathname();

  /**
   * Détermine si un lien est actif en fonction de la route actuelle.
   * Gère les liens parents (`/dashboard`, `/dashboard/back-office`, etc.)
   */
  const isActiveLink = (link: string) => {
    if (!pathname || !link) return false;

    // Cas particulier pour la racine modules
    if (link === BO_ROUTES.DASHBOARD) {
      return pathname === BO_ROUTES.DASHBOARD;
    }
    // Actif si on est sur le lien exact ou une sous-route
    return pathname === link || pathname.startsWith(`${link}/`);
  };

  /**
   * Vérifie si un des sous-liens est actif (utile pour ouvrir un sous-menu)
   */
  const itHasActiveChildLink = (links?: subItems): boolean => {
    if (!pathname || !links) return false;

    return links.some((link) => {
      if (!link?.path) return false;
      return pathname === link.path || pathname.startsWith(`${link.path}/`);
    });
  };

  return { isActiveLink, itHasActiveChildLink, pathname };
};
