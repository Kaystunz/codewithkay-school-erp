import type {
  AuthUser,
  UserRole,
} from "../../auth/types/auth";

export type AccountStatus =
  | "Active"
  | "Disabled";

export type Account = AuthUser & {
  password: string;
  status: AccountStatus;
  linkedRecordId?: number;
  createdAt: string;
  lastLoginAt: string | null;
};

export type AccountFormData = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: AccountStatus;
  linkedRecordId: string;
};

export type AccountSubmitResult =
  | {
      success: true;
      action: "created" | "updated";
    }
  | {
      success: false;
      message: string;
    };

export type PasswordResetResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };