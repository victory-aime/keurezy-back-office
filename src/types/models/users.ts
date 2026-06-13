import { AppRole, UserRole } from '../enum';
import { Status } from '../enum/common';

interface IUser {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  image?: string;
  emailVerified?: boolean;
  theme_color?: string;
  theme_mode?: string;
  twoFactorEnabled?: boolean;
  status?: Status | undefined;
  role?: AppRole | undefined;
  createdAt?: string;
  updatedAt?: string;
}

interface IAccountUsers {
  id?: string;
  accountId?: string;
  providerId?: string;
  userId?: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: null;
  scope: string;
  createdAt: string;
  updatedAt: string;
}
interface IUserSessions {
  id?: string;
  userId?: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string;
  userAgent: string;
}

interface IUserInfoResponse extends IUser {
  accounts: IAccountUsers[];
  sessions: IUserSessions[];
  passkeys: { id?: string; name?: string }[];
  owner: {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    agency: {
      id: string;
      name: string;
      description: string;
      address: string;
      phone: string;
      agencyLogo: string;
      isVerified: boolean;
      status: Status;
      documents: string[];
      acceptTerms: true;
      rating: null;
      ownerId: string;
    };
  } | null;
}

interface IPermission {
  features: string;
  modules: string;
}

interface Test {
  id: 'skJiAZHZmctRJcsK94Mddfu1YPAMX3FZ';
  name: 'Nadine';
  email: 'nadia@test.com';
  image: null;
  emailVerified: false;
  twoFactorEnabled: false;
  status: 'ACTIVE';
  role: 'OWNER';
  createdAt: '2026-03-03T18:22:01.214Z';
  updatedAt: '2026-03-03T18:22:05.053Z';
  accounts: [
    {
      id: 'Q1YeGU34WLEvVx1S02nofJrytJnxklm9';
      accountId: 'skJiAZHZmctRJcsK94Mddfu1YPAMX3FZ';
      providerId: 'credential';
      userId: 'skJiAZHZmctRJcsK94Mddfu1YPAMX3FZ';
      accessToken: null;
      refreshToken: null;
      idToken: null;
      accessTokenExpiresAt: null;
      refreshTokenExpiresAt: null;
      scope: null;
      createdAt: '2026-03-03T18:22:01.230Z';
      updatedAt: '2026-03-03T18:22:01.230Z';
    },
  ];
  sessions: [];
  propertyOwner: {
    id: 'c965b544-9a82-4e39-9ce6-c2432c2b7b06';
    userId: 'skJiAZHZmctRJcsK94Mddfu1YPAMX3FZ';
    createdAt: '2026-03-03T18:22:05.048Z';
    updatedAt: '2026-03-03T18:22:05.048Z';
    propertyAgency: {
      id: '423ed1df-4107-4e03-9a62-91b1299d2842';
      name: 'Nadia immo';
      description: 'Aaaaaaaaaaaaaaaaaaaa';
      address: 'sousse';
      phone: '+2430987675432';
      agencyLogo: null;
      isApprove: false;
      status: 'PENDING';
      documents: [
        'https://res.cloudinary.com/dhv3jtnwh/image/upload/v1772562124/agency/nadia-immo/documents/property-5-beb19628-7d83-4889-b74b-fc04a8ff4959.jpg',
      ];
      acceptTerms: true;
      rating: null;
      ownerId: 'c965b544-9a82-4e39-9ce6-c2432c2b7b06';
    };
  };
}

export type { IUser, IAccountUsers, IPermission, IUserInfoResponse };
