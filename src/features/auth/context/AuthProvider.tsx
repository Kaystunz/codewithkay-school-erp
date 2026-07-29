import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { AuthContext } from "./AuthContext";

import type {
  AuthUser,
  LoginCredentials,
  ProfileUpdateData,
} from "../types/auth";

type AuthProviderProps = {
  children: ReactNode;
};

const demoUsers = [
  {
    id: 1,
    name: "School Administrator",
    email: "admin@fareedahschool.com",
    password: "admin123",
    role: "Admin" as const,
    phone: "",
    address: "",
    profileImage: "",
  },
  {
    id: 2,
    name: "Demo Teacher",
    email: "teacher@fareedahschool.com",
    password: "teacher123",
    role: "Teacher" as const,
    phone: "",
    address: "",
    profileImage: "",
  },
  {
    id: 3,
    name: "Demo Parent",
    email: "parent@fareedahschool.com",
    password: "parent123",
    role: "Parent" as const,
    phone: "",
    address: "",
    profileImage: "",
  },
  {
    id: 4,
    name: "Demo Student",
    email: "student@fareedahschool.com",
    password: "student123",
    role: "Student" as const,
    phone: "",
    address: "",
    profileImage: "",
  },
];

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(
      "fareedah-auth-user"
    );

    if (storedUser) {
      try {
        const parsedUser =
          JSON.parse(storedUser) as AuthUser;

        setUser({
          ...parsedUser,
          phone: parsedUser.phone ?? "",
          address: parsedUser.address ?? "",
          profileImage:
            parsedUser.profileImage ?? "",
        });
      } catch {
        localStorage.removeItem(
          "fareedah-auth-user"
        );
      }
    }

    setIsLoading(false);
  }, []);

  async function login(
    credentials: LoginCredentials
  ) {
    const normalizedEmail =
      credentials.email.trim().toLowerCase();

    const matchedUser = demoUsers.find(
      (demoUser) =>
        demoUser.email.toLowerCase() ===
          normalizedEmail &&
        demoUser.password ===
          credentials.password
    );

    if (!matchedUser) {
      throw new Error(
        "Invalid email or password."
      );
    }

    const savedProfiles = JSON.parse(
      localStorage.getItem(
        "fareedah-user-profiles"
      ) ?? "{}"
    ) as Record<number, Partial<AuthUser>>;

    const savedProfile =
      savedProfiles[matchedUser.id];

    const authenticatedUser: AuthUser = {
      id: matchedUser.id,
      name:
        savedProfile?.name ??
        matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
      phone:
        savedProfile?.phone ??
        matchedUser.phone,
      address:
        savedProfile?.address ??
        matchedUser.address,
      profileImage:
        savedProfile?.profileImage ??
        matchedUser.profileImage,
    };

    setUser(authenticatedUser);

    localStorage.setItem(
      "fareedah-auth-user",
      JSON.stringify(authenticatedUser)
    );
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
      profileImage: profileData.profileImage,
    };

    setUser(updatedUser);

    localStorage.setItem(
      "fareedah-auth-user",
      JSON.stringify(updatedUser)
    );

    const savedProfiles = JSON.parse(
      localStorage.getItem(
        "fareedah-user-profiles"
      ) ?? "{}"
    ) as Record<number, Partial<AuthUser>>;

    savedProfiles[user.id] = updatedUser;

    localStorage.setItem(
      "fareedah-user-profiles",
      JSON.stringify(savedProfiles)
    );
  }

  function logout() {
    setUser(null);

    localStorage.removeItem(
      "fareedah-auth-user"
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
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