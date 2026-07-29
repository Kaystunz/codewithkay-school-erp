import { createContext } from "react";

import type {
  AuthUser,
  LoginCredentials,
  ProfileUpdateData,
} from "../types/auth";

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    credentials: LoginCredentials
  ) => Promise<void>;
  logout: () => void;
  updateProfile: (
    profileData: ProfileUpdateData
  ) => void;
};

export const AuthContext =
  createContext<AuthContextValue | null>(null);