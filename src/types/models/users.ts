import { UserRole } from "../enum";
import { Status } from "../enum/common";

interface IUser {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  emailVerified?: boolean;
  twoFactorEnabled?: boolean;
  status?: Status | undefined;
  role?: UserRole | undefined;
  createdAt: string;
  updatedAt: string;
}

interface IAccountUsers {
  id?: string;
  accountId?: string;
  providerId?: string;
  userId?: string;
}

interface IPermission {
  features: string;
  modules: string;
}

export type { IUser, IAccountUsers, IPermission };
