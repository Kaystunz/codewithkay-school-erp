import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { AuthContext } from "./AuthContext";
import { useAccountsContext } from "../../accounts/hooks/useAccountsContext";

import type {
  AuthUser,
  LoginCredentials,
  ProfileUpdateData,
} from "../types/auth";

type AuthProviderProps = {
  children: ReactNode;
};

const AUTH_STORAGE_KEY =
  "fareedah-auth-user";

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const {
    accounts,
    findAccountByCredentials,
    updateLastLogin,
    updateAccountProfile,
  } = useAccountsContext();

  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
  const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedUser) {
    setIsLoading(false);
    return;
  }

  try {
    const parsedUser = JSON.parse(storedUser) as AuthUser;

    const matchingAccount = accounts.find(
      (account) => account.id === parsedUser.id
    );

    if (!matchingAccount || matchingAccount.status === "Disabled") {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setUser(null);
      setIsLoading(false);
      return;
    }

    const restoredUser: AuthUser = {
      id: matchingAccount.id,
      name: matchingAccount.name,
      email: matchingAccount.email,
      role: matchingAccount.role,
      phone: matchingAccount.phone ?? "",
      address: matchingAccount.address ?? "",
      profileImage: matchingAccount.profileImage ?? "",
    };

    setUser(restoredUser);
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(restoredUser)
    );
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  } finally {
    setIsLoading(false);
  }

  // Restore the session only when the provider first mounts.
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  async function login(
    credentials: LoginCredentials
  ) {
    const matchedAccount =
      findAccountByCredentials(
        credentials.email,
        credentials.password
      );

    if (!matchedAccount) {
      throw new Error(
        "Invalid email or password."
      );
    }

    if (
      matchedAccount.status === "Disabled"
    ) {
      throw new Error(
        "This account has been disabled. Contact the school administrator."
      );
    }

    const authenticatedUser: AuthUser = {
      id: matchedAccount.id,
      name: matchedAccount.name,
      email: matchedAccount.email,
      role: matchedAccount.role,
      phone: matchedAccount.phone ?? "",
      address:
        matchedAccount.address ?? "",
      profileImage:
        matchedAccount.profileImage ?? "",
    };

    setUser(authenticatedUser);

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(authenticatedUser)
    );

    updateLastLogin(matchedAccount.id);
  }

  function updateProfile(
    profileData: ProfileUpdateData
  ) {
    if (!user) {
      return;
    }

    const updatedUser: AuthUser = {
      ...user,
      name: profileData.name.trim(),
      phone: profileData.phone.trim(),
      address: profileData.address.trim(),
      profileImage:
        profileData.profileImage,
    };

    setUser(updatedUser);

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(updatedUser)
    );

    updateAccountProfile(
      user.id,
      {
        name: updatedUser.name,
        phone: updatedUser.phone,
        address: updatedUser.address,
        profileImage:
          updatedUser.profileImage,
      }
    );
  }

  function logout() {
    setUser(null);

    localStorage.removeItem(
      AUTH_STORAGE_KEY
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated:
          Boolean(user),
        isLoading,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}